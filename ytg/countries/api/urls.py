from django.urls import path
from .views import PostRetrieveUpdateDestroy, PostList, VoteCreate


urlpatterns = [
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>', PostRetrieveUpdateDestroy.as_view()), 
    path('posts/<int:pk>/vote', VoteCreate.as_view()),
    
]
