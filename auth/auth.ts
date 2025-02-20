import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/prisma";
import { SignJWT } from "jose";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
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
      try {
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

      } catch (error) {
        console.error(error)
        return false
      }

    }
  },
  pages: {
    signIn: "/"
  },
  session: {
      strategy: 'jwt'
  },
  jwt: {
        secret: process.env.NEXTAUTH_SECRET,
  },
  events: {  // triggered when user clicks link on mail
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async signIn(message: any) {
      const { user } = message;
      try {
      // transfering fields from pendingUsers to Users
        const pendingUser = await prisma.pendingUser.findUnique({
          where: {
            email: user.email
          }
        })

        if ( pendingUser == null ) return

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const unsubscribeToken = await new SignJWT({ mail: user.email })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

        await prisma.user.update({
          where : {
            email: user.email
          },
          data : {
            preferences: pendingUser.preferences,
            sources: pendingUser.sources,
            unsubToken: unsubscribeToken
          }
        })

        // deleting all pemding users which are not verified their email even after 24 hrs
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await prisma.pendingUser.deleteMany({
            where: {
                createdAt: {
                    lt: twentyFourHoursAgo
                }
            }
        });
      } catch (error) {
        console.error(error)
        return
      }
    }
  }
}