//src/lib/authOptions.ts

import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import { compare } from "bcryptjs"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise
        const users = client.db().collection("users")

        const user = await users.findOne({ email: credentials?.email })
        if (!user) throw new Error("Aucun utilisateur trouvé.")

        const isValid = await compare(credentials!.password, user.password)
        if (!isValid) throw new Error("Mot de passe incorrect.")

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "",
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  jwt: { maxAge: 7 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
