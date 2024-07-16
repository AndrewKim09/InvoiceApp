export class AddingInvoiceType {
  paymentDue: string
  clientName: string
  total: number
  status: string
  
  createdAt: string
  paymentTerms: number
  description: string
  clientEmail: string
  senderAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientAddress: {
    street: string 
    city: string
    postCode: string 
    country: string 
  }
  items: { name: string; quantity: number; price: number; total: number;  }[]

  constructor( paymentDue?: string, clientName?: string, total?: number, status?: string, createdAt?: string, paymentTerms?: number, description?: string, clientEmail?: string, senderAddress?: { street: string, city: string, postCode: string, country: string }, clientAddress?: { street: string, city: string, postCode: string, country: string }, items?: { name: string; quantity: number; price: number; total: number; }[]) {
    this.paymentDue = paymentDue || '';
    this.clientName = clientName || '';
    this.total = total || 0;
    this.status = status || '';
    this.createdAt = createdAt || '';
    this.paymentTerms = paymentTerms || 0;
    this.description = description || '';
    this.clientEmail = clientEmail || '';
    this.senderAddress = senderAddress || { street: '', city: '', postCode: '', country: '' };
    this.clientAddress = clientAddress || { street: '', city: '', postCode: '', country: '' };
    this.items = items || [];
  }
};