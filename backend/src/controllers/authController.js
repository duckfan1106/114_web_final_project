const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const token = await authService.register(username, email, password);
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.getMe = async (req, res) => {
    // This will be protected by middleware
    res.status(200).json({ success: true, data: req.user });
};
