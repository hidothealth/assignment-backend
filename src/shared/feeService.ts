const PAYMENT_FEE = {
  RATE: 0.0198,
  ABSOLUTE_CENTS: 10,
};

const calculateFee = (amountInCents: number) => {
  const fee = amountInCents * PAYMENT_FEE.RATE + PAYMENT_FEE.ABSOLUTE_CENTS;
  return Math.round(parseFloat(fee.toFixed(2)));
};

export const FeeService = {
  calculateFee,
};
