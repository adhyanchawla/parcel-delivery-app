const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(400).json({error: "No Token Attached."});
    }
    else {
        const token = req.get('Authorization').split(' ')[1];
        let decodedtoken;
        try {
            decodedtoken = jwt.verify(token, 'somesupersecretsauce');
        } catch (err) {
            res.status(401).json({error: "Invalid Token Signature."});
        }
        if (!decodedtoken) {
            res.status(500).json({error: "Authentication Failed."});
        }
        // console.log(decodedtoken.id);
        req.id = decodedtoken.id;
    }
    next();
}