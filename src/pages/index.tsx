import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { title, subtitle } from "@/components/ui/primitives";
import DefaultLayout from "@/components/layouts/default";
import { useDeleteUserMutation } from "@/app/services/userApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function IndexPage() {
  const dispatch = useDispatch()
  const [deleteUserMutation] = useDeleteUserMutation()

  useEffect(() => {
    deleteUserMutation(122112212)
  }, [])

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
    </DefaultLayout>
  );
}
