import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");

  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_URL = `https://api.convertkit.com/v3`;

  const response = await fetch(`${API_URL}/forms/${FORM_ID}/subscribe`, {
    method: "post",
    body: JSON.stringify({
      email,
      api_key: API_KEY,
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  const data = await response.json();

  return json(data);
};

export default function Newsletter() {
  const actionData = useActionData();
  const transition = useTransition();

  /**
   * Example without transition
   */
  // const reloadDocument = true
  // const state: "idle" | "success" | "error" = actionData?.subscription
  //   ? "success"
  //   : actionData?.error
  //   ? "error"
  //   : "idle";

  /**
   * Example with transition
   */
  const state: "idle" | "success" | "error" | "submitting" =
    transition.submission
      ? "submitting"
      : actionData?.subscription
      ? "success"
      : actionData?.error
      ? "error"
      : "idle";
  /**
   * Note: Do not use optional chaining in transition.submission
   * like transition?.submission because it will not get the "submitting" state
   */

  /**
   * Handle focus on error and select on idle
   * But do not select on the initial render
   * Then move focus to success h2 when state is success
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }
    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }
    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main className="box">
      {/* Do not create new entry in the history stack */}
      <Form replace method="post" aria-hidden={state === "success"}>
        <h2>Subscribe to our newsletter</h2>
        <p>Keep up to date with our updates to your inbox.</p>
        <fieldset disabled={state === "submitting"}>
          <input
            aria-label="Email address"
            aria-describedby="error-message"
            ref={inputRef}
            name="email"
            type="email"
            id="newsletter-email"
            placeholder="you@example.com"
            required
          />
          <button type="submit">
            {state === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>

        <p id="error-message">
          {state === "error" ? actionData?.message : <span>&nbsp;</span>}
        </p>
      </Form>

      <div aria-hidden={state !== "success"}>
        <h2 ref={successRef} tabIndex={-1}>
          You're subscribed!
        </h2>
        <p>Please check your inbox to confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  );
}
