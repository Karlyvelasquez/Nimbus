import json
import logging
import os
import pandas as pd
import numpy as np
from openai import OpenAI

from typing import Optional, List, Dict


def _get_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        return OpenAI(api_key=api_key)
    except Exception:
        return None

SYSTEM_PROMPT = """
You are an AI assistant that helps users understand weather and precipitation forecasts.

Your goal is to answer questions about weather conditions in a clear and simple way.

Use the model predictions (precipitation probability, intensity, and forecast horizon) to explain:

- if rain is expected
- how strong the precipitation may be
- when it may start
- possible impacts for daily activities

MODEL OUTPUT INTERPRETATION:
- 'clase': integer classification (0=no rain, 1=light, 2=moderate, 3=heavy)
- 'etiqueta': human-readable intensity label
- 'probabilidades': probabilities for each class (as percentages)
- 'alerta': boolean flag indicating if heavy precipitation is predicted
- 'forecast_hours': prediction horizon in hours

Rules:
- Use simple language.
- Avoid technical jargon.
- If uncertainty exists, explain it clearly.
- Provide practical advice when possible (umbrella, travel, outdoor activities).
- If alerta=True, emphasize the elevated risk and recommend caution.
- Use the probabilidades dict to express uncertainty ranges.

Example questions from users:
- Will it rain today?
- Is heavy rain expected in the next 6 hours?
- Should I take an umbrella?
- Is it safe to travel if heavy precipitation is forecast? """


def _build_system_prompt(context: Dict) -> str:
    """
    Build system prompt with dynamic alert warning if needed.
    
    Args:
        context: Weather context dict that may include 'alerta' flag
        
    Returns:
        System prompt with optional alert prepended
    """
    prompt = SYSTEM_PROMPT
    
    # Prepend alert warning if alerta is True
    if context.get("alerta", False):
        alert_warning = (
            "⚠️ IMPORTANT: The 'alerta' flag is TRUE - heavy precipitation is forecast. "
            "Make sure to emphasize this elevated risk in your response and recommend "
            "extra caution for planning activities. "
        )
        prompt = alert_warning + "\n\n" + prompt
    
    return prompt


def generate_llm_answer(context: Dict,
						system_prompt: Optional[str] = None,
						model: str = "gpt-4o-mini",
						temperature: float = 0.0,
						max_tokens: int = 500) -> Dict:
	"""
	Generate LLM response to user query using weather context.
	
	Args:
		context: Dictionary with weather data (location, intensity, alerta, etc.)
		system_prompt: Custom system prompt (if None, auto-generated with alert handling)
		model: OpenAI model to use
		temperature: Sampling temperature
		max_tokens: Max response length
		
	Returns:
		Dict with keys:
			- 'ok': bool, success flag
			- 'text': str, LLM response
			- 'error': str (if ok=False)
	"""
	client = _get_client()
	if client is None:
		return {"ok": False, "error": "OPENAI_API_KEY NO ESTABLECIDA"}

	# Use auto-generated prompt if none provided
	if system_prompt is None:
		system_prompt = _build_system_prompt(context)

	messages = [
		{"role": "system", "content": system_prompt},
		{"role": "user", "content": json.dumps(context, default=str)}
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
		return {"ok": True, "text": text}
	except Exception as e:
		logging.exception("LLM error")
		return {"ok": False, "error": str(e)}


__all__ = [
	"impute_dataframe",
	"balance_classes",
	"get_model_dashboard_data",
	"generate_llm_answer",
	"export_dashboard_data",
]
 