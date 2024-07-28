// app/api/addUser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

{/** 
export async function addUser(req: NextApiRequest, res: NextApiResponse) {


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
    console.log("not working!!!");
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}*/}
// app/api/addUser/route.ts

export async function POST(req: NextRequest) {
  try {
    const { email, postcode, password } = await req.json();

    await sql`
      INSERT INTO USERS (email, postcode, password)
      VALUES (${email}, ${postcode}, ${password})
    `;

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error:unknown) {
    console.error('Error registering user:', error);

    let errorMessage = 'Internal server error';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Ensure the response is JSON
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}
