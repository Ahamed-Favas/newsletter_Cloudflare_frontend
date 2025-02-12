import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { jwtVerify } from "jose";

export async function GET(
  request: Request
) {
  const { token } = await request.json()
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    const userEmail = payload.mail;
    
    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }
    
    await prisma.user.delete({
      where: { email: userEmail as string },
    });
    
    return NextResponse.json({ message: "Successfully unsubscribed" });
  } catch (error) {
    console.error("Error in unsubscribe API:", error);
    return NextResponse.json(
      { error: "Invalid token or deletion failed" },
      { status: 400 }
    );
  }
}
