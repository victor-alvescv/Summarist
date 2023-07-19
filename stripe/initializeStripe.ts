import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51MzemGLXOr0D0CNbXpvx8yImPeOduzPaOKBuR8ecN2VHA6FWMr5U5XxQpnmhr9rIZaWHVchs1MNsQieNRrA0VxR9008c335SWR"
    );
  }
  return stripePromise;
};
export default getStripe;