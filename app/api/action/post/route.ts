import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const requestBody = await request.json();
    const actions = requestBody.actions; // Expecting an array of Action objects

    // Use Prisma's createMany to insert multiple records
    const result = await prisma.action.createMany({
      data: actions, // Directly pass the array of action data
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
