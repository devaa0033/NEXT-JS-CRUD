import { dbConnect } from "../../../../lib/db";
import { generateAccessToken, generateRefreshToken } from "../../../../middleware/auth";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if(req.method !== "POST")
    {
        return res.status(405).json({error: "Method Not Allowed"})
    }

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "Email and Password are required"});
    }

    try {
        const db = await dbConnect();

        const [user] = await db.execute("SELECT * from User WHERE Email_Address = ?", [email]);

        if(user.length === 0) {
            return res.status(401).json({error: "User Not Found"});
        }

        //Get user data
        const userData = user[0];

        //Check password
        const passwordMatch =  bcrypt.compare(password, userData.Create_password);

        if(!passwordMatch) {
            return res.status(401).json({error: "Invalid Password"});
        }

        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        return res.status(200).json({message: "Login Successful", accessToken, refreshToken});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server Error"});
    }
};