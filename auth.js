const jwt = require('jsonwebtoken');


const SECRET = "Lev3lup!7456";
module.exports = (req, res, next)=>{

    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({status: "error", message: "please specify a token"});

        const token = authHeader.split(' ')[1];
        const tokenData = jwt.verify(token, SECRET);

        req.user = tokenData.id;
        next();
    } catch (error) {
        res.status(401).json({status: "error", message: "you don't have access"});
    }

}