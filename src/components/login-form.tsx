import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./input";
import { AuthFormWrapper } from "./ui/auth-form-wrapper";

import { useLoginMutation } from "@/app/services/auth/authApi";
import { isErrorMessage } from "@/utils/is-error-message";
import { useValidateTokens } from "@/hooks/useValidateTokens";
import { useAuth } from "@/context/auth-context";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Поле не может быть пустым!")
    .email("Невалидный email"),

  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(15, "Пароль должен содержать максимум 15 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { triggerValidateTokens } = useValidateTokens();
  const { setAuthenticated } = useAuth();

  const onSubmit = async (body: LoginFormData) => {
    try {
      await login(body).unwrap();
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
      btnTitle={"Войти"}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input<LoginFormData>
        errors={errors}
        isRequired={true}
        label="Email"
        name="email"
        placeholder="Введите ваш email"
        register={register}
        type="email"
      />
      <Input<LoginFormData>
        errors={errors}
        isRequired={true}
        label="Пароль"
        name="password"
        placeholder="Введите ваш пароль"
        register={register}
        type="password"
      />
    </AuthFormWrapper>
  );
};
