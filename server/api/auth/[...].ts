import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || "" : "";
        token.username = user ? (user as any).username || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...token,
      };
      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "(hint: jsmith)",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "(hint: hunter2)",
        },
      },
      async authorize(credentials: any) {
        let url = "http://localhost:3000/api/login";
        let options = {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        };

        const resp = await fetch(url, options);
        if (!resp.ok) return null;

        const user = await resp.json();
        console.log(user);

        return user;
      },
    }),
  ],
});