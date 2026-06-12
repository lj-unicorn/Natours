import { showAlert } from "./alert.js";

//type is either "password" or "data"
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.status === "success") {
      showAlert(
        "success",
        `${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} updated successfully`,
      );
    } else {
      showAlert("error", json.message);
    }
  } catch (err) {
    showAlert("error", err.message);
  }
};
