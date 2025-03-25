import { headers } from "next/headers";
import { dbConnect } from "../../../../../lib/db";
import { generateAccessToken, generateRefreshToken } from "../../../../../middleware/auth";
import bcrypt from "bcryptjs";

export async function POST(req) {
    if(req.method !== "POST")
    {
        return new Response("Method Not Allowed", {status: 405});
    }

    const {email, password} = await req.json();
    if(!email || !password){
       return new Response("Email and Password are required", {status: 400});
    }

    try {
        const db = await dbConnect();

        const [user] = await db.execute("SELECT * from User WHERE Email_Address = ?", [email]);

        if(user.length === 0) {
            return new Response("User not found", {status: 404});
        }

        //Get user data
        const userData = user[0];

        //Check password
        const passwordMatch = await bcrypt.compare(password, userData.Create_password);

        if(!passwordMatch) {
            return new Response("Invalid password", {status: 401});        
        }

        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        //Set cookies for authetication
        const headers = new Headers();
        headers.append("Set-Cookie", `accessToken=${accessToken}; HttpOnly; Path=/; Secure; SameSite=Strict`);
        headers.append("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`);
        headers.append("Content-Type", "application/json");

        return new Response(JSON.stringify({message: "Login Successful",accessToken, refreshToken}), {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500});
    }
};