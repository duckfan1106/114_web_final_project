const User = require('../models/User');

class UserRepository {
    async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findById(id) {
        return await User.findById(id);
    }
}

module.exports = new UserRepository();
