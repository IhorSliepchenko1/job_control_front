import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import { useLoginMutation } from "@/app/services/auth/authApi";
import { isErrorMessage } from "@/utils/is-error-message";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFormWrapper } from "./ui/auth-form-wrapper";

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

  const onSubmit = async (body: LoginFormData) => {
    try {
      await login(body).unwrap();
      navigate(`/`);
      reset();
    } catch (error) {
      setErrorMessage(isErrorMessage(error));
    }
  };

  return (
    <AuthFormWrapper
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={errorMessage}
      isLoading={isLoading}
      btnTitle={"Войти"}
    >
      <Input<LoginFormData>
        label="Email"
        type="email"
        isRequired={true}
        name="email"
        register={register}
        errors={errors}
        placeholder="Введите ваш email"
      />
      <Input<LoginFormData>
        label="Пароль"
        type="password"
        isRequired={true}
        name="password"
        register={register}
        errors={errors}
        placeholder="Введите ваш пароль"
      />
    </AuthFormWrapper>
  );
};
