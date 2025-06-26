import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import { Button } from "@heroui/react";
import { useRegisterUserMutation } from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isErrorMessage } from "@/utils/is-error-message";
import { ErrorMessage } from "./ui/error-message";
import { GoogleAuth } from "./google-auth";

const registerSchema = z.object({
     email: z.string()
          .nonempty('Поле не может быть пустым!')
          .email("Невалидный email"),

     password: z.string()
          .min(6, "Пароль должен содержать минимум 6 символов")
          .max(15, "Пароль должен содержать максимум 15 символов"),

     name: z.string()
          .min(1, "Имя должно содержать минимум 1 символ")
          .max(25, "Имя должно содержать максимум 25 символов")
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset
     } = useForm<RegisterFormData>({
          resolver: zodResolver(registerSchema),
          mode: "all",
     });
     const [registration, { isLoading }] = useRegisterUserMutation()
     const [errorMessage, setErrorMessage] = useState('')
     const navigate = useNavigate()

     const onSubmit = async (body: RegisterFormData) => {
          try {
               await registration(body).unwrap();
               navigate(`/`)
               reset()
          } catch (error) {
               setErrorMessage(isErrorMessage(error))
          }
     }

     return (
          <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-[100%] flex-col justify-between gap-4">
               <div className="flex flex-col gap-3">
                    <Input<RegisterFormData>
                         label="Email"
                         type="email"
                         variant="underlined"
                         name="email"
                         register={register}
                         errors={errors}
                    />
                    <Input<RegisterFormData>
                         label="Имя"
                         type="text"
                         variant="underlined"
                         name="name"
                         register={register}
                         errors={errors}
                    />
                    <Input<RegisterFormData>
                         label="Пароль"
                         type="password"
                         variant="underlined"
                         name="password"
                         register={register}
                         errors={errors}
                    />
                    <ErrorMessage errorMessage={errorMessage} />
               </div>

               <div className="flex flex-col gap-2 justify-end">
                    <Button
                         fullWidth
                         color="primary"
                         isLoading={isLoading}
                         type="submit"
                    >
                         Зарегистрироваться
                    </Button>
                    <GoogleAuth text="Зарегистрироваться" />
               </div>
          </form>
     )
}

