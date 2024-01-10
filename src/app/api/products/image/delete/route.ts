import { del } from "@vercel/blob";

export const runtime = "edge";

export async function DELETE(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return new Response("filename is required", { status: 400 });
  }

  await del(filename);

  return new Response(null, { status: 204 });
}
