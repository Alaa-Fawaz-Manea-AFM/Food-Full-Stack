// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// export async function middleware(request: NextRequest) {
//   const intlResponse = intlMiddleware(request);

//   const token = request.cookies.get("accessToken")?.value;
//   console.log("🚀 ~ middleware ~ token:", token);

//   const pathname = request.nextUrl.pathname.replace(/^\/(ar|en)/, "") || "/";
//   console.log("🚀 ~ middleware ~ pathname:", pathname);

//   const isProtectedRoute =
//     pathname === "/cart" ||
//     pathname === "/order" ||
//     pathname.startsWith("/order/") ||
//     pathname.startsWith("/admin");
//   console.log("🚀 ~ middleware ~ isProtectedRoute:", isProtectedRoute);

//   const isAdminRoute =
//     pathname.startsWith("/admin") ||
//     pathname === "/category" ||
//     pathname.startsWith("/category/");

//   if (isProtectedRoute) {
//     if (!token) {
//       if (pathname === "/cart") {
//         return NextResponse.redirect(new URL("/menu", request.url));
//       }

//       return NextResponse.redirect(new URL("/log-in", request.url));
//     }

//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

//       const { payload } = await jwtVerify(token, secret);
//       console.log("🚀 ~ middleware ~ payload:", payload);

//       const decoded = payload;

//       if (isAdminRoute && decoded.role !== "ADMIN") {
//         console.log("00000000000000");

//         return NextResponse.redirect(new URL("/", request.url));
//       }
//     } catch {
//       console.log("111111111111");
//       return NextResponse.redirect(new URL("/log-in", request.url));
//     }
//   }

//   return intlResponse;
// }

// export const config = {
//   matcher: [
//     "/",
//     "/(ar|en)/:path*",
//     "/cart",
//     "/order",
//     "/order/:path*",
//     "/category",
//     "/category/:path*",
//     "/admin",
//     "/admin/:path*",
//     "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = intlMiddleware(request);

  const locale = pathname.startsWith("/ar") ? "ar" : "en";

  const cleanPath = pathname.replace(/^\/(ar|en)/, "") || "/";

  const token = request.cookies.get("accessToken")?.value;

  const isProtectedRoute =
    cleanPath === "/cart" ||
    cleanPath === "/order" ||
    cleanPath.startsWith("/order/") ||
    cleanPath.startsWith("/admin");

  const isAdminRoute =
    cleanPath.startsWith("/admin") ||
    cleanPath === "/category" ||
    cleanPath.startsWith("/category/");

  if (!isProtectedRoute) {
    return response;
  }

  // if (!token) {
  //   if (cleanPath === "/cart") {
  //     return NextResponse.redirect(new URL(`/${locale}/menu`, request.url));
  //   }

  //   return NextResponse.redirect(new URL(`/${locale}/log-in`, request.url));
  // }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    // const { payload } = await jwtVerify(token, secret);

    // if (isAdminRoute && payload.role !== "ADMIN") {
    //   return NextResponse.redirect(new URL(`/${locale}`, request.url));
    // }

    return response;
  } catch {
    return;
    // return NextResponse.redirect(new URL(`/${locale}/log-in`, request.url));
  }
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
