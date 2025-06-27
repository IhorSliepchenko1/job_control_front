import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input";
import {
  useLazyValidateAccessTokenQuery,
  useLazyValidateRefreshTokenQuery,
  useRegisterUserMutation,
} from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isErrorMessage } from "@/utils/is-error-message";
import { AuthFormWrapper } from "./ui/auth-form-wrapper";

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
  const [triggerAccess] = useLazyValidateAccessTokenQuery();
  const [triggerRefresh] = useLazyValidateRefreshTokenQuery();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (body: RegisterFormData) => {
    try {
      await registration(body).unwrap();
      await triggerAccess().unwrap();
      await triggerRefresh().unwrap();
      
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
      btnTitle={"Зарегистироваться"}
    >
      <Input<RegisterFormData>
        label="Email"
        type="email"
        isRequired={true}
        name="email"
        register={register}
        errors={errors}
        placeholder="Введите email"
      />
      <Input<RegisterFormData>
        label="Имя"
        type="text"
        isRequired={true}
        placeholder="Введите ваше имя"
        name="name"
        register={register}
        errors={errors}
      />
      <Input<RegisterFormData>
        label="Пароль"
        type="password"
        isRequired={true}
        placeholder="Придумайте пароль"
        name="password"
        register={register}
        errors={errors}
      />
    </AuthFormWrapper>
  );
};
