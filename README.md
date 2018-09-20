# Static linking WASM modules with LLVM

This repository contains a simple example that shows how to compile C into WASM
using clang and then statically link the WASM modules using the LLVM linker
(wasm-ld-8).

## Steps

Build the Docker image that will be used to build the WASM modules.

```bash
make builder
make hack
```

Inside the Docker image build the WASM moduels.

```
make
```

Run the node program.

```
node eval.js
```
