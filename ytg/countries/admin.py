from django.contrib import admin
from .models import Post, Vote, City, Country, Continent
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display_links = ('id', 'url', 'poster','country')
    search_fields = ('country', 'city')
    list_filter = ('country', 'city')
    list_display = ('id', 'url', 'poster','country', 'city','description','created', 'changed')
    # list_editable = 
    

admin.site.register(Post, PostAdmin)
admin.site.register(Vote)
admin.site.register(City)
admin.site.register(Country)
admin.site.register(Continent)
