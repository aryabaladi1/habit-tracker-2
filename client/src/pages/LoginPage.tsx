import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService"
import { useAuth } from "../context/AuthContext"
import LoginView from "../components/login/LoginView"

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ username, password });
      login(res.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginView
    username={username}
    password={password}
    error={error}
    loading={loading}
    setUsername={setUsername}
    setPassword={setPassword}
    handleSubmit={handleSubmit}
  />
  );
}