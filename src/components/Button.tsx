import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const GhostButton = ({ ...props }: Props): JSX.Element => {
  return (
    <button
      type="button"
      className="px-3 py-1 text-sm flex items-center rounded-full space-x-1 text-neutral-400 bg-transparent border border-neutral-500"
      {...props}
    />
  );
};
