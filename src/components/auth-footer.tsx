import { Link } from "@heroui/link";

type Props = {
  setSelected: (value: React.SetStateAction<"login" | "sign-up">) => void;
  selected: "login" | "sign-up";
};

export const AuthFooter: React.FC<Props> = ({ setSelected, selected }) => {
  return (
    <p className="text-center text-small">
      {selected === "login" ? "Нет аккаунта" : "Уже зарегистрированы"}?
      <Link
        size="sm"
        onPress={() =>
          setSelected((prev) => (prev === "login" ? "sign-up" : "login"))
        }
      >
        {selected === "login" ? " Зарегистрироваться" : "Войти"}
      </Link>
    </p>
  );
};
