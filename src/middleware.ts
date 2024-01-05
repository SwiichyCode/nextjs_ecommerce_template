import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (!sessionToken) return false;

      return true;
    },
  },
});

export const config = { matcher: ["/admin"] };
