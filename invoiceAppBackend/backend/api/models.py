from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
  title = models.CharField(max_length=100)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

  def __str__(self):
    return self.title
  
class Address(models.Model):
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postCode = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.country}"

class Invoice(models.Model):
    createdAt = models.CharField(max_length=11)
    paymentDue = models.CharField(max_length=11)
    description = models.CharField(max_length=100)
    paymentTerms = models.IntegerField()
    clientName = models.CharField(max_length=100)
    clientEmail = models.EmailField()
    status = models.CharField(max_length=20)
    senderAddress = models.OneToOneField(Address, related_name='sender_address', on_delete=models.CASCADE)
    clientAddress = models.OneToOneField(Address, related_name='client_address', on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField(default=list)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')

    def __str__(self):
        return self.id
