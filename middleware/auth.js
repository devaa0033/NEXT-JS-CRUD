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
const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}


//Verify refresh Token
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
}

export {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}