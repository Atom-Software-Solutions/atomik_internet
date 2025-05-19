const axios = require('axios');

exports.sendSMS = async (phoneNumber, message) => {
    // Replace with actual SMS API credentials and endpoint
    const API_URL = 'https://api.smsgateway.com/send';
    const API_KEY = 'YOUR_API_KEY';

    try {
        const response = await axios.post(API_URL, {
            api_key: API_KEY,
            to: phoneNumber,
            message
        });

        return response.data;
    } catch (error) {
        console.error('Failed to send SMS:', error.response?.data || error);
        throw new Error('SMS sending failed');
    }
};
