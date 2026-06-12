/* eslint-disable */
import { showAlert } from "./alert.js";

// no need to call loadStripe anymore
export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const session = await res.json();
    console.log("Checkout session:", session);

    // 2. Redirect manually
    window.location.href = session.session.url;
  } catch (err) {
    console.error("Stripe Checkout error:", err);
    showAlert("error", err.message);
  }
};
