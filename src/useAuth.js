import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role"); // 역할 정보도 저장되어 있다고 가정
    const mileage = localStorage.getItem("mileage");

    if (token) {
      setIsAuthenticated(true);

      if (mileage) {
        // navigate("/");
        if (window.location.pathname.startsWith("/admin")) {
          navigate("/");
        }
      } else if (Number(role) === "1") {
        navigate("/admin/list");
        if (!window.location.pathname.startsWith('/admin')) {
            navigate("/admin/list");
          }
      } else if (Number(role) === "2") {
        navigate("/admin/user/list");
        if (!window.location.pathname.startsWith("/admin")) {
          navigate("/admin/user/list");
        } else if (window.location.pathname.startsWith("/admin/list")) {
          navigate("/admin/user/list");
        }
        if (!window.location.pathname.startsWith("/admin/register")) {
          navigate("/admin/user/list");
        }
      }
    } else {
      setIsAuthenticated(false);
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/signUp")
      ) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return isAuthenticated;
}
