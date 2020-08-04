const { User } = require('./models');

class NullUser {
    isValid() { return false; }
    setPassword() {}
    isValidPassword() { return false; }
    toSafeObject() { return {}; }
};

async function create(details) {
    const user = await User.build(details);
    user.setPassword(details.password);
    return await user.save();
}

async function findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user || new NullUser();
}

async function findByUsername(username) {
    const user = await User.findOne({ where: { username } });
    return user || new NullUser();
}

async function findBySession(token) {
    const user = await User.findOne({ where: { session_token: token } });
    return user || new NullUser();
}

module.exports = {
    create,
    findByEmail,
    findByUsername,
    findBySession
}