import { NextResponse } from "next/server";

export async function GET() {
  const encoder = new TextEncoder();

  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                time: Date.now(),
              })}\n\n`
            )
          );
        } catch (err) {
          console.log("SSE connection closed");
          clearInterval(interval);
        }
      };

      send();

      interval = setInterval(send, 3000);
    },

    cancel() {
      clearInterval(interval);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}