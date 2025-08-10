import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    // console.log("🚀 ~ middleware ~ token:", token)
   
    const { pathname } = req.nextUrl.clone();
 
    const publicRoutes = [
        "/auth/login/",
        "/auth/register/",
        "/auth/forgot-password",
        "/auth/new-password",
        "/auth/verify",
    ];

 

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/auth/login/", req.url));
    }
    // Redirect to dashboard if authenticated user tries to access public pages
    if (token && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard/", req.url));
    }

    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/login/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
    ],
};