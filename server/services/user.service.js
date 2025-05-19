const db = require('../db');

exports.findOrCreateUser = async (phone_number) => {
    const result = await db.query('SELECT * FROM atom.users WHERE phone_number = $1', [phone_number]);

    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        const insert = await db.query(
            'INSERT INTO atom.users (phone_number) VALUES ($1) RETURNING *',
            [phone_number]
        );
        return insert.rows[0];
    }
};
