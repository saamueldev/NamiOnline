import { Outlet } from "react-router-dom";
import BarraNavegacaoAdmin from "../components/BarraNavegacaoAdmin";

function LayoutComNavbarAdmin() {
  return (
    <>
      <BarraNavegacaoAdmin />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutComNavbarAdmin;
