import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function Auth() {
     const [selected, setSelected] = useState<'login' | 'sign-up'>("login");
     const selectionChange = () => setSelected(prev => prev === 'login' ? 'sign-up' : 'login')

     return (
          <div className="h-[100vh] flex justify-center items-center">
               <div>
                    <Card className="max-w-full w-[70vw]">
                         <CardBody className="overflow-hidden">
                              <Tabs
                                   fullWidth
                                   aria-label="Tabs form"
                                   selectedKey={selected}
                                   size="md"
                                   onSelectionChange={() => selectionChange()}
                              >
                                   <Tab key="login" title="Вход">
                                        <LoginForm />
                                   </Tab>
                                   <Tab key="sign-up" title="Регистрация">
                                        <RegisterForm />
                                   </Tab>
                              </Tabs>
                         </CardBody>
                    </Card>
               </div>
          </div>
     )
}
