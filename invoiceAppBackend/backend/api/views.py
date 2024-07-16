from django.http import JsonResponse
from django.contrib.auth.models import User
from .serializers import UserSerializer, NoteSerializer, InvoiceSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Note, Invoice

class NoteListCreate(generics.ListCreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)

  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(author=self.request.user)
    else:
      print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]


class InvoiceListView(generics.ListAPIView):
  queryset = Invoice.objects.all()
  serializer_class = InvoiceSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Invoice.objects.filter(author=user)

class CreateInvoiceView(generics.ListCreateAPIView):
  serializer_class = InvoiceSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Invoice.objects.filter(author=user)

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)
    if serializer.is_valid():
      serializer.save()
    else:
      print(serializer.errors)

class InvoiceDeleteView(generics.DestroyAPIView):
  serializer_class = InvoiceSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Invoice.objects.filter(author=user)

class EditInvoiceView(generics.UpdateAPIView):
  serializer_class = InvoiceSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Invoice.objects.filter(author=user)
  
  

