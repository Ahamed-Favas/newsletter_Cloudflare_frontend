import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

async function getUsers() {
    return await prisma.user.findMany();
}

export async function GET(req: Request) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("SUCCESS: Connected to protected route");
        const users = await getUsers();
        return NextResponse.json({ users: users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }
}
