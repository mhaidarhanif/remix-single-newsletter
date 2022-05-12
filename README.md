# Remix Single: Newsletter Signup Form

More polished example on the newsletter form with Remix and ConvertKit. Everything lives in `routes/newsletter.tsx`.

- Live demo: https://remix-single-newsletter.vercel.app
- YouTube Video: https://www.youtube.com/watch?v=jd_bin5HPrw
- Original code: https://github.com/remix-run/remix/tree/main/examples/newsletter-signup

## Documentation

- [Remix Docs](https://remix.run/docs)

## Development

Copy `.env.example` to `.env` and edit the file:

```sh
CONVERTKIT_API_KEY=abcdefghijklmnop
CONVERTKIT_FORM_ID=1234567
```

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
