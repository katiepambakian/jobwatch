// pages/api/addUser.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from "@vercel/postgres";


export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Request method: ${req.method}`);

  if (req.method === 'POST') {
    const { email, postcode, password } = req.body;
    console.log(`Received data: ${JSON.stringify(req.body)}`)

    if (!email || !postcode || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    try {
      await sql`
        INSERT INTO users (email, postcode, password)
        VALUES (${email}, ${postcode}, ${password})
      `;
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error)
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
