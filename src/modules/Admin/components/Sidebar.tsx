import { AdminLogo } from "./AdminLogo";
import { Navigation } from "./Navigation";

export const Sidebar = () => {
  return (
    <aside className="border-primary min-w-20 border-r">
      <AdminLogo />
      <Navigation />
    </aside>
  );
};
