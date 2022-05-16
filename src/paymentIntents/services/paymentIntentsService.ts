import { BadRequest, NotFound } from 'http-errors';
import { StripeCore } from '../../stripeCore';
import { MerchantsService } from '../../shared/merchantsService';
import { CustomersService } from '../../shared/customersService';
import { PaymentsService } from '../../shared/paymentsService';
import { FeeService } from '../../shared/feeService';

interface CreatePaymentIntentDto {
  userId: string;
  amount: number;
  merchantId: string;
  paymentId: string;
  paymentMethodTypes?: PaymentMethodTypes[];
}

export enum PaymentMethodTypes {
  SEPA_DEBIT = 'SEPA_DEBIT',
  CARD = 'CARD',
}

const createPaymentIntent = async ({
  userId,
  amount,
  merchantId,
  paymentId,
  paymentMethodTypes,
}: CreatePaymentIntentDto) => {
  const merchant = await MerchantsService.getMerchantById(merchantId);

  if (!merchant) throw new NotFound('Merchant does not exist');
  if (!merchant.stripeAccountId) throw new BadRequest('Merchant does not have a stripeAccountId');

  const payment = await PaymentsService.getPaymentById(paymentId);
  if (!payment) throw new NotFound('Payment does not exist');

  const stripeCustomer = await CustomersService.findByUserId(userId);

  return StripeCore.createPaymentIntent({
    amount,
    customer: stripeCustomer.customerId,
    transferDestination: merchant.stripeAccountId,
    applicationFeeAmount: FeeService.calculateFee(amount),
    metadata: { internal_payment_id: paymentId },
    paymentMethodTypes: mapPaymentMethodTypes(paymentMethodTypes),
  });
};

const mapPaymentMethodTypes = (paymentMethodTypes?: PaymentMethodTypes[]) => {
  const mapper = {
    [PaymentMethodTypes.CARD]: 'card',
    [PaymentMethodTypes.SEPA_DEBIT]: 'sepa_debit',
  } as const;

  return paymentMethodTypes?.map((e) => mapper[e]) ?? ['sepa_debit', 'card'];
};

export const PaymentIntentsService = {
  createPaymentIntent,
};
