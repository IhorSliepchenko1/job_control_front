import { FormEvent } from "react";
import { ErrorMessage } from "./error-message";
import { Button } from "@heroui/button";

type Props = {
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  errorMessage: string;
  isLoading: boolean;
  btnTitle: string;
};

export const AuthFormWrapper: React.FC<Props> = ({
  children,
  onSubmit,
  errorMessage,
  isLoading,
  btnTitle,
}) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">{children}</div>

      <ErrorMessage errorMessage={errorMessage} />
      <Button fullWidth color="primary" isLoading={isLoading} type="submit">
        {btnTitle}
      </Button>
    </form>
  );
};
