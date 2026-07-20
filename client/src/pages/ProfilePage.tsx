import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../api/userService";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/dto/ApiErrorResponse";

import type { UserResponse } from "../types/dto/response/UserResponse";

import "../styles/profile/ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserDetails();

        setUser(data);

        setUsername(data.username ?? "");
        setFirstName(data.firstName ?? "");
        setLastName(data.lastName ?? "");
      } catch (err) {
        console.error(err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const errors: string[] = [];

    if (!username.trim()) {
      errors.push("Username cannot be empty");
    }

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setSaving(true);

    try {
      const updatedUser = await updateUserDetails({
        username,
        firstName,
        lastName,
      });

      setUser(updatedUser);

      setSuccess("Profile updated successfully.");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const data = error.response?.data;

      if (!data) {
        setError("Failed to update profile.");
        return;
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        setError(Object.values(data.errors).join(", "));
      } else {
        setError(data.message);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {firstName
            ? firstName.charAt(0).toUpperCase()
            : username.charAt(0).toUpperCase()}
        </div>

        <h1 className="profile-title">Your Profile</h1>

        <p className="profile-subtitle">Customize your account information.</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>First Name</label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Last Name</label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <div className="profile-meta">
            <p>Created At: {new Date(user!.createdAt).toLocaleDateString()}</p>

            <p>Last Login: {new Date(user!.lastLogin).toLocaleString()}</p>
          </div>

          {error && <p className="profile-error">{error}</p>}

          {success && <p className="profile-success">{success}</p>}

          <button
            type="submit"
            disabled={saving}
            className="profile-save-button"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
