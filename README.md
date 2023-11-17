# Proof-of-Concept for `d.ts` Generation in Exposed Modules


### Aims to Verify:

Verify that the minimum file structure is exactly the same as in our production repository,
and then compare and validate the following aims:

- [x] Replace out **alias paths** in `d.ts` by `tsconfig`'s `"paths"` that
  change "`absolute`" import paths in monorepo packages to `relative` ones.
  - ❌ `tsc` (typical see `packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts`)
  - 🟢 `tsc` + `tsc-alias`
  - 🟡 `ts-patch`
    - 🟢 with package sub-path
    - ❌ package root index <br/>
      (see `../../../../base` in `packages/expose/snapshots/ts-patch/expose/expose/expose.d.ts`)
- [x] `d.ts` files are only generated for entry files listed in `tsconfig`'s `"paths"` under `include` and all they covered dependencies.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias`
- [x] No `d.ts` if the original files aren't import by any dependency in `expose` entries.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias`
- [x] Keep the same file structure in generated `d.ts` as the original files.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias`
- [x] `"paths"` attribute should override any existing same-named packages in `node_modules`.
  - 🟢 `ts-patch` & `tsc` & `tsc-alias`
- [ ] No `d.ts` if the original files be imported by not used in any export symbol.
  - ❌ `ts-patch` & `tsc` & `tsc-alias`, see
    - `packages/expose/snapshots/tsc/openapp/src/deep/imported-but-not-export.d.ts`
    - `packages/expose/snapshots/ts-patch/openapp/src/deep/imported-but-not-export.d.ts`
- [ ] No `d.ts` if the original files in re-export by not used in any import.
  - ❌ `ts-patch` & `tsc` & `tsc-alias`, see
    - `packages/expose/snapshots/tsc/openapp/src/deep/export-index/named-reexport-not-use.d.ts`
    - `packages/expose/snapshots/tsc-patch/openapp/src/deep/export-index/named-reexport-not-use.d.ts`



### Testing

```bash
pnpm install
pnpm test
```

step by step:

```bash
cd packages/expose

pnpm test:no-alias
pnpm test:alias
```

### Refresh Snapshot

```bash
cd packages/expose

pnpm build:no-alias
pnpm snapshot:store no-alias

pnpm build:alias
pnpm snapshot:store alias
```

### File Structure

```markdown
.
├── expose
│   ├── expose.config.ts
│   └── expose.ts
├── packages
│   └── openapp
│       └── src
│           ├── deep
│           │   ├── absolute-import.ts
│           │   ├── export-index
│           │   │   ├── exported-but-not-use.ts
│           │   │   ├── index.ts
│           │   │   ├── internal.ts
│           │   │   └── named-reexport-not-use.ts
│           │   ├── imported-but-not-export.ts
│           │   ├── not-be-import.ts
│           │   ├── relative-import.ts
│           │   └── types.ts
│           ├── index.ts
│           ├── redundancy.ts
│           └── something.ts
├── snapshots
│   ├── alias
│   └── no-alias
└── types
    ├── expose
    └── packages
```
