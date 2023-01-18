import { ChangeEventHandler, useCallback, useState, useReducer } from "react";
import { z, AnyZodObject } from "zod";

enum FormActionKind {
  Change = "CHANGE",
  Blur = "BLUR",
}
interface FormChangeEventPayload {
  name: string;
  value: string;
}
interface FormAction {
  type: FormActionKind;
  payload: FormChangeEventPayload;
}

function createReducer<Z extends AnyZodObject>(scheme: Z) {
  return function reducer(state: z.infer<typeof scheme>, action: FormAction) {
    if (action.type === FormActionKind.Change) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    return {
      ...state,
    };
  };
}
export const useForm = <Z extends AnyZodObject>(
  scheme: Z,
  submitHandler: (data: z.infer<Z>) => void | Promise<void>
) => {
  type Scheme = z.infer<typeof scheme>;
  const [submitting, setSubmitting] = useState(false);
  const [state, dispatch] = useReducer(createReducer(scheme), {});
  const [errors, setErrors] = useState<z.ZodError>();
  const handler = useCallback((key: keyof Scheme) => {
    const onChange: ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      dispatch({
        type: FormActionKind.Change,
        payload: { name: String(key), value: e.target.value },
      });
    };

    return { onChange };
  }, []);

  const value = useCallback(
    (key: keyof Scheme) => {
      return String(state[key] ?? "");
    },
    [state]
  );

  const controlProps = useCallback(
    (key: keyof Scheme) => {
      return {
        name: key,
        value: value(key),
        ...handler(key),
      };
    },
    [value, handler]
  );

  const setValue = useCallback(
    <Key extends keyof Scheme>(key: Key, value: Scheme[Key]) => {
      dispatch({
        type: FormActionKind.Change,
        payload: { name: String(key), value },
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = scheme.safeParse(state);
      if (result.success) {
        setSubmitting(true);
        try {
          await submitHandler(result.data);
        } catch {
          setSubmitting(false);
        }
        setSubmitting(false);
      } else {
        setErrors(result.error);
      }
    },
    [scheme, state, submitHandler]
  );

  return { controlProps, value, setValue, handleSubmit, errors, submitting };
};
