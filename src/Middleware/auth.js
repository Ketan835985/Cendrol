const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env


const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({ status: 'Token is missing In headers' });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        req.token = token

        next();
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message
        })
    }
}

module.exports ={
    auth
}