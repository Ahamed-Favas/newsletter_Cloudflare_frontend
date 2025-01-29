import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
// import { SignJWT } from "jose";

async function getUsers() {
    return await prisma.user.findMany();
}

export async function GET(req: Request) {
    // // test
    // const secret1 = new TextEncoder().encode(process.env.JWT_SECRET)
    // const authToken = await new SignJWT({ user: "cloudflare-worker" })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setExpirationTime("1h")
    //   .sign(secret1);
    // console.log(authToken);
    // try {
    //     await jwtVerify(authToken, secret1)
    //     console.log("success")
    // } catch {
    //     console.log("error")
    // }
    
    // // test
    
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("token", token)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        await jwtVerify(token, secret);
        const users = await getUsers();
        return NextResponse.json({ users: users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
    }
}
