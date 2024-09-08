from django.urls import path
from .views import all_categories

urlpatterns = [
    path('get/', all_categories, name='all-categories'), 
]