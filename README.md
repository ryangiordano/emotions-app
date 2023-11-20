<h1 align="center">
Emotion App
</h1>

<p align="center">
  <img src="https://darumadevdiaryhome.files.wordpress.com/2023/11/emotion-app.gif?w=385" />
</p>

## Development

The following terminal commands are from _[Vite.js command line interface](https://vitejs.dev/guide/#command-line-interface)_. Also check the _[package.json](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/blob/main/package.json)_ file "scripts" section for all command line scripts.

Note: _[npm](https://www.npmjs.com/)_ can also be replaced with _[yarn](https://yarnpkg.com/)_ or _[pnpm](https://pnpm.io/)_...

### Run development website locally

```
npm run dev
```

- There is no PWA functionality in development mode.

### Build production files - to "dist" folder

```
npm run build
```

- Ensure there are no TypeScript errors, otherwise complilation will be aborted.
- Build files will be placed in the "dist" folder by default.
- To change build folder, add this line to _[vite.config.ts](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/blob/main/vite.config.ts)_ `defineConfig`:

```javascript
build: {
  outDir: './build-directory'
},
```

### Run production build website locally

```
npm run preview
```
