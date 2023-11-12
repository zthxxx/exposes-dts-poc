# Proof of Concept for d.ts Generation in Exposed Modules

### Objectives:

- [x] Generate `d.ts` files while replacing alias paths specified in the `"paths"` attribute of `tsconfig.json`.
  - [x] Convert from an "`absolute`" import path of monorepo packages to a `relative` path.
- [x] Only the entry files listed in the `"paths"` attribute of `tsconfig.json` under the `include` field should generate `d.ts` files for all dependent files.
- [x] Avoid generating `d.ts` files if the original files are **not** imported by any file within the dependency tree of the entry file `expose.ts`.
- [x] Ensure that the generated `d.ts` files maintain the same file structure as the original files.
- [x] Ensure that the `"paths"` attribute has higher priority than any existing package with the same name in `node_modules`.

### Testing Instructions

```bash
pnpm install
pnpm test
```

step by step:

```bash
pnpm test:no-alias
pnpm test:alias
```
