//src/app/api/auth/nextauth.ts
import NextAuth, { type AuthOptions } from "next-auth"
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

        console.log("🔐 Tentative de connexion avec :", credentials?.email)

        const user = await users.findOne({ email: credentials?.email })
        if (!user) {
          console.warn("❌ Utilisateur introuvable :", credentials?.email)
          throw new Error("Aucun utilisateur trouvé.")
        }

        const isValid = await compare(credentials!.password, user.password)
        if (!isValid) {
          console.warn("❌ Mot de passe incorrect pour :", credentials?.email)
          throw new Error("Mot de passe incorrect.")
        }

        console.log("✅ Connexion réussie :", user.email)

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "", // facultatif mais utile
        }
      }
    })
  ],
  pages: {
    signIn: "/login",      // page de login personnalisée
    error: "/login",       // redirige vers login en cas d'erreur
  },
  session: {
    strategy: "jwt",        // JWT côté client
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.sub = user.id // 🔥 Très important pour que session.user.id fonctionne
        console.log("🔑 JWT généré pour :", user.email)
      }
      return token
    },
    async session({ session, token }) {
        // Vérifie que session.user est bien défini
        if (session.user) {
          session.user.id = token.sub as string
          session.user.name = token.name as string
          session.user.email = token.email as string
          console.log("📦 Session restaurée pour :", session.user.email)
        } else {
          console.warn("⚠️ session.user est undefined")
        }
      
        return session
      }
      
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
