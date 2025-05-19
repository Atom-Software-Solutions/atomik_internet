const db = require('../db');

exports.getStats = async (req, res) => {
    try {
        const [userCount, paymentSum, activeTokens] = await Promise.all([
            db.query('SELECT COUNT(*) FROM atom.users'),
            db.query('SELECT SUM(amount) FROM atom.payments WHERE status = $1', ['confirmed']),
            db.query('SELECT COUNT(*) FROM atom.tokens WHERE is_active = TRUE AND valid_until > NOW()')
        ]);

        res.json({
            users: userCount.rows[0].count,
            total_revenue: paymentSum.rows[0].sum,
            active_tokens: activeTokens.rows[0].count
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Could not retrieve admin stats' });
    }
};
