"use server";

export async function sample(email: string): Promise<{status: string}> {
    await new Promise<number>(resolve => setTimeout(resolve, 500));
    return {status: "success"};
}