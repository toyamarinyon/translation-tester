import { useState } from "react";
import { BoltIcon, PlayIcon } from "@heroicons/react/20/solid";

function App() {
  const [sentence, setSentence] = useState("");

  return (
    <>
      <article className="text-white py-12">
        <div className="container mx-auto">
          <header className="mb-12 flex">
            <div className="flex flex-col items-end">
              <h1 className="text-yellow-300 text-4xl font-serif leading-none">
                Translation tester
              </h1>
              <h2 className="leading-none mr-1">powered by GPT-3</h2>
            </div>
          </header>
          <p className="text text-neutral-200"></p>
        </div>
      </article>
      <section className="container mx-auto">
        <form className="w-full bg-neutral-800 rounded-md">
          <header className="flex text-neutral-300 border-b border-b-neutral-700 py-2">
            <h3 className="flex-1 px-4">English</h3>
            <h3 className="flex-1 px-4">Japanese</h3>
          </header>
          <div className="flex divide-x divide-neutral-700 mt-2">
            <fieldset className="flex-1 px-4">
              <div className="relative">
                <textarea
                  className="w-full bg-transparent outline-none caret-neutral-300 text-neutral-300 resize-none py-2"
                  rows={6}
                  placeholder="Type or paste text you'll try to translate"
                ></textarea>
                <div className="absolute top-12 w-full text-neutral-300">
                  <header className="mb-2">
                    Or try with example sentences:
                  </header>
                  <div className="flex flex-wrap">
                    <div className="p-1">
                      <button className="px-3 py-1 text-sm flex items-center rounded-full space-x-1 text-neutral-400 bg-transparent border border-neutral-500">
                        <span>React(JavaScript Library)</span>
                      </button>
                    </div>
                    <div className="p-1">
                      <button className="px-3 py-1 text-sm flex items-center rounded-full space-x-1 text-neutral-400 bg-transparent border border-neutral-500">
                        <span>New Jeans(K-POP)</span>
                      </button>
                    </div>
                    <div className="p-1">
                      <button className="px-3 py-1 text-sm flex items-center rounded-full space-x-1 text-neutral-400 bg-transparent border border-neutral-500">
                        <span>DEATH STRANDING(Game)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="flex-1 px-4">
              <textarea
                className="w-full bg-transparent outline-none caret-neutral-300 text-neutral-300 resize-none py-2"
                rows={6}
              ></textarea>
            </fieldset>
          </div>
          <footer className="flex justify-end pr-2 pb-2">
            <button className="px-2 py-1 text-sm flex items-center rounded space-x-1 text-white bg-green-600 disabled:bg-transparent disabled:text-neutral-700 ">
              <PlayIcon className="h-4" />
              <span>Test my translation</span>
            </button>
          </footer>
        </form>
      </section>
      {/* <div className="py-12 text-neutral-300">
        <div className="container mx-auto">
          <textarea
            className="bg-transparent focus:outline-none w-full"
            rows={5}
            value={sentence}
            placeholder="読むのに苦労したり読めなかった英文を入力してください"
            onChange={(e) => setSentence(e.target.value)}
          ></textarea>
          <button className="px-4 py-2 flex rounded-full">
            <span>送信</span>
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div> */}
    </>
  );
}

export default App;
