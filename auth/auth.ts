import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async signIn({ user }: { user: any }) {
      const userExists = await prisma.user.findUnique({
        where: {
            email: user.email || '',
        }
      })
      if(userExists) {
        return false //  Don't send mail to already authenticated mail
      } else {
        return true
      }
    }
  },
  pages: {
    signIn: "/"
  },
}