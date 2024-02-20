import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role"); // 역할 정보도 저장되어 있다고 가정
    const mileage = localStorage.getItem("mileage");
    const path = window.location.pathname;

    if (token) {
      setIsAuthenticated(true);

      if (mileage) {
        if (path.startsWith("/admin")) {
          navigate("/");
        }
      } else if (role) {
        if (!path.startsWith("/admin")) {
          navigate("/admin");
        }
      }
    } else {
      setIsAuthenticated(false);
      if(!path.startsWith("/signUp")){
        navigate("/login");
      }
    }
  }, [navigate]);

  return isAuthenticated;
}
