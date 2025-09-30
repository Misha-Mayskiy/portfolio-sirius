import os

from core.config import create_logger, parse_config

model_id, model_prompt, model_temperature, model_thinking_budget, proxies = parse_config(os.environ.get("config_path"))
logger = create_logger("Prediction")
