import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="box">
      <h1>Remix Single: Newsletter Signup Form</h1>
      <div>
        <Link to="/newsletter">Go to newsletter page</Link>
      </div>
    </div>
  );
}
