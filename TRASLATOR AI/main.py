from flask import Flask, request, jsonify
from transformers import MarianTokenizer, MarianMTModel

app = Flask(__name__)

marian_tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-en-es')
marian_model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-en-es')

language_models = {
    ('English', 'Spanish'): ('Helsinki-NLP/opus-mt-en-es', 'Helsinki-NLP/opus-mt-es-en'),
    # Añadir más combinaciones de idiomas según sea necesario
}

def translate_text(input_text, source_lang, target_lang):
    model_name = language_models.get((source_lang, target_lang))
    if not model_name:
        return None

    tokenizer = MarianTokenizer.from_pretrained(model_name[0])
    model = MarianMTModel.from_pretrained(model_name[0])

    input_ids = tokenizer(input_text, return_tensors='pt').input_ids
    outputs = model.generate(input_ids=input_ids)
    translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return translated_text

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    prompt = data.get('prompt')
    source_language = data.get('source_language')
    target_language = data.get('target_language')

    if not prompt or not source_language or not target_language:
        return jsonify({'error': 'Missing required parameters'}), 400

    translation = translate_text(prompt, source_language, target_language)
    if translation is None:
        return jsonify({'error': 'Translation model not available for given languages'}), 400

    return jsonify({'text': translation})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
