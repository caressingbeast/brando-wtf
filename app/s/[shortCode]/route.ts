import { type NextRequest, NextResponse } from "next/server";

import { getUrlByShortCode } from "@/lib/actions";

type Context = {
  params: Promise<{ shortCode: string; }>;
};

export async function GET(request: NextRequest, context: Context) {
  const { shortCode } = await context.params;

  try {
    const originalUrl = await getUrlByShortCode(shortCode);

    if (!originalUrl) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.redirect(originalUrl, 302);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}