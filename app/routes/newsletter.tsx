import { Form } from "@remix-run/react";

export default function Newsletter() {
  return (
    <main className="box">
      <Form method="post">
        <h2>Subscribe to our newsletter</h2>
        <p>Keep up to date with our updates to your inbox.</p>
        <fieldset>
          <input
            type="email"
            name="email"
            id="newsletter-email"
            placeholder="you@example.com"
          />
          <button type="submit">Subscribe</button>
        </fieldset>
      </Form>
    </main>
  );
}
