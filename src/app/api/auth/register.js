import { dbConnect } from "../../../../lib/db";
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

    const {username, email, password} = req.body;

    if(!username || !email || !password) return res.status(400).json({error: 'All fields are required'});

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const db = await dbConnect();
        console.log("Database Connected");


          // Check if the user already exists
          const [existingUser] = await db.execute('SELECT * FROM User WHERE Email_Address = ?', [email]);
          
          if (existingUser.length > 0) {
              console.log("User already exists");
              return res.status(409).json({ error: 'User already exists' });
          }


        await db.execute('INSERT INTO User (`Full_Name`, `Email_Address`, `Create_password`) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.status(201).json({message: 'User registered successfully'});
        console.log('User registered successfully');
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}