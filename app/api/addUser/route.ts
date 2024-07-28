// app/api/addUser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

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
