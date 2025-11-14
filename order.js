const express = require('express');
const router = express.Router();
const { processMpesa, processBank } = require('../utils/mpesaMock');
const { v4: uuidv4 } = require('uuid');

// In-memory orders store (for demo). Replace with DB in production.
const orders = [];

router.post('/create', async (req, res) => {
  const { items, customer, paymentMethod, paymentData } = req.body;
  if (!items || !customer) return res.status(400).json({ error: 'Invalid order payload' });
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  let paymentResult = { status: 'PENDING' };

  try {
    if (paymentMethod === 'mpesa') {
      paymentResult = await processMpesa(paymentData.phone, total);
    } else if (paymentMethod === 'bank') {
      paymentResult = await processBank(paymentData.account, total);
    } else {
      paymentResult = { status: 'PENDING' };
    }

    const order = {
      id: uuidv4(),
      items,
      customer,
      total,
      paymentMethod,
      paymentResult,
      createdAt: new Date()
    };
    orders.push(order);
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;