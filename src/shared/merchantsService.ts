interface Merchant {
  id: string;
  name: string;
  stripeAccountId: string;
}

const merchants = [
  { id: '1', name: 'ACME 1', stripeAccountId: 'acct_1JxYF0PmoUt5zCi3' },
  { id: '2', name: 'ACME 2', stripeAccountId: 'acct_1JxYF0PmoUt5zCi3' },
];
const merchantDb = new Map<string, Merchant>();
merchants.map((merchant) => {
  merchantDb.set(merchant.id, merchant);
});

const getMerchantById = async (merchantId: string) => {
  return merchantDb.get(merchantId);
};

export const MerchantsService = {
  getMerchantById,
};
