import { PlayIcon } from "@heroicons/react/20/solid";
import { useForm } from "./hooks/useForm";
import { z } from "zod";
import { TextArea } from "./components/TextArea";
import { GhostButton } from "./components/Button";
import { useCallback, useRef } from "react";
import { trpc } from "./trpc";

const schema = z.object({
  source: z.string(),
  translation: z.string(),
});

const examples = [
  {
    name: "React(programing)",
    text: "React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components. From web sites to phone apps, everything on the screen can be broken down into components.",
  },
  {
    name: "DEATH STRANDING(Game)",
    text: "Death Stranding on PC is the best version of a true masterpiece. The pace of the game is relaxed and the open world is immutable, so conquering it requires great effort and patience. This makes it boring for some players. But, for others, it will be tremendously rewarding because our steps, however small, have an impact on the game's world.",
  },
  {
    name: "Badモード(Music)",
    text: "Badモード, the album by Hikaru Utada, showcases many emotions far beyond mainstream pop's typical joy/melancholy dichotomy. They touch on self-discovery, sexual desire, and – as the album’s title suggests – downright moodiness and depression, giving their whole body, mind, and voice to each different tone.",
  },
];

function App() {
  const translateScoring = trpc.translateScoring.useMutation();
  const { controlProps, value, setValue, handleSubmit, submitting } = useForm(
    schema,
    async (data) => {
      await translateScoring.mutateAsync(data);
    }
  );
  const translationInputRef = useRef<HTMLTextAreaElement>(null);
  const setExample = useCallback(
    (example: string) => () => {
      setValue("source", example);
      translationInputRef.current?.focus();
    },
    [setValue]
  );
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
        <form
          className="w-full bg-neutral-800 rounded-md"
          onSubmit={handleSubmit}
        >
          <header className="flex text-neutral-300 border-b border-b-neutral-700 py-2">
            <h3 className="flex-1 px-4">English</h3>
            <h3 className="flex-1 px-4">Japanese</h3>
          </header>
          <div className="flex divide-x divide-neutral-700 mt-2">
            <fieldset className="flex-1 px-4">
              <div className="relative">
                <TextArea
                  placeholder="Type or paste text you'll try to translate"
                  {...controlProps("source")}
                />
                {value("source") === "" && (
                  <div className="absolute top-12 w-full text-neutral-300">
                    <header className="mb-2">
                      Or try with example sentences:
                    </header>
                    <div className="flex flex-wrap">
                      {examples.map(({ name, text }) => (
                        <div className="p-1" key={name}>
                          <GhostButton onClick={setExample(text)}>
                            {name}
                          </GhostButton>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </fieldset>
            <fieldset className="flex-1 px-4">
              <TextArea
                placeholder={
                  value("source") === "" ? "" : "Type translation text"
                }
                ref={translationInputRef}
                {...controlProps("translation")}
              />
            </fieldset>
          </div>
          <footer className="flex justify-end pr-2 pb-2">
            <button
              className="px-2 py-1 text-sm flex items-center rounded space-x-1 text-white bg-green-600 disabled:bg-transparent disabled:text-neutral-700"
              disabled={submitting}
            >
              <PlayIcon className="h-4" />
              <span>Test my translation</span>
            </button>
          </footer>
        </form>
      </section>
    </>
  );
}

export default App;
