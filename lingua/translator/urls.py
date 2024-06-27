from django.urls import path
from . import views  # Asegúrate de que estás importando views desde el módulo correcto

urlpatterns = [
    path('', views.translate, name='translate'),
]
