import { withAuth } from "next-auth/middleware";
import { env } from "@/env";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // Refer to .env.example for the value of SESSION_TOKEN_NAME.

      const sessionToken = req.cookies.get(env.SESSION_TOKEN_NAME);
      if (!sessionToken) return false;

      return true;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

export const config = { matcher: ["/admin", "/admin/:path*"] };
