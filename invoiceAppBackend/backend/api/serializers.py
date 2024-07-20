from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note, Invoice, Address

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "password"]
    extra_kwargs = {
      "password": {"write_only": True}
    }

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  
class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = ["id", "title", "content", "created_at", "author"]
    extra_kwargs = {"author": {"read_only": True}}

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'postCode', 'country']

class InvoiceSerializer(serializers.ModelSerializer):
    senderAddress = AddressSerializer()
    clientAddress = AddressSerializer()
    
    class Meta:
        model = Invoice
        fields = ['id', 'paymentDue', 'clientName', 'total', 'status', 'createdAt', 'paymentTerms', 'description', 'clientEmail', 'senderAddress', 'clientAddress', 'items']

    def create(self, validated_data):
        sender_address_data = validated_data.pop('senderAddress')
        client_address_data = validated_data.pop('clientAddress')
        
        sender_address = Address.objects.create(**sender_address_data)
        client_address = Address.objects.create(**client_address_data)
        
        invoice = Invoice.objects.create(senderAddress=sender_address, clientAddress=client_address, **validated_data)
        
        return invoice
    
    def update(self, instance, validated_data):
        sender_address_data = validated_data.pop('senderAddress')
        client_address_data = validated_data.pop('clientAddress')

        # Update sender address
        sender_address = instance.senderAddress
        sender_address.street = sender_address_data.get('street', sender_address.street)
        sender_address.city = sender_address_data.get('city', sender_address.city)
        sender_address.postCode = sender_address_data.get('postCode', sender_address.postCode)
        sender_address.country = sender_address_data.get('country', sender_address.country)
        sender_address.save()

        # Update client address
        client_address = instance.clientAddress
        client_address.street = client_address_data.get('street', client_address.street)
        client_address.city = client_address_data.get('city', client_address.city)
        client_address.postCode = client_address_data.get('postCode', client_address.postCode)
        client_address.country = client_address_data.get('country', client_address.country)
        client_address.save()

        # Update invoice fields
        instance.paymentDue = validated_data.get('paymentDue', instance.paymentDue)
        instance.clientName = validated_data.get('clientName', instance.clientName)
        instance.total = validated_data.get('total', instance.total)
        instance.status = validated_data.get('status', instance.status)
        instance.createdAt = validated_data.get('createdAt', instance.createdAt)
        instance.paymentTerms = validated_data.get('paymentTerms', instance.paymentTerms)
        instance.description = validated_data.get('description', instance.description)
        instance.clientEmail = validated_data.get('clientEmail', instance.clientEmail)
        instance.items = validated_data.get('items', instance.items)
        
        instance.save()
        return instance
    
    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError as exc:
            print(exc.detail)  # Log the validation errors
            raise exc