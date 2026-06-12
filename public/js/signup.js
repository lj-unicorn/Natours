/* eslint-disable */
import { showAlert } from "./alert.js";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await fetch("/api/v1/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.log("signup err response: ", data);
      throw new Error(data.message || "Failed to sign up");
    }

    showAlert("success", "Account created successfully! Logging you in...");
    window.setTimeout(() => location.assign("/"), 1500);
  } catch (err) {
    console.error("Signup error:", err);
    showAlert("error", err.message || "Something went wrong!");
  }
};
