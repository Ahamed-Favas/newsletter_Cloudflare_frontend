import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const allowedOrigin = process.env.WORKER_URL as string;
  const origin = req.headers.get("origin") || req.headers.get("referer");
  if (!origin || !origin.startsWith(allowedOrigin)) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
