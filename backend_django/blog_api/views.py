from django.shortcuts import render
from rest_framework import viewsets, pagination
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Post, Category, Comment
from .forms import CommentForm
from .serializers import PostSerializer, CategorySerializer, CommentSerializer

# Create your views here.


class CustomPagination(pagination.PageNumberPagination):
    page_size = 4  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'
    pagination_class = CustomPagination

    @action(detail=True, methods=['GET'])
    def adjacent_posts(self, request, pk=None):
        try:
            post = self.get_object()
            previous_post = self.queryset.filter(
                created__lt=post.created).order_by('-created').first()
            next_post = self.queryset.filter(
                created__gt=post.created).order_by('created').first()

            previous_post_data = self.serializer_class(
                previous_post).data if previous_post else None
            next_post_data = self.serializer_class(
                next_post).data if next_post else None

            return Response({'previous': previous_post_data, 'next': next_post_data})
        except Post.DoesNotExist:
            return Response(status=404)


class FeaturedPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(featured=True)
    serializer_class = PostSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    for se in queryset:
        print(f'{se.name} - {se.id}')
    serializer_class = CategorySerializer


# class CategoryPostsPageViewSet(viewsets.ModelViewSet):
    #serializer_class = PostSerializer
    #queryset = Post.objects.all()
    #pagination_class = CustomPagination

   # def get_queryset(self):
    #category_id = self.kwargs.get('pk')
    # return super().get_queryset().filter(category=category_id)

   # def retrieve(self, request, pk=None):
    # queryset = self.get_queryset()
    # serializer = self.get_serializer(queryset, many=True)
    # return Response(serializer.data)


class CategoryPostsPageViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    pagination_class = CustomPagination

    def get_queryset(self):
        category_id = self.kwargs.get('pk')
        queryset = super().get_queryset().filter(category=category_id)
        print(queryset)
        return queryset

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        page = self.paginate_queryset(serializer.data)
        category_post = self.get_paginated_response(page)
        return category_post


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        post_id = self.kwargs.get('pk')
        return super().get_queryset().filter(post=post_id)

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateCommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def create(self, request):
        form = CommentForm(request.data)
        post_id = request.data.get('post_id')
        post = Post.objects.get(id=post_id)

        if form.is_valid():
            comment = Comment(
                name=form.cleaned_data['name'],
                body=form.cleaned_data['body'],
                email=form.cleaned_data['email'],
                post=post
            )

            comment.save()
            serializer = self.get_serializer(comment)
            return Response(serializer.data)
        else:
            return Response(form.errors, status=400)
