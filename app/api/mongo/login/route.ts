import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (username !== process.env.CF_USERNAME || password !== process.env.CF_PASSWORD ) {
            return NextResponse.json({ message: "User Not Authenticated" }, { status: 401 })
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        const response =  NextResponse.json({message: "Authenticated"}, {status: 200});
        response.headers.set("Authorization", `Bearer ${token}`);
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
}
