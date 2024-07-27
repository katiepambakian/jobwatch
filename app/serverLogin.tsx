import { sql } from "@vercel/postgres";

export default async function AddUser({
  params
} : {
  params: {email: string, postcode:string, password:string }
}): Promise<boolean> {
  //const { rows } = await sql`SELECT * from CARTS where user_id=${params.user}`;
  await sql`INSERT email, password, postcode where email=${params.email} and password=${params.password} and postcode=${params.postcode} `;
  return (true);
}


