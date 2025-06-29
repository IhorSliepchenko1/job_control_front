import { title } from "@/components/ui/primitives";

export default function DocsPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "violet" })}>About</h1>
      </div>
    </section>
  );
}
