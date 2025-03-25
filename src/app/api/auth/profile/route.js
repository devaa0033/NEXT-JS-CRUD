import { dbConnect } from "../../../../../lib/db";
import { verifyAccessToken } from "../../../../../middleware/auth";


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