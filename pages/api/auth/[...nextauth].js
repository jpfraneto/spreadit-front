import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // async jwt(token, account) {
  //   if (account?.accessToken) {
  //     token.accessToken = account.accessToken;
  //   }
  //   return token;
  // },
  debug: false,
  callbacks: {
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.username = user.username;
      return session;
    },
    redirect: async (url, _baseUrl) => {
      if (url === '/user') {
        return Promise.resolve('/');
      }
      return Promise.resolve('/');
    },
  },
});
