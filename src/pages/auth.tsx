import { Tabs, Tab, Card, CardBody, CardFooter } from "@heroui/react";
import { useState } from "react";

import { AuthFooter } from "@/components/auth-footer";
import { GoogleAuth } from "@/components/google-auth";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

export default function Auth() {
  const [selected, setSelected] = useState<"login" | "sign-up">("login");
  const selectionChange = () =>
    setSelected((prev) => (prev === "login" ? "sign-up" : "login"));

  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-xl font-semibold text-center mb-2">
          {selected === "login" ? "Вход в аккаунт" : "Регистрация"}
        </h2>
        <Card className="max-w-full min-w-[340px] min-h-[400px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              selectedKey={selected}
              size="md"
              onSelectionChange={selectionChange}
            >
              <Tab key="login" title="Вход">
                <LoginForm />
              </Tab>
              <Tab key="sign-up" title="Регистрация">
                <RegisterForm />
              </Tab>
            </Tabs>

            <GoogleAuth />
          </CardBody>

          <CardFooter className="flex justify-center ">
            <AuthFooter selected={selected} setSelected={setSelected} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
