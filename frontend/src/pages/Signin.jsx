import { useState } from "react";
import { signin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import valencyLogo from "../assets/valency-logo.svg";
import "../styles/signin.css";

function GoogleIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.5 6 29.5 4 24 4c-7.4 0-13.8 4.1-17.1 10.1z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-1.9 14.1-5.1l-6.5-5.5C29.5 35.4 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.4l-6.5 5C9.9 39.7 16.4 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.9l6.5 5.5C40.9 36.9 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  

  async function login(e) {
    e.preventDefault();

    try {
      const data = await signin({
        email,
        password,
      });

      console.log("Response:", data);

      if (data.token) {
        localStorage.setItem("chemIQ_token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.user.fullName,
            email: data.user.email,
            role: "Student",
          })
        );

        navigate("/home");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-glow signin-glow-left" />
      <div className="signin-glow signin-glow-right" />

      <div className="signin-panel">
        <form onSubmit={login}>
          <img className="signin-logo" src={valencyLogo} alt="Valency" />

          <h1>
            Begin your <span>chemistry</span> journey
          </h1>
          <p className="signin-tagline">Learn. Bond. Master.</p>

          <div className="input-group">
            <Mail size={22} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={22} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
            </button>
          </div>

          <button type="submit" className="signin-btn">
            Sign in
          </button>

          <div className="signin-divider">
            <span>or</span>
          </div>

         <button
          type="button"
            className="google-btn"
          onClick={() => {
          window.location.href = "http://localhost:4000/api/v1/auth/oauth/google";
          }}
          >
        <GoogleIcon />
          Continue with Google
        </button>

          <p className="signin-footer">
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/create-account")}>
              Create new account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
