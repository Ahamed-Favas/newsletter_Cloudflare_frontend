import { AddPendingUser } from "@/app/actions/checkInput&Addpending";
import { signIn } from "next-auth/react"

export async function SignIN(email: string, selectedPrefers: { [k: string]: boolean; }, selectedSource: { [k: string]: boolean; }): Promise<{status: string}> {
    const { status } = await AddPendingUser(email, selectedPrefers, selectedSource)
    if(status === "error") {
        return {status: "error"}
    }
    const signInResponse = await signIn('email', {
        email: email,
        callbackUrl: 'https://newsletter.pastpricing.com/confirmation',
        redirect: false,
    })
    if( !signInResponse?.ok ) {
        return {status: "error"}
    }
    return {status: "success"};
}