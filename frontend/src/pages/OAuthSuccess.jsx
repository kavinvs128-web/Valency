import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("chemIQ_token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name || "",
          email: email || "",
          role: "Student",
        })
      );

      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true }); // back to signin if something went wrong
    }
  }, [params, navigate]);

  return (
    <div className="signin-page">
      <p style={{ color: "white", textAlign: "center", marginTop: "40vh" }}>
        Signing you in...
      </p>
    </div>
  );
}

export default OAuthSuccess;