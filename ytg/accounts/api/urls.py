from django.urls import path, include
from . import views


urlpatterns = [
    path('login/', include('rest_framework.urls')), 
    path('signup/', views.signup)
]

