const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(username, email, password) {
        // Check if user exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create user
        const user = await userRepository.createUser({ username, email, password });
        return this.generateToken(user._id);
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return this.generateToken(user._id);
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_123', {
            expiresIn: '30d',
        });
    }
}

module.exports = new AuthService();
