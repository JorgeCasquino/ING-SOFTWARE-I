from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
import firebase_admin
from firebase_admin import auth as firebase_auth

# Inicializar Firebase si no está ya inicializado
if not firebase_admin._apps:
    cred = firebase_admin.credentials.Certificate('config/firebase-adminsdk.json')
    firebase_admin.initialize_app(cred)

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = firebase_auth.create_user(
                email=email,
                password=password,
            )
            return redirect('login')
        except Exception as e:
            return render(request, 'accounts/register.html', {'error': f'Registration failed: {e}'})
    return render(request, 'accounts/register.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = firebase_auth.get_user_by_email(email)
            django_user = authenticate(username=email, password=password)
            if django_user is None:
                django_user = User.objects.create_user(username=email, email=email, password=password)
            login(request, django_user)
            return redirect('translate')  # Asegúrate de que esta URL exista
        except Exception as e:
            return render(request, 'accounts/login.html', {'error': f'Login failed: {e}'})
    return render(request, 'accounts/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def google_login(request):
    if request.method == 'POST':
        import json
        body = json.loads(request.body)
        token = body.get('token')
        try:
            # Verificar el token con Firebase
            decoded_token = firebase_auth.verify_id_token(token)
            uid = decoded_token['uid']
            email = decoded_token['email']

            # Autenticar o crear el usuario en Django
            try:
                django_user = User.objects.get(email=email)
            except User.DoesNotExist:
                django_user = User.objects.create_user(username=email, email=email, password=None)

            login(request, django_user)
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})
