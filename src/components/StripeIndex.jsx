import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

import React from "react";
const stripePromise = loadStripe(
  "pk_test_51PEnAKLD2jJqby2hYkatDAoxAdB9hjvK94glu1jnuSxvfNC4FWB2O3WNVxDMcOhpsjW8jpgHsvhHyixSpTpXYbx500pqSvZDSM"
);

const StripeIndex = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${"${acct_1PEnAKLD2jJqby2h}"}_secret_${"${sk_test_51PEnAKLD2jJqby2hSGIkRf9h4otYfKDoEI6R53EArk6RrnXzj5SuXy3ztFDkpOBjuoGAdhMlTGVu0IFJpsD61ebP00SMSMwP0D}"}`,
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripeIndex;
