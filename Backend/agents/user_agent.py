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


def format_expert_dashboard_data(dashboard_data: Dict) -> str:
    """Formats dashboard data for expert meteorological analysis."""
    if not dashboard_data:
        return "No data available"
    
    parts = ["CURRENT METEOROLOGICAL DATA:"]
    
    # Performance metrics
    if "metrics" in dashboard_data:
        m = dashboard_data["metrics"]
        parts.append("\nModel Performance:")
        if "accuracy" in m:
            parts.append(f"  Accuracy: {m['accuracy']*100:.1f}%")
        if "roc_auc" in m:
            parts.append(f"  ROC-AUC: {m['roc_auc']:.3f}")
        if "pr_auc" in m:
            parts.append(f"  PR-AUC: {m['pr_auc']:.3f}")
    
    # Weather predictions by forecast horizon
    if "predictions" in dashboard_data:
        parts.append("\nWeather Forecasts:")
        for horizon, pred in dashboard_data["predictions"].items():
            conf = pred.get('confidence', 0)
            desc = pred.get('description', 'N/A')
            parts.append(f"  {horizon}: {desc} (confidence: {conf*100:.0f}%)")
    
    # Station observations
    if "station" in dashboard_data:
        s = dashboard_data["station"]
        parts.append(f"\nStation: {s.get('name', 'Unknown')}")
        parts.append(f"  Elevation: {s.get('elevation', 'N/A')}")
        if "temp" in s or "humidity" in s or "wind" in s:
            obs = []
            if "temp" in s:
                obs.append(f"Temperature: {s.get('temp')}°C")
            if "humidity" in s:
                obs.append(f"Humidity: {s.get('humidity')}%")
            if "wind" in s:
                obs.append(f"Wind Speed: {s.get('wind')} km/h")
            if obs:
                parts.append("  Observations: " + " | ".join(obs))
    
    return "\n".join(parts)


EXPERT_SYSTEM_PROMPT = """
You are a senior meteorologist and climatologist specializing in tropical systems, 
particularly the Galápagos Islands microclimate patterns.

EXPERTISE DOMAINS:
- Tropical meteorology and moisture dynamics
- ENSO (El Niño/La Niña) influence on regional precipitation
- Orographic effects at varying elevations
- Local atmospheric circulation patterns
- Agricultural and water resource implications of weather patterns
- Interpretation of high-altitude precipitation observations

REGIONAL CONTEXT:
Location: San Cristóbal Island, Galápagos (~1°S, 89°W)
El Junco Station: 650-864 meters elevation, highest annual precipitation on island
Climate Drivers: 
  - Humboldt Current influence (cool water, La Niña tendency)
  - Seasonal ENSO variability affecting rainfall
  - Trade wind patterns maintaining consistent moisture transport
  - Diurnal thermal circulation modified by topography

CURRENT WEATHER STATE:
{dashboard_data}

ANALYSIS APPROACH:
1. Interpret observations through atmospheric physics and climatology
2. Connect current conditions to larger seasonal and interannual patterns
3. Explain implications for local stakeholders (agriculture, water management, emergency response)
4. Provide evidence-based recommendations grounded in meteorological reasoning
5. Acknowledge forecast uncertainty and data limitations

RESPONSE STRUCTURE:
- What is happening: Direct description of meteorological situation
- Why it's happening: Physical mechanisms and atmospheric processes at work
- Practical implications: How this affects agriculture, water systems, or safety
- Recommendation: Specific actions based on meteorological insight

TECHNICAL COMPETENCIES:
You understand precipitation dynamics, atmospheric moisture, convective processes,
and how topography modifies regional weather patterns. Explain these with clarity
while maintaining scientific rigor.

TONE:
Professional yet accessible, scientifically grounded, practical for decision-makers
who may not be meteorologists but need clear weather interpretation.
"""


def generate_expert_analysis(
    context: Dict = None,
    dashboard_data: Dict = None,
    query: str = "",
    model: str = "gpt-4o-mini",
    temperature: float = 0.7,
    max_tokens: int = 800
) -> Dict:
    """
    Análisis experto sobre datos meteorológicos del dashboard.
    
    Args:
        context: Contexto adicional (métricas, datos históricos)
        dashboard_data: Datos del dashboard actual (station, predictions, metrics)
        query: Pregunta del usuario
        model: Modelo a usar
        temperature: Creatividad (0.7 para balance)
        max_tokens: Límite de tokens
    """
    client = _get_client()
    if client is None:
        return {"ok": False, "error": "OPENAI_API_KEY no configurada"}

    # Formatear datos
    formatted_data = format_expert_dashboard_data(dashboard_data) if dashboard_data else "Sin datos"
    final_prompt = EXPERT_SYSTEM_PROMPT.format(dashboard_data=formatted_data)
    
    # Preparar mensaje
    if isinstance(context, dict) and "user_message" in context:
        user_msg = context["user_message"]
    else:
        user_msg = query or json.dumps(context or {}, default=str)

    messages = [
        {"role": "system", "content": final_prompt},
        {"role": "user", "content": user_msg}
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
            "model_used": model
        }
    except Exception as e:
        logging.exception("Expert LLM error")
        return {"ok": False, "error": str(e)}


__all__ = [
    "generate_expert_analysis",
    "format_expert_dashboard_data",
]
