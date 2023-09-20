<a href="https://novel.sh">
  <img alt="Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://novel.sh/opengraph-image.png">
  <h1 align="center">Novel</h1>
</a>

<p align="center">
  An open-source Notion-style WYSIWYG editor with AI-powered autocompletions. 
</p>

<p align="center">
  <a href="https://news.ycombinator.com/item?id=36360789"><img src="https://img.shields.io/badge/Hacker%20News-369-%23FF6600" alt="Hacker News"></a>
  <a href="https://github.com/steven-tey/novel/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/steven-tey/novel?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/steven-tey/novel"><img src="https://img.shields.io/github/stars/steven-tey/novel?style=social" alt="Novel.sh's GitHub repo"></a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

[Novel](https://novel.sh/) is a Notion-style WYSIWYG editor with AI-powered autocompletions.

https://github.com/steven-tey/novel/assets/28986134/2099877f-4f2b-4b1c-8782-5d803d63be5c

<br />

## Installation

To use Novel in a project, you can run the following command to install the `novel` [NPM package](https://www.npmjs.com/package/novel):

```
npm i novel
```

Then, you can use it in your code like this:

```jsx
import { Editor } from "novel";

export default function App() {
  return <Editor />;
}
```

The `Editor` is a React component that takes in the following props:

| Prop                | Type                        | Description                                                                                                                                                                                | Default                                                                                                                             |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `completionApi`     | `string`                    | The API route to use for the OpenAI completion API.                                                                                                                                        | `/api/generate`                                                                                                                     |
| `className`         | `string`                    | Editor container classname.                                                                                                                                                                | `"relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"` |
| `defaultValue`      | `JSONContent` or `string`   | The default value to use for the editor.                                                                                                                                                   | [`defaultEditorContent`](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/default-content.tsx)             |
| `extensions`        | `Extension[]`               | A list of extensions to use for the editor, in addition to the [default Novel extensions](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx). | `[]`                                                                                                                                |
| `editorProps`       | `EditorProps`               | Props to pass to the underlying Tiptap editor, in addition to the [default Novel editor props](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/props.ts).        | `{}`                                                                                                                                |
| `onUpdate`          | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated.                                                                                                                         | `() => {}`                                                                                                                          |
| `onDebouncedUpdate` | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.                                                                           | `() => {}`                                                                                                                          |
| `debounceDuration`  | `number`                    | The duration (in milliseconds) to debounce the `onDebouncedUpdate` callback.                                                                                                               | `750`                                                                                                                               |
| `storageKey`        | `string`                    | The key to use for storing the editor's value in local storage.                                                                                                                            | `novel__content`                                                                                                                    |

> **Note**: Make sure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work. Here's an example: https://github.com/steven-tey/novel/blob/main/apps/web/app/api/generate/route.ts

Here's an example application: https://github.com/steven-tey/novella

## Deploy Your Own

You can deploy your own version of Novel to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://stey.me/novel-deploy)

## Setting Up Locally

To set up Novel locally, you'll need to clone the repository and set up the following environment variables:

- `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))
- `BLOB_READ_WRITE_TOKEN` – your Vercel Blob read/write token (currently [still in beta](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart), but feel free to [sign up on this form](https://vercel.fyi/blob-beta) for access)

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev
```

## Cross-framework support

While Novel is built for React, we also have a few community-maintained packages for non-React frameworks:

- Svelte: https://novel.sh/svelte
- Vue: https://novel.sh/vue

## VSCode Extension

Thanks to @bennykok, Novel also has a VSCode Extension: https://novel.sh/vscode

https://github.com/steven-tey/novel/assets/28986134/58ebf7e3-cdb3-43df-878b-119e304f7373

## Tech Stack

Novel is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [Tiptap](https://tiptap.dev/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Cal Sans](https://github.com/calcom/font) – font

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/steven-tey/novel/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/steven-tey/novel/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/steven-tey/novel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=steven-tey/novel" />
</a>

## Repo Activity

![Novel.sh repo activity – generated by Axiom](https://repobeats.axiom.co/api/embed/2ebdaa143b0ad6e7c2ee23151da7b37f67da0b36.svg)

## License

Licensed under the [Apache-2.0 license](https://github.com/steven-tey/novel/blob/main/LICENSE.md).

```
auteur
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ objects
│  │  ├─ 13
│  │  │  └─ 40b2c45b274e11d9df7915e0ce8e68804878e1
│  │  ├─ 19
│  │  │  └─ 6889d7cb6e43fd467bfdf196be36b45d47df8a
│  │  ├─ 23
│  │  │  └─ 8c24c3fd6edc6bec51d4f9372aa7216c3c02dc
│  │  ├─ 25
│  │  │  └─ 48e223a949132f4eac02857368c2091cf844ee
│  │  ├─ 27
│  │  │  └─ d1a303384567069c671ce0c100d5b732b1d978
│  │  ├─ 33
│  │  │  └─ a6c8217be587d715d11711fd2cdf6b44606a73
│  │  ├─ 3b
│  │  │  └─ fb40fc61c2790f8301ba3262e677848f5da66e
│  │  ├─ 6c
│  │  │  └─ 4544b6145a68f3322719bfd88a3a963da7d6d5
│  │  ├─ 77
│  │  │  └─ 149b6e3ca551c85eb113c9940ed7a0e9292603
│  │  ├─ 9f
│  │  │  └─ fddf8c33a2b136e210eb693b26d1bdf26aba59
│  │  ├─ a3
│  │  │  └─ f2071d70723f99d49c316d42fd655905412d8a
│  │  ├─ ac
│  │  │  └─ fd6640f5e3f4a7e2c37888712ced7587092fc8
│  │  ├─ b9
│  │  │  └─ 181169d43004163f0098f8e76357bed961da02
│  │  ├─ d1
│  │  │  └─ ec87587e9c546908307f2b1731968fc564838d
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-578312f09d12730355ac5f49aec59094b68f90dc.idx
│  │     └─ pack-578312f09d12730355ac5f49aec59094b68f90dc.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .github
│  └─ FUNDING.yml
├─ .gitignore
├─ LICENSE
├─ README.md
├─ apps
│  └─ web
│     ├─ .gitignore
│     ├─ .prettierignore
│     ├─ app
│     │  ├─ api
│     │  │  ├─ generate
│     │  │  │  └─ route.ts
│     │  │  └─ upload
│     │  │     └─ route.ts
│     │  ├─ favicon.ico
│     │  ├─ layout.tsx
│     │  ├─ opengraph-image.png
│     │  ├─ page.tsx
│     │  └─ providers.tsx
│     ├─ components
│     │  ├─ Company.tsx
│     │  └─ CompanyList.tsx
│     ├─ lib
│     │  ├─ hooks
│     │  │  └─ use-local-storage.ts
│     │  ├─ supabaseClient.ts
│     │  └─ utils.ts
│     ├─ next.config.js
│     ├─ package.json
│     ├─ pages
│     │  ├─ api
│     │  │  └─ companies.js
│     │  └─ index.js
│     ├─ pnpm-lock.yaml
│     ├─ postcss.config.js
│     ├─ prettier.config.js
│     ├─ styles
│     │  ├─ globals.css
│     │  └─ styles.ts
│     ├─ tailwind.config.js
│     ├─ tsconfig.json
│     └─ ui
│        ├─ editor.tsx
│        ├─ icons
│        │  ├─ font-default.tsx
│        │  ├─ font-mono.tsx
│        │  ├─ font-serif.tsx
│        │  ├─ github.tsx
│        │  └─ index.tsx
│        ├─ menu.tsx
│        └─ primitives
│           └─ popover.tsx
├─ package.json
├─ packages
│  ├─ core
│  │  ├─ README.md
│  │  ├─ package.json
│  │  ├─ postcss.config.js
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  ├─ lib
│  │  │  │  ├─ editor.ts
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ use-local-storage.ts
│  │  │  │  └─ utils.ts
│  │  │  ├─ styles
│  │  │  │  ├─ CalSans-SemiBold.otf
│  │  │  │  ├─ fonts.ts
│  │  │  │  ├─ index.css
│  │  │  │  ├─ prosemirror.css
│  │  │  │  └─ tailwind.css
│  │  │  └─ ui
│  │  │     ├─ editor
│  │  │     │  ├─ bubble-menu
│  │  │     │  │  ├─ color-selector.tsx
│  │  │     │  │  ├─ index.tsx
│  │  │     │  │  ├─ link-selector.tsx
│  │  │     │  │  └─ node-selector.tsx
│  │  │     │  ├─ default-content.tsx
│  │  │     │  ├─ extensions
│  │  │     │  │  ├─ custom-keymap.ts
│  │  │     │  │  ├─ drag-and-drop.tsx
│  │  │     │  │  ├─ image-resizer.tsx
│  │  │     │  │  ├─ index.tsx
│  │  │     │  │  ├─ slash-command.tsx
│  │  │     │  │  └─ updated-image.ts
│  │  │     │  ├─ index.tsx
│  │  │     │  ├─ plugins
│  │  │     │  │  └─ upload-images.tsx
│  │  │     │  └─ props.ts
│  │  │     └─ icons
│  │  │        ├─ index.tsx
│  │  │        ├─ loading-circle.tsx
│  │  │        └─ magic.tsx
│  │  ├─ tailwind.config.js
│  │  ├─ tsconfig.json
│  │  └─ tsup.config.ts
│  ├─ tailwind-config
│  │  ├─ package.json
│  │  └─ tailwind.config.js
│  └─ tsconfig
│     ├─ base.json
│     ├─ next.json
│     ├─ package.json
│     └─ react.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
└─ turbo.json

```