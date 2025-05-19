const db = require('../db');
const crypto = require('crypto');

exports.generateToken = async (userId) => {
    const token = crypto.randomBytes(3).toString('hex').toUpperCase();
    const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const insert = await db.query(
        `INSERT INTO atom.tokens (user_id, token, valid_until)
     VALUES ($1, $2, $3) RETURNING token`,
        [userId, token, validUntil]
    );

    return insert.rows[0].token;
};
