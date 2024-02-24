import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Parse the request body to get the video data
    const requestBody = await request.json();
    const {
      id, // Assuming the request includes the video ID
      title,
      assetIdentifier,
      duration,
      frameRate,
      creationDate,
      actions, // Assuming actions is an array of objects with action data
      states, // Assuming states is an array of objects with gameState data
    } = requestBody;

    // Create a new video record with the passed ID and request data
    const video = await prisma.video.create({
      data: {
        id, // Use the passed ID
        title,
        assetIdentifier,
        duration,
        frameRate,
        creationDate: new Date(creationDate), // Assuming creationDate is in an acceptable format
        labellingDone: false,
        savedToPlanetscale: false,
        // Use the passed actions and states data
        actions: {
          create: actions, // Directly use the actions array from the request
        },
        states: {
          create: states, // Directly use the states array from the request
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
