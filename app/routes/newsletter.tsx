import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

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

  return (
    <main className="box">
      <Form method="post">
        <h2>Subscribe to our newsletter</h2>
        <p>Keep up to date with our updates to your inbox.</p>
        <fieldset>
          <input
            name="email"
            type="email"
            id="newsletter-email"
            placeholder="you@example.com"
            required
          />
          <button type="submit">Subscribe</button>
        </fieldset>

        <p>
          {(actionData?.error && actionData?.message) ?? <span>&nbsp;</span>}
        </p>
      </Form>
    </main>
  );
}
