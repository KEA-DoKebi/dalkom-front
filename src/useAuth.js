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
        if (window.location.pathname.startsWith("/admin")) {
          navigate("/");
        }
      } else if (role) {
        if (!window.location.pathname.startsWith("/admin")) {
          navigate("/admin");
        }
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated;
}
