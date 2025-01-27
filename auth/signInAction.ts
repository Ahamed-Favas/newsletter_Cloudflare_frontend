import { signIn } from "next-auth/react"
export async function SignIN(email: string): Promise<{status: string}> {
    const signInResponse = await signIn('email', {
        email: email,
        callbackUrl: '/confirmation',
        redirect: false,
    })
    if( !signInResponse?.ok ) {
        return {status: "error"}
    }
    return {status: "success"};
}

//TODO depoy and change email
//TODO configure cf to read users db
//TODO chnage cf ai congiruration, rss feeds
//TODO change mail template to more engaging