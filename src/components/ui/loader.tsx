import { Spinner } from "@heroui/react";

export const Loader = () => {
  return (
    <div className="h-[100vh] w-[100wv] flex justify-center items-center">
      <Spinner classNames={{ label: "text-foreground mt-4" }} variant="wave" />
    </div>
  )
}
