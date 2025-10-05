import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Mock check (replace with DB lookup in production)
        const mockUser = {
          id: "1",
          name: "Test User",
          password: "password123",
          email: "test@example.com",
        };

        if (
          email === mockUser.email &&
          password === mockUser.password
        ) {
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
          };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     session.user.id = token.sub;
  //     return session;
  //   },
  // },
});

export { handler as GET, handler as POST };
