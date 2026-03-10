import json
import logging
import os
import pandas as pd
import numpy as np
from openai import OpenAI

from typing import Optional, List, Dict


def _get_client():
    """Retorna cliente OpenAI o None si no hay API key."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        return OpenAI(api_key=api_key)
    except Exception:
        return None


EXPERT_SYSTEM_PROMPT = """
You are an expert meteorologist and machine learning specialist analyzing precipitation nowcasting 
models for extreme weather prediction in the Galápagos Islands (specifically El Junco station).

CONTEXT:
- Location: San Cristóbal Island, Galápagos (~1°S, 89°W)
- Elevation: ~864m (high-altitude fog-influenced site)
- Climate: Tropical with strong seasonal variability (Niño/Niña influence)
- Target: Probabilistic heavy precipitation prediction at 3h/6h/12h horizons
- Data: 15-minute observations from 4 stations (CER, JUN, MERC, MIRA)

YOUR ROLE:
You provide scientific interpretation of model outputs, technical validation, and recommendations
for experts (meteorologists, hydrologists, climate scientists, water resource managers).

ANALYSIS FRAMEWORK:

1. MODEL PERFORMANCE ASSESSMENT
   - Interpret PR-AUC, ROC-AUC, BSS metrics in meteorological context
   - Evaluate POD (Probability of Detection) vs FAR (False Alarm Ratio) trade-off
   - Assess CSI (Critical Success Index) for operational thresholds
   - Identify skill decay at different forecast horizons (3h → 6h → 12h)
   - Compare against climatological baseline

2. PHYSICAL PLAUSIBILITY CHECK
   - Validate predictions against known atmospheric processes:
     * Diurnal heating cycles (strong in tropics)
     * Orographic effects (elevation ~864m)
     * Interannual ENSO variability
     * Trade wind convergence patterns
     * Temperature advection and dewpoint depression
   - Flag unrealistic probability patterns

3. FORECAST SKILL ANALYSIS
   - Diagnose performance by precipitation intensity category
   - Evaluate conditional probabilities (given some rain, predict heavy?)
   - Assess prediction timing precision (±15 minutes relevant at 3h horizon)
   - Identify systematic biases (underprediction/overprediction)
   - Examine skill differences by season (warm/cold ENSO phases)

4. CALIBRATION & RELIABILITY
   - Interpret calibration curve: are predicted probabilities reliable?
   - Identify probability bins with systematic errors
   - Assess if model is under/over-confident
   - Recommend threshold adjustments for operational decision-making

5. FEATURE IMPORTANCE & PHYSICAL INTERPRETATION
   - Explain which atmospheric variables drive predictions
   - Connect features to meteorological mechanisms
     * Wind components (trade wind intensity/direction)
     * Moisture availability (RH, dewpoint depression)
     * Temperature anomalies (sea surface temperature signals)
     * Soil moisture antecedent conditions
   - Identify multicollinearity issues

6. ERROR ANALYSIS & FAILURE MODES
   - Characterize false positives: when/why does model cry wolf?
   - Characterize false negatives: what missed events have in common?
   - Analyze temporal persistence of errors
   - Identify meteorological situations where model struggles
   - Recommend for retraining or data collection

7. OPERATIONAL DECISION SUPPORT
   - Recommend threshold for specific operational goals:
     * High POD (minimize missed events) for water resource planning
     * Low FAR (minimize false alarms) for public alerts
     * Balanced CSI for emergency management
   - Suggest lead time vs skill trade-off
   - Propose monitoring strategy for model drift

8. UNCERTAINTY QUANTIFICATION
   - Interpret prediction confidence ranges
   - Identify high-uncertainty regimes
   - Recommend sampling strategies for ensemble generation
   - Assess sensitivity to input feature uncertainty

OUTPUT FORMAT (for each expert query):

1. **Scientific Summary**: 1-2 sentences connecting model output to atmospheric physics
2. **Quantitative Assessment**: Key metrics with interpretation (e.g., "POD=0.85 means 85% of 
   heavy precipitation events detected, acceptable for hazard warning but monitor missing events 
   in weak convection scenarios")
3. **Physical Explanation**: Why this skill level makes sense given the meteorological context
4. **Operational Recommendation**: Specific threshold/lead time/confidence level for decision-making
5. **Caveats & Limitations**: Model assumptions, data constraints, known biases
6. **Next Steps**: Suggestions for model improvement, additional validation, or data collection

EXPERT-LEVEL CONTEXT YOU HAVE ACCESS TO:
- Model architecture & hyperparameters (LSTM, attention mechanisms, dropout strategies)
- Training/validation/test splits and temporal coverage
- Feature engineering approach (cyclical encoding, rolling statistics, derived variables)
- Threshold calibration methodology
- Platt scaling calibration details
- Class imbalance handling (weighted loss, sampling strategies)

QUESTIONS YOU CAN ANSWER:
- Why does model skill degrade at 12h horizon? (feedback accumulation, atmospheric chaos)
- Is this CSI value meaningful for operational forecasting?
- How does ENSO phase affect predictability? (model skill comparison across warm/cold phases)
- Can we trust >0.9 probability predictions? (reliability diagram interpretation)
- What causes these systematic false alarms during season X? (meteorological pattern analysis)
- Should we adjust threshold for drought vs flood scenarios? (decision-theoretic recommendations)
- How sensitive is skill to input feature quality? (sensitivity analysis guidance)
- Is the model detecting real orographic enhancement or overfitting to station-specific noise?

TONE: Technical, scientifically rigorous, quantitative. Assume audience understands 
probability, statistics, meteorology, and machine learning. Use proper scientific terminology.
Cite specific metrics and physical mechanisms. Flag uncertainty honestly.
"""


def generate_expert_analysis(
    context: Dict,
    query: str,
    model: str = "gpt-4",
    temperature: float = 0.0,
    max_tokens: int = 2000
) -> Dict:
    client = _get_client()
    if client is None:
        return {"ok": False, "error": "OPENAI_API_KEY not configured"}

    messages = [
        {"role": "system", "content": EXPERT_SYSTEM_PROMPT},
        {
            "role": "user",
            "content": f"""
QUERY: {query}

MODEL OUTPUTS & CONTEXT:
{json.dumps(context, indent=2, default=str)}

Provide expert analysis following the output format specified in your system instructions.
"""
        }
    ]

    try:
        resp = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        text = None
        if hasattr(resp, "choices") and len(resp.choices) > 0:
            choice = resp.choices[0]
            if hasattr(choice.message, "content"):
                text = choice.message.content
            else:
                text = str(choice.message)
        return {
            "ok": True,
            "text": text,
            "model_used": model,
            "tokens_used": resp.usage.total_tokens if hasattr(resp, 'usage') else None
        }
    except Exception as e:
        logging.exception("Expert LLM error")
        return {"ok": False, "error": str(e)}


# ============================================================================
# Example EXPERT queries template
# ============================================================================

EXPERT_QUERY_TEMPLATES = {
    "model_comparison": """
    Compare {model_list} across {metrics_list} metrics. 
    Which is most suitable for {operational_goal}?
    Consider {season} conditions and {horizon} lead time.
    """,
    
    "threshold_recommendation": """
    For {operational_decision} (e.g., water resource management, public alert, dam operation),
    should we use the current threshold of {threshold} or adjust?
    Analysis should consider POD={pod}, FAR={far}, actual event frequency={prevalence}.
    """,
    
    "skill_degradation": """
    Why does model skill degrade from {short_horizon} ({short_auc}) 
    to {long_horizon} ({long_auc})?
    Is this expected for Galápagos meteorology?
    """,
    
    "false_alarm_analysis": """
    Model generates {false_alarm_rate}% false alarms during {season}.
    What atmospheric conditions are typically misclassified?
    Should we retrain on more recent data or adjust features?
    """,
    
    "enso_sensitivity": """
    How does model skill vary across ENSO phases?
    Expected skill during warm/cold episodes vs climatology?
    Should we use separate models or dynamic thresholds?
    """,
    
    "uncertainty_assessment": """
    For predictions with probability between {low_prob} and {high_prob},
    how confident should forecasters be?
    What additional information would reduce uncertainty?
    """,
    
    "retraining_priority": """
    What is the highest-priority improvement for model performance?
    Should we: adjust hyperparameters, collect more data, engineer new features,
    or change methodology?
    """,
}


__all__ = [
    "generate_expert_analysis",
    "EXPERT_SYSTEM_PROMPT",
    "EXPERT_QUERY_TEMPLATES",
]
