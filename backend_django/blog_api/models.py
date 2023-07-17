from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=700)
    excerpt = models.CharField(max_length=1000)
    body = models.TextField()
    image = models.ImageField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Comment(models.Model):
    name = models.CharField(max_length=700)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    email = models.EmailField()
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    approve = models.BooleanField(default=False)
