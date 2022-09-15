from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.ForeignKey('Country', on_delete=models.CASCADE)
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    changed = models.DateTimeField(auto_now=True)
    
    # tags
    # rate

    class Meta:
        ordering = ['-created']
        verbose_name = "Post"
        verbose_name_plural = "Posts"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})


class Vote(models.Model): # have to visit vote
    voter = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class City(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.ForeignKey('Country', on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("City")
        verbose_name_plural = ("Citys")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("City_detail", kwargs={"pk": self.pk})
    
class Country(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    continent = models.ForeignKey('Continent', on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = ("Country")
        verbose_name_plural = ("Countrys")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Country_detail", kwargs={"pk": self.pk})
    
class Continent(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        verbose_name = ("Continent")
        verbose_name_plural = ("Continents")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Continent_detail", kwargs={"pk": self.pk})






