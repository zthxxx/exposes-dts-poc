# Proof-of-Concept for `d.ts` Generation in Exposed Modules


### Aims to Verify:

Verify that the minimum file structure is exactly the same as in our production repository,
and then compare and validate the following aims:

- [x] Replace out **alias paths** in `d.ts` by `tsconfig`'s `"paths"` that
  change **"absolute"** import paths in monorepo packages to **relative** ones.
  - ❌ `tsc` <br/>
    (typical see [`expose/expose.ts`](./packages/expose/expose/expose.ts) | [`tsc/expose/expose.d.ts`](./packages/expose/snapshots/tsc/expose/expose/expose.d.ts))
  - 🟢 `ts-patch` / `tsc` + `tsc-alias` <br/>
    ([`ts-patch/expose/expose.d.ts`](./packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts) | [`tsc-alias/expose/expose.ts`](./packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts))
- [x] Replaced alias paths with direct **package root index** import in source file (`import '@monospace/base'`)
  - ❌ `tsc`  <br/>
    (typical see [`expose/expose.ts`](./packages/expose/expose/expose.ts) | [`tsc/expose/expose.d.ts`](./packages/expose/snapshots/tsc/expose/expose/expose.d.ts))
  - 🟢 `ts-patch` / `tsc` + `tsc-alias` <br/>
    ([`ts-patch/expose/expose.d.ts`](./packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts) | [`tsc-alias/expose/expose.ts`](./packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts))
- [x] `d.ts` files are only generated for entry files listed in `tsconfig`'s `include` and all they covered dependencies.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias` <br/>
    ([`expose/redundancy.ts`](./packages/expose/expose/redundancy.ts) not build in [`snapshots/expose/`](./packages/expose/snapshots/tsc/expose/expose))
- [x] No `d.ts` if the original files aren't import by any dependency in `expose` entries.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias` <br/>
    ([`openapp/not-be-import.ts`](./packages/openapp/src/deep/not-be-import.ts) not build in [`snapshots/openapp/src/deep`](./packages/expose/snapshots/tsc/openapp/src/deep))
- [x] Keep the same file structure in generated `d.ts` as the original files.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias` <br/>
    ([`snapshots/tsc/`](./packages/expose/snapshots/tsc/) | [`snapshots/ts-patch/`](./packages/expose/snapshots/ts-patch/) | [`snapshots/tsc-alias/`](./packages/expose/snapshots/tsc-alias/))
- [x] `"paths"` attribute should override any existing same-named packages in `node_modules` with symlink.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias` <br/>
    (all of `@monospace/...` have already linked in `node_modules` by `pnpm install`)
- [ ] No `d.ts` if the original files be imported by not used in any export symbol.
  - ❌ `ts-patch` & `tsc` & `tsc-alias`, see
    - [`openapp/imported-but-not-export.ts`](./packages/openapp/src/deep/imported-but-not-export.ts) | [`tsc/openapp/imported-but-not-export.d.ts`](./packages/expose/snapshots/tsc/openapp/src/deep/imported-but-not-export.d.ts)
    - [`ts-patch/openapp/imported-but-not-export.d.ts`](./packages/expose/snapshots/ts-patch/openapp/src/deep/imported-but-not-export.d.ts) | [`tsc-alias/openapp/imported-but-not-export.d.ts`](./packages/expose/snapshots/tsc-alias/openapp/src/deep/imported-but-not-export.d.ts)
- [ ] No `d.ts` if the original files in re-export by not used in any import.
  - ❌ `ts-patch` & `tsc` & `tsc-alias`, see
    - [`openapp/named-reexport-not-use.ts`](./packages/openapp/src/deep/export-index/named-reexport-not-use.ts) | [`tsc/openapp/named-reexport-not-use.d.ts`](./packages/expose/snapshots/tsc/openapp/src/deep/export-index/named-reexport-not-use.d.ts)
    - [`ts-patch/openapp/named-reexport-not-use.d.ts`](./packages/expose/snapshots/ts-patch/openapp/src/deep/export-index/named-reexport-not-use.d.ts) | [`tsc-alias/openapp/named-reexport-not-use.d.ts`](./packages/expose/snapshots/tsc-alias/openapp/src/deep/export-index/named-reexport-not-use.d.ts)



### Testing

```bash
pnpm install
pnpm test
```

step by step:

```bash
cd packages/expose

pnpm test:tsc
pnpm test:ts-patch
pnpm test:tsc-alias
```

### Refresh Snapshot

```bash
cd packages/expose

pnpm test:tsc
pnpm snapshot:store tsc

pnpm test:ts-patch
pnpm snapshot:store ts-patch

pnpm test:tsc-alias
pnpm snapshot:store tsc-alias
```
