import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

//Generate Access Token
const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '2d'
    })
     return token
}

//Generate Refresh Token
const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };
    const token = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    })
    return token
}

//Verify Access Token
const verifyAccessToken = (req, res, next) => {
   const token = req.cookies.accessToken || req.headers.authorization.split(" ")[1];
   if(!token)
    return res.status(401).json("You are not authenticated");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json("Token is not valid");
    }
   
}


//Verify refresh Token
const verifyRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken || req.headers.authorization.split(" ")[1];
   if(!token)
    return res.status(401).json("You are not authenticated");

    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json("Token is not valid");
    }
}

export {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}