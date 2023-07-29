import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import authorizeUser from 'services/users/authorize';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials = { email: '', password: '' }) {
        const user = await authorizeUser({
          email: credentials.email,
          password: credentials.password,
        });
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        token.name = user?.fullName;
        token.role = user?.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.role = token?.role;
        session.user.id = token?.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
