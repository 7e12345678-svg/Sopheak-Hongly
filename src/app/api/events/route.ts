import { NextResponse } from "next/server";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = () => {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              time: Date.now(),
            })}\n\n`
          )
        );
      };

      send();

      const interval = setInterval(send, 3000);

      return () => clearInterval(interval);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}