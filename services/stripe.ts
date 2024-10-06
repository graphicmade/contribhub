"use server";
import { AD_PRICE_ID, getUri, STRIPE_SECRET_KEY } from "./utils";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

export async function createCheckoutSession(ad_id: number, email: string) {
  // Check if a customer with the given email already exists
  const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
  let customerId;

  if (existingCustomers.data.length > 0) {
    // If a customer exists, use their ID
    customerId = existingCustomers.data[0].id;
  } else {
    // If no customer exists, create a new one
    const newCustomer = await stripe.customers.create({ email: email });
    customerId = newCustomer.id;
  }

  // Create the checkout session with the customer ID
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customerId,
    line_items: [
      {
        price: AD_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_intent_data: {
      metadata: {
        ad_id: ad_id,
      },
    },
    metadata: {
      ad_id: ad_id,
    },
    success_url: `${getUri("/dashboard/advertise?session_id={CHECKOUT_SESSION_ID}")}`,
    cancel_url: `${getUri("/dashboard/advertise")}`,
  });

  return session;
}

export async function getCustomerPortal(email: string) {
  try {
    // Search for customers with the given email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    // Check if a customer was found
    if (customers.data.length === 0) {
      throw new Error("No customer found with this email address");
    }

    const customerId = customers.data[0].id;

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getUri("/dashboard")}`, // Adjust this URL as needed
    });
    return session.url;
  } catch (error) {
    console.error("Error getting customer portal:", error);
    throw error;
  }
}
