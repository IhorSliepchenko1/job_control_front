import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { title, subtitle } from "@/components/ui/primitives";
import DefaultLayout from "@/components/layouts/default";

export default function IndexPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google/redirect';
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>
        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>


      {/* <form className="grid gap-2 bg-white p-5" onSubmit={onRegisterUser}> */}
      {/* <input type="text" onChange={eData} name="name" placeholder="name" className="p-1" />
        <input type="password" onChange={eData} name="password" placeholder="password" className="p-1" />
        <input type="email" onChange={eData} name="email" placeholder="email" className="p-1" /> */}
      <button onClick={handleGoogleLogin} className="bg-black">Отправить</button>
      {/* </form> */}
    </DefaultLayout>
  );
}
