import { Header } from "@/modules/Admin/components/layouts/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/common/ButtonHistoryBack";

export default function ImagesOptimizationPage() {
  return (
    <div className="container">
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Optimisation d&apos;image</h1>
        </div>
      </Header>
    </div>
  );
}
