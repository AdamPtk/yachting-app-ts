import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    id: string;
    role: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
