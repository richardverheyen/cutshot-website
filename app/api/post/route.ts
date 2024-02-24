import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    // Create a new video record with a linked action and gameState record
    const video = await prisma.video.create({
      data: {
        title: "New Video Title",
        assetIdentifier: "SomeIdentifier",
        duration: 120.0,
        frameRate: 30.0,
        creationDate: new Date(),
        labellingDone: false,
        savedToPlanetscale: false,
        // Nested write to simultaneously create related records
        actions: {
          create: [
            {
              timestamp: 10.0,
              type: "spike",
            },
          ],
        },
        states: {
          create: [
            {
              startTimestamp: 0.0,
              endTimestamp: 120.0,
              inPlay: true,
            },
          ],
        },
      },
    });

    return new Response(JSON.stringify(video), {
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
