import { StarIcon } from "@heroicons/react/20/solid";

export const Result = (): JSX.Element => {
  return (
    <div className="rounded-md bg-neutral-700 text-white mb-3">
      <header className="text-neutral-300 border-b border-b-neutral-600 py-1">
        <h3 className="flex-1 px-4">Answer</h3>
      </header>
      <main className="px-4 py-4 flex items-start space-x-2 ">
        <section className="flex flex-col justify-center items-center space-y-2">
          <div className="flex">
            <StarIcon className="w-6 text-yellow-300" />
            <StarIcon className="w-6 text-yellow-300" />
            <StarIcon className="w-6 text-neutral-500" />
          </div>
          <span className="text-xs bg-yellow-300 text-yellow-800 px-2 rounded-full">
            Congrats!
          </span>
        </section>
        <p className="text-md">
          訳文は、ほとんど正しいと思われます。`One thing I've observed
          is`の訳文には、`observe`（観察する）が`observe`（オブザーブする）という間違いがありますが、それ以外は、ほぼ正しいと思われます。
        </p>
      </main>
    </div>
  );
};
