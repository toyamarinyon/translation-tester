import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (props: Props, ref): JSX.Element => {
    return (
      <textarea
        className="w-full bg-transparent outline-none caret-neutral-300 text-neutral-300 resize-none py-2"
        rows={6}
        ref={ref}
        {...props}
      ></textarea>
    );
  }
);
