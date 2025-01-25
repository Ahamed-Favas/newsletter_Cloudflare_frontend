import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen m-auto justify-center place-items-start pt-56">
      <div className="mx-auto w-full max-w-xl rounded-md p-4">
        <div className="text-center mb-10">
          <div className="font-bold text-white text-4xl font-mono mb-6">{`Pastpricing Daily`}</div>
          <div className="text-white/60 text-xl font-medium">{`Get the top news of the day, delivered straight to your inbox every morning.`}</div>
        </div>
      <div className="flex align-middle w-full relative overflow-hidden">
        <input type="text" placeholder="Your email address"
        className="overflow-hidden bg-gradient-to-r from-[#4b494932] via-[#700da698] to-[#d40c0ce5] animate-gradient bg-400 text-white/70 relative w-full bg-inherit border-1 border-white rounded-full pl-8 py-4 pr-28 text-lg font-light placeholder-white/60 outline-none" />
        <Button
        className="absolute top-[10%] right-[5px] rounded-full h-[80%] aspect-square text-md text-white bg-white/5 hover:bg-[#d40c0c83] z-20"
        >
        Subscribe
        </Button>
      </div>
      </div>
    </div>
  );
}

