interface Payment {
  id: string;
  merchantId: string;
  amount: number;
}

const payments: Payment[] = [
  {
    id: '39442078-8d2b-4a24-be78-06c9927dc73d',
    merchantId: 'acct_1JxYh0123JAScmls89',
    amount: 100,
  },
  {
    id: '3012be48-4995-449d-80cb-2096c8ae9a57',
    merchantId: 'acct_2235YR01iascx5jUCE',
    amount: 9999,
  },
];

const paymentsDb = new Map<string, Payment>();
payments.map((payment) => {
  paymentsDb.set(payment.id, payment);
});

const getPaymentById = async (paymentId: string) => {
  return paymentsDb.get(paymentId);
};
// Add the new method here

export const PaymentsService = {
  getPaymentById,
};
