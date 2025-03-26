import { dbConnect } from "../../../../lib/db";
import { verifyAccessToken } from "../../../../middleware/auth";

export  async function GET() {

    try {
        const db = await dbConnect();
        const [users] = await db.execute('SELECT id, Full_Name, Email_Address FROM User');

        return Response.json(users, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        const user = verifyAccessToken(req);

        if(!user.id){
            return new Response("User not found", {
                status: 404,
            })
        }

        const db = await dbConnect();

        const [result] = await db.execute('DELETE FROM User WHERE id = ?', [user.id]);

        if(result.affectedRows === 0){
            return new Response("User not found", {status: 404});
        }

        return new Response("Account deleted successfully", {status: 200});
    } catch (error) {
        console.error("Error deleting account", error);
        return new Response("Internal Server Error", {status: 500});
    }
}