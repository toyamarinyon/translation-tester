import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

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

type ButtonProps = Props & {
  loading?: boolean;
  leftIcon?: ReactNode;
};
export const Button = ({
  loading,
  leftIcon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className="px-2 py-1 text-sm flex items-center rounded space-x-1 text-white bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && leftIcon && leftIcon}
      <div>{children}</div>
    </button>
  );
};
