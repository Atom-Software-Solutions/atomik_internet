// controllers/paymentWebhook.js
const { findOrCreateUser } = require('../services/user.service');
const { generateToken } = require('../services/token.service');
// const { sendSMS } = require('../services/sms.service');
const db = require('../db');

exports.handlePayment = async (req, res) => {
  try {
    const { phone_number, transaction_id, amount, provider } = req.body;

    if (!phone_number || !transaction_id || !amount || !provider) {
      return res.status(400).json({ error: 'Missing payment fields' });
    }

    if (parseFloat(amount) < 1000) {
      return res.status(400).json({ error: 'Amount below minimum' });
    }

    const user = await findOrCreateUser(phone_number);

    await db.query(`
      INSERT INTO atom.payments (user_id, amount, transaction_id, provider, status)
      VALUES ($1, $2, $3, $4, 'confirmed')`,
      [user.id, amount, transaction_id, provider]
    );

    const token = await generateToken(user.id);
    // await sendSMS(phone_number, `Your internet token is: ${token}. Valid for 24 hours.`);

    res.status(200).json({ message: 'Payment processed successfully', token });
  } catch (error) {
    console.error('Payment webhook error:', error);
    res.status(500).json({ error: 'Server error during payment processing' });
  }
};
