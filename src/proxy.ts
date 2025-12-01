// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Auth required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }

    const [scheme, encoded] = authHeader.split(" ");
    if (scheme !== "Basic") {
      return new NextResponse("Invalid auth scheme", { status: 401 });
    }

    const decoded = Buffer.from(encoded, "base64").toString();
    const [user, pass] = decoded.split(":");

    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
      return NextResponse.next();
    }

    return new NextResponse("Invalid credentials", { status: 403 });
  }

  return NextResponse.next();
}
