import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (reference) {
      axios
        .get(`http://localhost:3000/api/payments/verify/${reference}`)
        .then((res) => {
          if (res.data.data.status === "success") {
            setStatus("Payment Successful!");
          } else {
            setStatus("Payment Failed.");
          }
        })
        .catch(() => setStatus("Error verifying payment."));
    }
  }, []);

  return <div>{status}</div>;
}
