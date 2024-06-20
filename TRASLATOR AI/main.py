from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MarianTokenizer, MarianMTModel

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Cargar el modelo y tokenizador para inglés a español
tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-es')
model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-en-es')

def translate_text(input_text):
    input_ids = tokenizer(input_text, return_tensors='pt').input_ids
    outputs = model.generate(input_ids=input_ids)
    translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return translated_text

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    print(f"Received data: {data}")
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Missing required parameters'}), 400

    translation = translate_text(prompt)
    return jsonify({'text': translation})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
