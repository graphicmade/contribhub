import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "@/services/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { updateAdPaymentStatus } from "@/services/ads";

export async function POST(request: Request) {
  const stripe = require("stripe")(STRIPE_SECRET_KEY);
  const secret = STRIPE_WEBHOOK_SECRET;
  try {
    const body = await request.text();
    const signature = (await headers()).get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    console.log(event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const adId = session.metadata.ad_id;

      if (adId) {
        // Update the ad payment status to paid
        const updated = await updateAdPaymentStatus(Number(adId), true);
        if (updated) {
          console.log(`Ad ${adId} marked as paid`);
        } else {
          console.error(`Failed to update payment status for ad ${adId}`);
        }
      } else {
        console.error("Ad ID not found in session metadata");
      }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
