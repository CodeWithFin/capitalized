// Simple in-memory storage for demonstration
// In production, this should be replaced with a proper database

export interface PaymentRecord {
  id: string;
  email: string;
  phoneNumber: string;
  amount: number;
  eventType: string;
  ticketType: 'individual' | 'corporate';
  quantity: number;
  isClubMember: boolean;
  clubId?: string;
  checkoutRequestId: string;
  merchantRequestId: string;
  status: 'pending' | 'success' | 'failed';
  mpesaReceiptNumber?: string;
  transactionDate?: number;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage (replace with proper database in production)
const paymentRecords: Map<string, PaymentRecord> = new Map();

export const savePaymentRecord = (record: Omit<PaymentRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
  const id = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();
  
  const paymentRecord: PaymentRecord = {
    ...record,
    id,
    createdAt: now,
    updatedAt: now
  };
  
  paymentRecords.set(record.checkoutRequestId, paymentRecord);
  return paymentRecord;
};

export const getPaymentRecord = (checkoutRequestId: string) => {
  return paymentRecords.get(checkoutRequestId);
};

export const updatePaymentRecord = (checkoutRequestId: string, updates: Partial<PaymentRecord>) => {
  const record = paymentRecords.get(checkoutRequestId);
  if (record) {
    const updatedRecord = {
      ...record,
      ...updates,
      updatedAt: new Date()
    };
    paymentRecords.set(checkoutRequestId, updatedRecord);
    return updatedRecord;
  }
  return null;
};