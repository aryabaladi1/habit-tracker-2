"use client";
import "../../styles/register/RegisterView.css";

interface RegisterViewProps {
  username: string;
  password: string;
  error: string;
  loading: boolean;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegisterView({
  username,
  password,
  error,
  loading,
  setUsername,
  setPassword,
  handleSubmit,
}: RegisterViewProps) {
  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="register-title">Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        {error && <p className="register-error">{error}</p>}

        <button type="submit" disabled={loading} className="register-button">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
