const { toUpper } = require('lodash');
const db = require('../db');

exports.validateToken = async (req, res) => {
    try {
        const { token: _token } = req.query;

        const token = toUpper(_token);

        if (!token) return res.status(400).json({ error: 'Token is required' });

        const result = await db.query(
            `SELECT * FROM atom.tokens WHERE token = $1 AND is_active = TRUE AND valid_until > NOW()`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
        }

        res.json({ valid: true, message: 'Token is valid' });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
