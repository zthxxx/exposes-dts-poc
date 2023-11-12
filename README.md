# Proof-of-Concept for `d.ts` Generation in Exposed Modules


### Aims to Verify:

- [x] Replace out **alias paths** in `d.ts` by `tsconfig`'s `"paths"` that 
  change "`absolute`" import paths in monorepo packages to `relative` ones.
  - 🟢 `ts-patch`
  - ❌ `tsc`
- [x] `d.ts` files are only generated for entry files listed in `tsconfig`'s `"paths"` under `include` and all they covered dependencies.
  - 🟢 `ts-patch` & `tsc`
- [x] No `d.ts` if the original files aren't import by any dependency in `expose` entries.
  - 🟢 `ts-patch` & `tsc`
- [x] Keep the same file structure in generated `d.ts` as the original files.
  - 🟢 `ts-patch` & `tsc`
- [x] `"paths"` attribute should override any existing same-named packages in `node_modules`.
  - 🟢 `ts-patch` & `tsc`
- [ ] No `d.ts` if the original files be imported by not used in any export symbol.
  - ❌ `ts-patch` & `tsc`
- [ ] No `d.ts` if the original files in re-export by not used in any import.
  - ❌ `ts-patch` & `tsc`


### Testing

```bash
pnpm install
pnpm test
```

step by step:

```bash
pnpm test:no-alias
pnpm test:alias
```

### Refresh Snapshot

```bash
pnpm build:no-alias
pnpm snapshot:store no-alias

pnpm build:alias
pnpm snapshot:store alias
```
