import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/notFound/NotFound";
import { routes } from "./routes";

export default function RouteFile() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
