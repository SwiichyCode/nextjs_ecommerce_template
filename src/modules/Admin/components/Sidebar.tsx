import { AdminLogo } from "./AdminLogo";
import { Navigation } from "./Navigation";

export const Sidebar = () => {
  return (
    <aside className="min-w-20 border-r border-primary">
      <AdminLogo />
      <Navigation />
    </aside>
  );
};
