from django.urls import path
from . import views

urlpatterns = [
  path("invoices/", views.CreateInvoiceView.as_view(), name="invoiceS-create"),
  path('api/invoices/<int:pk>/', views.EditInvoiceView.as_view(), name='edit-invoice'),
  path("invoices/delete/<int:pk>/", views.InvoiceDeleteView.as_view(), name="invoice-delete")
  
]