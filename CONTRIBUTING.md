This is a fork of [`ts-mockito`](https://github.com/NagRock/ts-mockito/), published separately as `@typestrong/ts-mockito`

We hope to eventually merge back with upstream `ts-mockito` and publish to the `ts-mockito` npm name, but until then, a fork lets us add new features.

# Publishing

Release notes / changelogs are published to Github Releases.  
For examples of how this looks, see here: https://github.com/NagRock/ts-mockito/releases
and here: https://github.com/TypeStrong/ts-mockito/releases

We publish to npm using `np`, which is a CLI tool that handles the repetitive tasks of publishing safely.

# Documentation site

The `website/` directory is a [Docusaurus](https://docusaurus.io/) site with the guides under
`website/docs/` plus an API reference auto-generated from the JSDoc in `src/ts-mockito.ts` via
[TypeDoc](https://typedoc.org/). Run `npm run docs:start` from the repo root for a live-reloading
local preview, or `npm run docs:build` to produce a static build in `website/build`. It deploys
to GitHub Pages automatically on push to `master` (see `.github/workflows/deploy-docs.yml`).
