import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function Auth() {
     const [selected, setSelected] = useState<'login' | 'sign-up'>("login");
     const selectionChange = () => setSelected(prev => prev === 'login' ? 'sign-up' : 'login')

     return (
          <div>
               <div className="flex justify-end p-2">
                    <ThemeSwitch />
               </div>

               <div className="flex justify-center p-5 mt-[50px]">
                    <Card className="max-w-full w-[80vw]">
                         <CardBody className="overflow-hidden">
                              <Tabs
                                   fullWidth
                                   aria-label="Tabs form"
                                   selectedKey={selected}
                                   size="md"
                                   onSelectionChange={() => selectionChange()}
                              >
                                   <Tab key="login" title="Login">
                                        <LoginForm />
                                   </Tab>
                                   <Tab key="sign-up" title="Sign up">
                                        <RegisterForm />
                                   </Tab>
                              </Tabs>
                         </CardBody>
                    </Card>
               </div>
          </div>
     )
}
