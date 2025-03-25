import { dbConnect } from "../../../../../lib/db";
import bcrypt from 'bcryptjs';


export async function POST(req) {
    try {
      // Parse request body correctly
      const { username, email, password } = await req.json();
  
      if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: "All fields are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Connect to database
      const db = await dbConnect();
  
      // Check if user already exists
      const [existingUser] = await db.execute("SELECT * FROM User WHERE Email_Address = ?", [email]);
      if (existingUser.length > 0) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Insert new user
      await db.execute(
        "INSERT INTO User (`Full_Name`, `Email_Address`, `Create_password`) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
  
      return new Response(JSON.stringify({ message: "User registered successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Database error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }