import { sql } from "@vercel/postgres";

export default async function addUser({
  params
} : {
  params: { email: string, postcode:string, password:string}
}): Promise<boolean> {
  const { rows } = await sql` INSERT INTO users (email, postcode, password)
        VALUES (${params.email}, ${params.postcode}, ${params.password}`;

  return (true);
}