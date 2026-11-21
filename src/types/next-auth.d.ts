import { DefaultSession } from "next-auth";

type ApiUser = {
  name: string;
  email: string;
  role: string;
};

declare module "next-auth" {
  interface User {
    user: ApiUser;
    token: string;
  }

  interface Session {
    user: ApiUser & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ApiUser;
    token: string;
  }
}