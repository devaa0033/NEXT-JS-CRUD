import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

//Generate Access Token
const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        username: user.Full_Name,
        email: user.Email_Address
    };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '5d'
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
const verifyAccessToken = (req) => {
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);

    const authHeader = req.headers.get("Authorization");

    console.log("Authorization Header:", authHeader);

    const token = authHeader?.split(" ")[1] || req.cookies?.accessToken;

    console.log("Extracted Token:", token);

    if (!token) {
        console.log("No token provided");
        return new Response("You are not authenticated", { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded User:", decoded);
        return decoded;
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return new Response("Token is not valid", { status: 403 });
    }
};






//Verify refresh Token
const verifyRefreshToken = (req) => {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
        return new Response("You are not authenticated", { status: 401 });
    }

    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return new Response("Token is not valid", { status: 403 });
    }
};


export {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}