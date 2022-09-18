from django.urls import path, include
from . import views

path('login/', include('rest_framework.urls')), 
path('signup/', views.signup)