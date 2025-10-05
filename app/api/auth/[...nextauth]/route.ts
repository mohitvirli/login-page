import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Spotify from "next-auth/providers/spotify";

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
          image: "/avatar.png",
          name: "Mohit Virli",
          password: "password",
          email: "test@gmail.com",
        };

        if (
          email === mockUser.email &&
          password === mockUser.password
        ) {
          return {
            id: mockUser.id,
            image: mockUser.image,
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
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    })
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
