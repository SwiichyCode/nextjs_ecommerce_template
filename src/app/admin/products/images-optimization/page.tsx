import { Header } from "@/modules/Admin/components/Header";
import { ButtonHistoryBack } from "@/modules/Admin/components/ButtonHistoryBack";

export default function ImagesOptimizationPage() {
  return (
    <div className="container">
      <Header>
        <div className="flex items-center gap-4">
          <ButtonHistoryBack withArrow />
          <h1 className="text-3xl font-bold">Optimisation d'image</h1>
        </div>
      </Header>
    </div>
  );
}
