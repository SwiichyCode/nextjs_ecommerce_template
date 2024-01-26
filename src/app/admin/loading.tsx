import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-scroll bg-primary pb-9">
      <Spinner />
    </div>
  );
}
