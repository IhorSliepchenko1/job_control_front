import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import { Button } from "@heroui/react";
import { useLoginMutation } from "@/app/services/auth/authApi";
import { isErrorMessage } from "@/utils/is-error-message";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ui/error-message";
import { GoogleAuth } from "./google-auth";

const loginSchema = z.object({
     email: z.string()
          .nonempty('Поле не может быть пустым!')
          .email("Невалидный email"),

     password: z.string()
          .min(6, "Пароль должен содержать минимум 6 символов")
          .max(15, "Пароль должен содержать максимум 15 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset
     } = useForm<LoginFormData>({
          resolver: zodResolver(loginSchema),
          mode: "all",
     });
     const [login, { isLoading }] = useLoginMutation()
     const [errorMessage, setErrorMessage] = useState('')
     const navigate = useNavigate()

     const onSubmit = async (body: LoginFormData) => {
          try {
               await login(body).unwrap();
               navigate(`/`)
               reset()
          } catch (error) {
               setErrorMessage(isErrorMessage(error))
          }
     }

     return (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4">
               <div className="flex flex-col gap-3">
                    <Input<LoginFormData>
                         label="Email"
                         type="email"
                         variant="underlined"
                         name="email"
                         register={register}
                         errors={errors}
                    />
                    <Input<LoginFormData>
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
                         Войти
                    </Button>
                    <GoogleAuth text="Войти" />
               </div>
          </form>
     )
}
