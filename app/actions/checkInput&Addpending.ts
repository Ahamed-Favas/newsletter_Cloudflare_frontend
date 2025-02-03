"use server"
import { z } from "zod";
import { newsOptions, prefOptions } from "@/sources/sources";
import { prisma } from "@/prisma/prisma";


const emailSchema = z.string().email();
const allowedPrefers = prefOptions;
const allowedSources = newsOptions;

export async function AddPendingUser( email: string, selectedPrefers: { [k: string]: boolean; }, selectedSource: { [k: string]: boolean; }): Promise<{status: string}> {
    const checkEmail = emailSchema.safeParse(email);
    if (!checkEmail.success) return { status: "error" }

    const selectedPrefersLength = Object.values(selectedPrefers).filter(Boolean).length;
    const selectedSourceLength = Object.values(selectedSource).filter(Boolean).length;

    Object.keys(selectedPrefers).forEach((key)=>{
        if (!allowedSources.includes(key) || 1 > selectedPrefersLength || 3 < selectedPrefersLength) {
            return { status: "error" }
        }
    })

    Object.keys(selectedSource).forEach((key)=>{
        if (!allowedPrefers.includes(key) || selectedSourceLength !== 1 ) {
            return { status: "error" }
        }
    })

    try {
        await prisma.pendingUser.upsert({
        create: {
            email: email,
            preferences: selectedPrefers,
            sources: selectedSource
        },
        where: {
            email: email
        },
        update: {
            preferences: selectedPrefers,
            sources: selectedSource
        }
        })
    } catch {
        return { status: "error" }
    }

    return { status: "success"}
}