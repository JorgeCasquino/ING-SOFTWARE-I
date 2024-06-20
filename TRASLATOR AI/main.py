# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import T5ForConditionalGeneration, T5Tokenizer

class TextPrompt(BaseModel):
    prompt: str
    source_language: str
    target_language: str

app = FastAPI()
model_name = "t5-small"
model = T5ForConditionalGeneration.from_pretrained(model_name)
tokenizer = T5Tokenizer.from_pretrained(model_name)

@app.post("/generate/")
async def generate_text(prompt: TextPrompt):
    input_text = f"translate {prompt.source_language} to {prompt.target_language}: {prompt.prompt}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    outputs = model.generate(input_ids)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"text": text}