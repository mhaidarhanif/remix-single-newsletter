import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");

  console.log({ email });

  return json({});
};

export default function Newsletter() {
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
          />
          <button type="submit">Subscribe</button>
        </fieldset>
      </Form>
    </main>
  );
}
