
export function getCustomerSync(id) {
  console.log('Reading a customer from MongoDB...');
  return { id, points: 11 };
}

export async function getCustomer(id) {
  return new Promise((resolve, reject) => {
    console.log('Reading a customer from MongoDB...');
    resolve({ id, points: 11 });
  });
}
