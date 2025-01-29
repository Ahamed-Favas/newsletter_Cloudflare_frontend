import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
// import { Jwt } from "jsonwebtoken";

export async function GET(req: Request) {
    console.log(req)
    try {
        // const token = req.headers.get("Authorization")?.split(" ")[1];
        // if (!token) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        const users = await prisma.user.findMany()
        return NextResponse.json({ users}, {status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: error}, {status: 500})
    }
    
}