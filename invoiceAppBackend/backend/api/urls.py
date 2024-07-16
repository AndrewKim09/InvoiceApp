from django.urls import path
from . import views

urlpatterns = [
  path("invoices/", views.CreateInvoiceView.as_view(), name="note-create"),
  path("invoice/delete/<str:id>/", views.InvoiceDeleteView.as_view(), name="note-delete")
  
]