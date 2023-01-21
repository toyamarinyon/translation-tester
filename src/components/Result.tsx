import { StarIcon } from "@heroicons/react/20/solid";
import cx from "classnames";

interface Mistake {
  word: string;
  reason: string;
}
interface Props {
  score: number;
  message: string;
  example: string;
  misses: Mistake[];
}
export const Result = ({
  score,
  message,
  example,
  misses,
}: Props): JSX.Element => {
  return (
    <div className="rounded-md bg-neutral-700 text-white mb-3">
      <header className="text-neutral-300 border-b border-b-neutral-600 py-1">
        <h3 className="flex-1 px-4">Answer</h3>
      </header>
      <main className="px-4 py-4 flex items-start space-x-2 ">
        <ResultBadge score={score} />
        <div className="divide-y divide-neutral-600">
          <p className="text-md pb-2">{message}</p>
          <section className="py-2">
            <header>修正箇所:</header>
            <ul></ul>
            {misses.map(({ word, reason }, i) => (
              <li key={`miss-${i}`}>
                {word}: {reason}
              </li>
            ))}
          </section>
          <article className="py-2">
            <header>訳例:</header>
            <p className="italic">{example} </p>
          </article>
        </div>
      </main>
    </div>
  );
};

const ResultBadge = ({ score }: Pick<Props, "score">): JSX.Element => {
  return (
    <section className="flex flex-col justify-center items-center space-y-2">
      <div className="flex">
        {[1, 2, 3].map((i) => (
          <StarIcon
            key={`resultStar-${i}`}
            className={cx("w-6 text-yellow-300", {
              "text-yellow-300": score >= i,
              "text-neutral-500": score < i,
            })}
          />
        ))}
      </div>
      <span className="text-xs bg-yellow-300 text-yellow-800 px-2 rounded-full">
        {score === 3 && "Perfect!"}
        {score === 2 && "Nice!"}
        {score === 1 && "Good!"}
        {score === 0 && "Fight!"}
      </span>
    </section>
  );
};
