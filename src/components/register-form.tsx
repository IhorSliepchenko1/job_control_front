import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Input from "./input";
import { AuthFormWrapper } from "./ui/auth-form-wrapper";

import { useRegisterUserMutation } from "@/app/services/auth/authApi";
import { isErrorMessage } from "@/utils/is-error-message";
import { useValidateTokens } from "@/hooks/useValidateTokens";
import { useAuth } from "@/context/auth-context";

const registerSchema = z.object({
  email: z
    .string()
    .nonempty("Поле не может быть пустым!")
    .email("Невалидный email"),

  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(15, "Пароль должен содержать максимум 15 символов"),

  name: z
    .string()
    .min(1, "Имя должно содержать минимум 1 символ")
    .max(25, "Имя должно содержать максимум 25 символов"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const [registration, { isLoading }] = useRegisterUserMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { triggerValidateTokens } = useValidateTokens();
  const { setAuthenticated } = useAuth();

  const onSubmit = async (body: RegisterFormData) => {
    try {
      await registration(body).unwrap();
      const isAuthenticated = await triggerValidateTokens();

      setAuthenticated(isAuthenticated);
      navigate(`/`);
      reset();
    } catch (error) {
      setErrorMessage(isErrorMessage(error));
    }
  };

  return (
    <AuthFormWrapper
      btnTitle={"Зарегистироваться"}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input<RegisterFormData>
        errors={errors}
        isRequired={true}
        label="Email"
        name="email"
        placeholder="Введите email"
        register={register}
        type="email"
      />
      <Input<RegisterFormData>
        errors={errors}
        isRequired={true}
        label="Имя"
        name="name"
        placeholder="Введите ваше имя"
        register={register}
        type="text"
      />
      <Input<RegisterFormData>
        errors={errors}
        isRequired={true}
        label="Пароль"
        name="password"
        placeholder="Придумайте пароль"
        register={register}
        type="password"
      />
    </AuthFormWrapper>
  );
};
