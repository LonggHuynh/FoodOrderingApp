const admin = require('../firebase.config');
const auth = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    try {
        const user = await admin.auth().verifyIdToken(token);
        req.user = user
        next()
    }
    catch (err) {

        next(err)
    }
}


module.exports = auth