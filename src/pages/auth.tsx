import RegisterForm from "@/components/register-form";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function Auth() {
     const [selected, setSelected] = useState<'login' | 'sign-up'>("login");
     const selectionChange = () => setSelected(prev => prev === 'login' ? 'sign-up' : 'login')

     return (
          <div>
               <div className="flex justify-end p-2">
                    <ThemeSwitch />
               </div>

               <div className="flex h-[90vh] items-center justify-center">
                    <Card className="max-w-full w-[340px] h-[400px]">
                         <CardBody className="overflow-hidden">
                              <Tabs
                                   fullWidth
                                   aria-label="Tabs form"
                                   selectedKey={selected}
                                   size="md"
                                   onSelectionChange={() => selectionChange()}
                              >
                                   <Tab key="login" title="Login">
                                        <form className="flex flex-col gap-4">
                                             <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                                             <Input
                                                  isRequired
                                                  label="Password"
                                                  placeholder="Enter your password"
                                                  type="password"
                                             />
                                             <p className="text-center text-small">
                                                  Need to create an account?{" "}
                                                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                                                       Sign up
                                                  </Link>
                                             </p>
                                             <div className="flex gap-2 justify-end">
                                                  <Button fullWidth color="primary">
                                                       Login
                                                  </Button>
                                             </div>
                                        </form>
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
