"use client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { SignIN } from "@/auth/signInAction";
import ReactLoading from 'react-loading';

export default function Home() {
  const [inputVisibility, setInputVisibility] = useState(true)
  const [isPending, startTransition] = useTransition();  // to enable loading state
  const formSchema = z.string().email();

  async function onSubmit(formData: FormData) {
    const userInput = formData.get('userInput');
    const checkInput = formSchema.safeParse(userInput);

    if (checkInput.success) {
      startTransition(async() => {
        const response = await SignIN(checkInput.data);
        if ( response?.status == "success" ) {
          setInputVisibility(false)
          return
        }
        toast("Something went wrong, please try again.")
        return
      })
    }
    else if (checkInput.error){
      toast("Please enter a valid Email");
      return;
    }
  }

  return (
    <div>
      <div>
          <Toaster
          toastOptions={{
            unstyled: true,
            duration: 2000,
            className: "bg-white/30 font-bold text-white rounded-xl shadow-lg p-4",
          }} position="bottom-right" />
      </div>
      <div className="overflow-hidden flex min-h-screen m-2 justify-center place-items-start pt-56">
        <div className="mx-auto w-full max-w-xl rounded-md p-4">
          <div className="text-center mb-10">
            <div className="font-bold text-white text-4xl font-mono mb-6">{`Pastpricing Daily`}</div>
            <div className="text-white/60 text-xl font-medium">{`Get the top news of the day, delivered straight to your inbox every morning.`}</div>
          </div>
        <form action={onSubmit} className="flex align-middle w-full relative overflow-hidden">
        {inputVisibility ? (
            <>
              <input type="text" autoComplete="off" name="userInput" placeholder="Your email address"
                className="overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#700da698] to-[#0f0c29] animate-gradient bg-400 text-white/70 relative w-full bg-inherit border-1 border-white rounded-full pl-8 py-4 pr-28 text-lg font-light placeholder-white/60 outline-none" />
              <Button
                  disabled={isPending}
                  className={`absolute top-[10%] right-[5px] rounded-full h-[80%] aspect-square text-md text-white bg-white/5 ${isPending ? 'bg-white/0' : 'hover:bg-[#d40c0c83]'}`}
                >
                  {isPending ? <div><ReactLoading type={"spokes"} color={"#fff"} height={'4xl'} width={'4xl'} /></div> : 'Subscribe'}
              </Button>
            </> ): (
            <>
              <div className="text-white m-auto text-center border p-8 rounded-2xl">
                <div className="font-bold text-2xl mb-2 text-white/90">Thanks for subscribing!  🎉</div>
                <div className="m-uto text-lg text-white/90">
                  We&apos;ve <span className="font-semibold text-white bg-gradient-to-r from-[#4b494932] via-[#700da698] to-[#d40c0ce5] animate-gradient bg-400">  sent you an email</span> to confirm your address.
                  <br />
                  If you don&apos;t receive it, please also check your spam folder.
                </div>
              </div>
            </> )
            }
        </form>
        </div>
      </div>
    </div>
  );
}

