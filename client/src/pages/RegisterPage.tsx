import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService"
import { useAuth } from "../context/AuthContext"
import RegisterView from "../components/register/RegisterView"

export default function RegisterPage() {
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
      const res = await registerUser({ username, password });
      login(res.token);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400 && err.response?.data) {
          const messages = Object.values(err.response.data).join(", ");
          setError(messages);
        } else {
          setError(err.response?.data?.message || "Registration failed");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterView
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