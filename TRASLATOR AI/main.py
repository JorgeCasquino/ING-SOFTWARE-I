# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

class TextPrompt(BaseModel):
    prompt: str
    source_language: str
    target_language: str

app = FastAPI()

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/t5-small"  # Puedes cambiar el modelo aquí
HUGGINGFACE_API_KEY = "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"  # Reemplaza con tu API key

headers = {
    "Authorization": f"Bearer {HUGGINGFACE_API_KEY}"
}

@app.post("/generate/")
async def generate_text(prompt: TextPrompt):
    input_text = f"translate {prompt.source_language} to {prompt.target_language}: {prompt.prompt}"
    
    response = requests.post(
        HUGGINGFACE_API_URL,
        headers=headers,
        json={"inputs": input_text}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    result = response.json()
    translated_text = result[0]['generated_text']
    return {"text": translated_text}

# Ejecuta el servidor con: uvicorn main:app --reload
