import { dbConnect } from "../../../../../lib/db";
import { verifyAccessToken } from "../../../../../middleware/auth";
import bcrypt from "bcryptjs";


export async function GET(req) {
    try {
        const user = verifyAccessToken(req);
        const db = await dbConnect();

        const [userData] = await db.execute('SELECT * FROM User WHERE id = ? ', [user.id] );

        if(userData.length === 0){
            return new Response("User not found", {status: 404});
        }
        return new Response(JSON.stringify(userData[0]), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 401 }); 
    }
}


export async function PUT(req) {
    try {
        const user = verifyAccessToken(req);
        const db = await dbConnect();

        const [userData] = await db.execute('SELECT * FROM User WHERE id = ? ', [user.id] );

        if(userData.length === 0){
            return new Response("User not found", {
                status: 404,
            })
        }

        const { Full_Name, Email_Address, Create_password } = await req.json();

          // Ensure no undefined values are passed
          const updatedName = Full_Name ?? userData[0].Full_Name;
          const updatedEmail = Email_Address ?? userData[0].Email_Address;
          let updatedPassword = userData[0].Create_password;

          if(Create_password){
            const hashedPassword = await bcrypt.hash(Create_password, 10);
            updatedPassword = hashedPassword
          }


        const [result] = await db.execute('UPDATE User SET Full_Name = ?, Email_Address = ?, Create_password = ? WHERE id = ? ', [updatedName, updatedEmail, updatedPassword, user.id] );

        if(result.affectedRows === 0){
            return new Response("User not found", {
                status: 404,
            })
        }

        return new Response("User updated successfully", {
            status: 200
        })
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 401 });
    }
}