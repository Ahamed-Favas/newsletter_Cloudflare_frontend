import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const allowedDomain = process.env.WORKER_DOMAIN as string;
  const domain = req.headers.get("cf-worker");
  if (domain !== allowedDomain ) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/api/mongo:path*",
};
