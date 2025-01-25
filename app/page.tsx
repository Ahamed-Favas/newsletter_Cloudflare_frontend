"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useTransition } from "react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { sample } from "./server/action";

export default function Home() {
  const [isPending, startTransition] = useTransition();  // to enable loading state
  const formSchema = z.string().email();

  const formRef =  useRef<HTMLFormElement>(null);  // to reset form
  useEffect(()=>{
    if(isPending){
      return
    }
    formRef.current?.reset();
  },[isPending])

  async function onSubmit(formData: FormData) {
    const userInput = formData.get('userInput');
    const checkInput = formSchema.safeParse(userInput);

    if (!checkInput.success) {
      toast("Please enter a valid Email");
      return;
    }
    startTransition(async() => {
      const result =await sample(checkInput.data);
      console.log(result, "check your email")
      return
    })
    return
  }

  return (
    <div>
      <div>
          <Toaster
          toastOptions={{
            unstyled: true,
            duration: 2000,
            // classNames: {
            className: "bg-white/30 font-bold text-white rounded-xl shadow-lg p-4",
            // },
          }} position="bottom-right" />
      </div>
      <div className="overflow-hidden flex min-h-screen m-2 justify-center place-items-start pt-56">
        <div className="mx-auto w-full max-w-xl rounded-md p-4">
          <div className="text-center mb-10">
            <div className="font-bold text-white text-4xl font-mono mb-6">{`Pastpricing Daily`}</div>
            <div className="text-white/60 text-xl font-medium">{`Get the top news of the day, delivered straight to your inbox every morning.`}</div>
          </div>
        <form ref={formRef} action={onSubmit} className="flex align-middle w-full relative overflow-hidden">
          <input type="text"  name="userInput" placeholder="Your email address"
          className="overflow-hidden bg-gradient-to-r from-[#4b494932] via-[#700da698] to-[#d40c0ce5] animate-gradient bg-400 text-white/70 relative w-full bg-inherit border-1 border-white rounded-full pl-8 py-4 pr-28 text-lg font-light placeholder-white/60 outline-none" />
            <Button
            disabled={isPending}
            className={`absolute top-[10%] right-[5px] rounded-full h-[80%] aspect-square text-md text-white bg-white/5 ${isPending ? '' : 'hover:bg-[#d40c0c83]'} z-20`}
            >
            Subscribe
            </Button>
        </form>
        </div>
      </div>
    </div>
  );
}

