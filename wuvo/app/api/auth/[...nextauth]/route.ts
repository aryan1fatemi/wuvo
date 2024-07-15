import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"
import { authOptions } from "@/app/libs/auth"

/*This code configures authentication options for a 
Next.js application using NextAuth.js. It sets up multiple authentication providers, including GitHub, Google, and custom credentials,
 and integrates with a Prisma database adapter. */

  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };