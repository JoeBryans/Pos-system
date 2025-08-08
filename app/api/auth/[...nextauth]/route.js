import { authOptions } from "../../../../lib/auth";
import NextAuth from "next-auth/next";
const handler = NextAuth(authOptions);

// export const googleHandler =NextAuth(
//   googleProvider
// )
// export { googleHandler as GET, googleHandler as POST}
export { handler as GET, handler as POST };
