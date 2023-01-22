import { ArrowPathIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useForm } from "./hooks/useForm";
import { z } from "zod";
import { TextArea } from "./components/TextArea";
import { Button, GhostButton } from "./components/Button";
import { useCallback, useRef, useState } from "react";
import { RouterOutput, trpc } from "./trpc";
import { Result } from "./components/Result";
import { GitHubIcon, TwitterIcon } from "./components/Icon";

const schema = z.object({
  source: z.string(),
  translation: z.string(),
});

const examples = [
  {
    name: "React(programing)",
    text: "React is a JavaScript library for rendering user interfaces (UI)",
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
  const [result, setResult] = useState<RouterOutput["translateScoring"]>();
  const { controlProps, value, setValue, handleSubmit, submitting } = useForm(
    schema,
    async (data) => {
      setResult(await translateScoring.mutateAsync(data));
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
  const reset = useCallback(() => {
    setResult(undefined);
    setValue("source", "");
    setValue("translation", "");
  }, [setValue]);
  return (
    <>
      <article className="text-white py-8">
        <div className="container mx-auto">
          <header className="mb-2 flex">
            <div className="flex flex-col items-end">
              <h1 className="text-yellow-300 text-4xl font-serif leading-none">
                Translation tester
              </h1>
              <h2 className="leading-none mr-1">powered by OpenAI</h2>
            </div>
          </header>
          <p className="text text-neutral-200"></p>
        </div>
      </article>
      <section className="container mx-auto mb-2">
        <form
          className="w-full bg-neutral-800 rounded-md"
          onSubmit={handleSubmit}
        >
          <header className="flex text-neutral-300 border-b border-b-neutral-700 py-2">
            <h3 className="flex-1 px-4">English</h3>
            <h3 className="flex-1 px-4">Japanese</h3>
          </header>
          <div className="flex divide-x divide-neutral-700 py-2">
            <fieldset className="flex-1 px-4">
              <div className="relative">
                <TextArea
                  placeholder="Type or paste text you'll try to translate"
                  {...controlProps("source")}
                />
                <section className="text-neutral-500 flex justify-end">
                  <ul className="flex space-x-1">
                    <li>{value("source").length}</li>
                    <li>/</li>
                    <li>400</li>
                  </ul>
                </section>
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
            {result ? (
              <div className="flex-1 px-4">
                <div className="w-full bg-transparent text-neutral-300 py-2">
                  {value("translation")
                    .split(/\n+/)
                    .map((line, i) => (
                      <p key={`translation-${i}`}>{line}</p>
                    ))}
                </div>
                <Result
                  score={result.score}
                  message={result.summary}
                  example={result.example}
                  misses={result.misses}
                />
                <footer className="flex justify-end mb-2 items-center">
                  <Button
                    leftIcon={<ArrowPathIcon className="h-4" />}
                    onClick={reset}
                  >
                    Try another translation
                  </Button>
                </footer>
              </div>
            ) : (
              <div className="flex-1 px-4">
                <div className="">
                  <fieldset>
                    <TextArea
                      placeholder={
                        value("source") === "" ? "" : "Type translation text"
                      }
                      ref={translationInputRef}
                      {...controlProps("translation")}
                    />
                  </fieldset>
                  <footer className="flex justify-end mb-2 text-neutral-500 space-x-3">
                    <ul className="flex space-x-1">
                      <li>{value("translation").length}</li>
                      <li>/</li>
                      <li>400</li>
                    </ul>
                    <Button
                      type="submit"
                      leftIcon={<PlayIcon className="h-4" />}
                      loading={submitting}
                    >
                      Test my translation
                    </Button>
                  </footer>
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
      <footer className="container mx-auto text-neutral-500">
        <section className="flex items-center space-x-4">
          <div>
            made by{" "}
            <a href="https://twitter.com/toyamarinyon" target="_blank">
              @toyamarinyon
            </a>
          </div>
          <ul className="flex space-x-3">
            <li>
              <a href="https://twitter.com/toyamarinyon" target="_blank">
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/toyamarinyon/translation-tester"
                target="_blank"
              >
                <GitHubIcon />
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </>
  );
}

export default App;
