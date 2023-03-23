import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const url = request.nextUrl.clone();
  const isDesktop = device.type !== "mobile";

  if (isDesktop) {
    url.pathname = `/desktop${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = { matcher: "/((?!.*\\.).*)" };
