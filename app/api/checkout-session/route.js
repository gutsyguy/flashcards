import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function GET(req) {
    const session_id = req.nextUrl.searchParams.get('session_id');
    
    if (!session_id) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
        return NextResponse.json(checkoutSession);
    } catch (err) {
        console.error("Error retrieving checkout session:", err);
        return NextResponse.json({ error: { message: err.message } }, { status: 500 });
    }
}
