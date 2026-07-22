"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit() {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/profile/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Change Password
        </h1>

        <div className="space-y-5">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}