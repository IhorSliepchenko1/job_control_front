import { Input as InputUi } from "@heroui/input";
import { useState } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import EndContentPasswordInput from "./ui/end-content-password-input";


type Props<T extends Record<string, any>> = {
     label: string
     type: "email" | "text" | "password"
     variant: "flat" | "faded" | "bordered" | "underlined" | undefined
     name: Path<T>
     register: UseFormRegister<T>
     errors: FieldErrors<T>
};

export default function Input<T extends Record<string, any>>({
     label,
     type,
     variant,
     name,
     register,
     errors,
}: Props<T>) {
     const [isVisible, setIsVisible] = useState(false);
     return (
          <InputUi
               label={label}
               type={type === 'password' ? isVisible ? 'text' : 'password' : type}
               variant={variant}
               {...register(name)}
               errorMessage={errors[name]?.message?.toString()}
               isInvalid={Boolean(errors[name])}
               endContent={type === 'password' &&
                    <EndContentPasswordInput
                         isVisible={isVisible}
                         setIsVisible={setIsVisible}
                    />}
          />
     );
}