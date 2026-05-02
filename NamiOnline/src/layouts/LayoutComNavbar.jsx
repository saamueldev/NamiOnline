import { Outlet } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao";

function LayoutComNavbar() {
  return (
    <>
      <BarraNavegacao />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutComNavbar;