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

    const selectedPrefersList = Object.keys(selectedPrefers).filter(key => selectedPrefers[key]);
    const selectedSourceList = Object.keys(selectedSource).filter(key => selectedSource[key]);

    const isPrefSubset = selectedPrefersList.every(pref => allowedPrefers.includes(pref))
    if ( !isPrefSubset || 1 > selectedPrefersList.length || allowedPrefers.length < selectedPrefersList.length ) {  // atleast one and maximum upto allowedPrefers.length
        return { status: "error" }
    }

    const isSourcSubset = selectedSourceList.every(sou => allowedSources.includes(sou))
    if ( !isSourcSubset || selectedSourceList.length !== 1 ) { // atleast and only one source as of now
        return { status: "error" } 
    }

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