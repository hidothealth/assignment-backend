interface StripeCustomer {
  customerId: string;
  userId: string;
}

const customers: StripeCustomer[] = [
  { customerId: 'cus_M8OqWSOKNw1zJA', userId: '540a02e8-39c2-4278-88dc-469399cbb54e' },
];

const customersDb = new Map<string, StripeCustomer>();
customers.map((customer) => {
  customersDb.set(customer.customerId, customer);
  customersDb.set(customer.userId, customer);
});

const findByUserId = async (userId: string) => {
  const customer = customersDb.get(userId);
  if (customer) return customer;
  throw new Error(`Customer not found for given user ID ${userId}`);
};

export const CustomersService = {
  findByUserId,
};
