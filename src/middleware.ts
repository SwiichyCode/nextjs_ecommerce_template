// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ req }) => {
//       const sessionToken = req.cookies.get("next-auth.session-token");
//       if (!sessionToken) return false;

//       return true;
//     },
//   },
// });

// export const config = { matcher: ["/admin/:path*"] };

export function middleware(request: Request) {
  // return NextResponse.redirect(new URL('/home', request.url))
}
