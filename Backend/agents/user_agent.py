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

SYSTEM_PROMPT = """
You are an AI assistant that helps users understand weather and precipitation forecasts.

Your goal is to answer questions about weather conditions in a clear and simple way.

Use the model predictions (precipitation probability, intensity, and forecast horizon) to explain:

- if rain is expected
- how strong the precipitation may be
- when it may start
- possible impacts for daily activities

Rules:
- Use simple language.
- Avoid technical jargon.
- If uncertainty exists, explain it clearly.
- Provide practical advice when possible (umbrella, travel, outdoor activities).

Example questions from users:
- Will it rain today?
- Is heavy rain expected in the next 6 hours?
- Should I take an umbrella?
- Is it safe to travel if heavy precipitation is forecast? """

def model():
	pass


def generate_llm_answer(context: Dict,
						system_prompt: str = SYSTEM_PROMPT,
						model: str = "gpt-4o-mini",
						temperature: float = 0.0,
						max_tokens: int = 500) -> Dict:
	"""Genera una respuesta del LLM usando el contexto (Pendiente).
	"""
	client = _get_client()
	if client is None:
		return {"ok": False, "error": "OPENAI_API_KEY no configurada"}

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
			text = getattr(choice, "message", None) or getattr(choice, "text", None) or str(choice)
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
 