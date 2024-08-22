import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "./app/lib/log/logger";

export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
}

export const config = {
  matcher: [{
    source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    missing: [
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "next-action" },
      { type: "header", key: "purpose", value: "prefetch" },
    ],
  },
  ],
};