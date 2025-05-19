// Example middleware to restrict access to admin routes via API key or basic token
module.exports = (req, res, next) => {
    const apixKey = req.headers['x-api-key'];
    const VALID_KEY = process.env.ADMIN_API_KEY;

    if (!apixKey !== VALID_KEY) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }

    next();
};
