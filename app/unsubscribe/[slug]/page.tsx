import Background from "@/components/Background";

async function UnsubscribePage({ params }: { params: { slug: string } }) {
  const token = params.slug;

  const res = await fetch(`https://newsletter.pastpricing.com/api/mongo/${token}`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Background />
      <div className="overflow-hidden flex min-h-screen m-2 justify-center place-items-start pt-36 md:pt-56">
        <div className="mx-auto w-full max-w-xl rounded-md p-4">
          <div className="text-center">
            {data.message ? (
              <>
                <div className="font-bold text-2xl text-white/90 mb-2">
                  😢 It&apos;s sad to say goodbye
                </div>
                <div className="m-auto text-lg text-white/90">
                  You&apos;re successfully unsubscribed from our newsletter.
                  <br />
                  Btw, you are always welcome to come again 🤗
                </div>
              </>
            ) : (
              <>
                <div className="font-bold text-2xl text-white/90 mb-2">
                  Error
                </div>
                <div className="m-auto text-lg text-white/90">
                  {data.error || "Something went wrong."}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnsubscribePage;
