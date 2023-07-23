import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactElement }) {
  const accessToken = localStorage.getItem("Authorization");
  if (accessToken && accessToken.length > 0) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
