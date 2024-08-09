const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Yashkulk0987@#';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    console.log('Received token:', token); // Debugging: Log the token received
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log('Token data:', data); // Debugging: Log the token data
        req.user = data.user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Debugging: Log the error
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
