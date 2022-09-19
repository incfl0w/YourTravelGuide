from django.urls import path
from .views import PostRetrieveUpdateDestroy, PostList, VoteCreate, CountryList, CityList, CityRetrieveUpdateDestroy, CountryRetrieveUpdateDestroy
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    #post
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>', PostRetrieveUpdateDestroy.as_view()), 
    path('posts/<int:pk>/vote', VoteCreate.as_view()),
    #city
    path('cities/', CityList.as_view()),
    path('cities/<int:pk>/', CityRetrieveUpdateDestroy.as_view()),
    
    #country
    path('countries/', CountryList.as_view()),
    path('countries/<int:pk>/', CountryRetrieveUpdateDestroy.as_view()),
    
]

