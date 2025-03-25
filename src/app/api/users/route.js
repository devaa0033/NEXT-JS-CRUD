import { dbConnect } from "../../../../lib/db";

export  async function GET() {

    try {
        const db = await dbConnect();
        const [users] = await db.execute('SELECT id, Full_Name, Email_Address FROM User');

        return Response.json(users, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}