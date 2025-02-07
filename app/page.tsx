"use client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { SignIN } from "@/auth/signInAction";
import ReactLoading from 'react-loading';
import Background from "@/components/Background";
import { ToggleItem } from "@/components/toggleOptions";
import { newsOptions, prefOptions } from "@/sources/sources";


export default function Home() {
  const [inputVisibility, setInputVisibility] = useState(true);
  const [selectedPrefers, setSelectedPrefers] = useState(
    Object.fromEntries(prefOptions.map(option => [option, false]))
  );
  const [selectedSource, setSelectedSource] = useState(
    Object.fromEntries(newsOptions.map((option) => [option, newsOptions.length === 1]))  // as of now, because of only one source
  );
  const [isPending, startTransition] = useTransition();
  const formSchema = z.string().email();


  async function onSubmit(formData: FormData) {

    const prefsCount = Object.values(selectedPrefers).filter(Boolean).length
    const soureCount = Object.values(selectedSource).filter(Boolean).length
    if (!prefsCount) {
      toast("Pick atleast one category")
      return
    }
    if(!soureCount) {
      toast("Pick atleast one source")
    }
    const userMail = formData.get('userEmail');
    const checkEmail = formSchema.safeParse(userMail);

    if (checkEmail.success) {
      startTransition(async () => {
        try {
          const response = await SignIN(checkEmail.data, selectedPrefers, selectedSource);
          if (response?.status === "success") {
            setInputVisibility(false);
            return;
          }
          toast("Something went wrong, please try again.");
        } catch {
          toast("Something went wrong, please try again.");
        }
      });
    } else {
      toast("Please enter a valid Email");
    }
  }

  return (
    <div className="relative">
      <Background />
      <div className="relative z-10">
        <Toaster
          toastOptions={{
            unstyled: true,
            duration: 2000,
            className: "bg-white/30 font-bold text-white rounded-xl shadow-lg p-4",
          }}
          position="bottom-right"
        />
      </div>
      <div className="overflow-hidden flex min-h-screen m-2 justify-center place-items-start pt-12 md:pt-32">
        <div className="mx-auto w-full max-w-xl rounded-md p-2">
          <div className="text-center mb-2 md:mb-4">
            <div className="font-bold text-white md:text-4xl text-2xl font-mono mb-2 md:mb-2">Pastpricing Daily</div>
            <div className="text-white/60 md:text-xl text-lg font-medium">
              Get the top news of the day, delivered straight to your inbox every morning.
            </div>
          </div>
          <form action={onSubmit} className="flex-col align-middle w-full overflow-hidden space-y-2 md:space-y-6">
            {inputVisibility ? (
              <>
                <div className="p-2 space-y-4">
                  <>
                    <p className="text-center text-white/70 font-thin text-normal md:text-lg">Select your news source</p>
                    <div className="flex items-center justify-center">
                      <ToggleItem toggleList={newsOptions} selectedList={selectedSource} setFunction={setSelectedSource} maxLen={1} />  {/* only one source as of now */}
                    </div>
                  </>
                  <>
                    <p className="text-center text-white/70 font-thin text-normal md:text-lg">Pick the type of news you’re most interested in—choose up to 9</p>
                    <div className="grid grid-cols-3 gap-4">
                      <ToggleItem toggleList={prefOptions} selectedList={selectedPrefers} setFunction={setSelectedPrefers} maxLen={9} />
                    </div>
                  </>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    name="userEmail"
                    placeholder="Your email address"
                    className="overflow-hidden bg-gradient-to-r from-black/50 via-gray-600 to-black/50 animate-gradient bg-400 text-white/70 w-full bg-inherit border border-white/20 rounded-full pl-8 py-4 pr-28 text-lg font-light placeholder-white/60 outline-none focus:border-white/40"
                  />
                  <Button
                    disabled={isPending}
                    className={`absolute top-[10%] right-[5px] rounded-full h-[80%] aspect-square text-md text-white
                      ${isPending ? 'bg-white/0' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isPending ? (
                      <ReactLoading type="spokes" height={24} width={24} className="absolute top-[33%] right-[8px] bg-inherit"/>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-white m-auto text-center border border-white/20 p-8 mt-10 rounded-2xl">
                <div className="font-bold text-2xl mb-2 text-white/90">Thanks for subscribing! 🎉</div>
                <div className="m-auto text-lg text-white/90">
                  We&apos;ve{" "}
                  <span className="font-semibold text-white bg-gradient-to-r from-[#4b494932] via-[#700da698] to-[#d40c0ce5] animate-gradient bg-400">
                    sent you an email
                  </span>{" "}
                  to confirm your address.
                  <br />
                  If you don&apos;t receive it, please also check your spam folder.
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}