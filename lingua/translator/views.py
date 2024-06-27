from django.shortcuts import render
from django.http import JsonResponse
from transformers import MarianTokenizer, MarianMTModel
from django.contrib.auth.decorators import login_required

# Diccionario de modelos disponibles
models = {
    'en-es': 'Helsinki-NLP/opus-mt-en-es',
    'es-en': 'Helsinki-NLP/opus-mt-es-en',
    'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
    'fr-en': 'Helsinki-NLP/opus-mt-fr-en',
    'en-de': 'Helsinki-NLP/opus-mt-en-de',
    'de-en': 'Helsinki-NLP/opus-mt-de-en',
    'en-it': 'Helsinki-NLP/opus-mt-en-it',
    'it-en': 'Helsinki-NLP/opus-mt-it-en',
    # Añadir más modelos según sea necesario
}

@login_required
def translate(request):
    if request.method == 'POST':
        input_lang = request.POST.get('input_lang', 'en')
        output_lang = request.POST.get('output_lang', 'es')
        input_text = request.POST.get('text', '')

        model_name = f"{input_lang}-{output_lang}"
        if model_name in models:
            marian_tokenizer = MarianTokenizer.from_pretrained(models[model_name])
            marian_model = MarianMTModel.from_pretrained(models[model_name])

            marian_input_ids = marian_tokenizer(input_text, return_tensors='pt').input_ids
            outputs = marian_model.generate(input_ids=marian_input_ids)
            output_text = marian_tokenizer.decode(outputs[0], skip_special_tokens=True)

            return JsonResponse({'translation': output_text})
        else:
            return JsonResponse({'error': 'Translation model not found.'})
    return render(request, 'translator/index.html')
