import { withAuth } from "next-auth/middleware";
import { env } from "./env";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (!sessionToken) return false;

      return true;
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

export const config = { matcher: ["/admin", "/admin/:path*"] };
