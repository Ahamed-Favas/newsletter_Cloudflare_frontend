import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { EncryptJWT, jwtVerify } from "jose";

async function getUsers() {
    return await prisma.user.findMany();
}

export async function GET(req: Request) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        await jwtVerify(token, secret);
        const users = await getUsers();

         const encryptedUsersData = await new EncryptJWT( {users} )
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime("5 minutes")
        .encrypt(secret);

        return NextResponse.json({ token: encryptedUsersData }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
    }
}
