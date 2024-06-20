# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import time

class TextPrompt(BaseModel):
    prompt: str
    source_language: str
    target_language: str

app = FastAPI()

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/t5-small"
HUGGINGFACE_API_KEY = "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"

headers = {
    "Authorization": f"Bearer {HUGGINGFACE_API_KEY}"
}

@app.post("/generate/")
async def generate_text(prompt: TextPrompt):
    input_text = f"translate {prompt.source_language} to {prompt.target_language}: {prompt.prompt}"
    
    try:
        response = requests.post(
            HUGGINGFACE_API_URL,
            headers=headers,
            json={"inputs": input_text}
        )
        response.raise_for_status()  # Lanza un error para códigos de estado HTTP 4xx/5xx

        result = response.json()
        if "error" in result and "currently loading" in result["error"]:
            raise HTTPException(status_code=503, detail="Model is loading, please try again later.")
        
        translated_text = result[0]['generated_text']
        return {"text": translated_text}

    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise HTTPException(status_code=response.status_code, detail=str(e))
