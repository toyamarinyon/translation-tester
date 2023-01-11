import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

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
        <form className="flex w-full">
          <fieldset className="flex-1">
            <textarea className="w-full"></textarea>
          </fieldset>
          <fieldset className="flex-1">
            <textarea className="w-full"></textarea>
          </fieldset>
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
