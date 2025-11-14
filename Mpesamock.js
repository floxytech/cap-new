js
// A small mock to simulate M-Pesa / bank payment processing delays and responses.
module.exports = {
  processMpesa: async (phone, amount) => {
    // simulate async call
    await new Promise(r => setTimeout(r, 1200));
    return {
      status: 'SUCCESS',
      provider: 'MPESA-MOCK',
      phone,
      amount,
      transactionId: 'MP' + Date.now()
    };
  },
  processBank: async (account, amount) => {
    await new Promise(r => setTimeout(r, 800));
    return {
      status: 'SUCCESS',
      provider: 'BANK-TRANSFER-MOCK',
      account,
      amount,
      transactionId: 'BT' + Date.now()
    };
  }
};