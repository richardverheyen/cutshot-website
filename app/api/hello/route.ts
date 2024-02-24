import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // static by default, unless reading the request
export const runtime = "nodejs";
export async function GET() {
  const videos = await prisma.video.findMany();
  return new Response(`Hello from ${[...videos.map((video) => video.id)]}`);
}
