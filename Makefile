REPOSITORY := tsandall/clang-wasm-exp

all: clean out.wasm

builder:
	docker build -t $(REPOSITORY) .

#$(shell rm -fr bin && mkdir -p bin)

hack:
	docker run -it --rm -v $(PWD):/src $(REPOSITORY)

json.wasm: json.c
	$(CC) --target=wasm32-unknown-unknown-wasm $^ -c -o $@

libjson.a: json.wasm
	$(AR) qc libjson.a json.wasm

# TODO(tsandall): figure out how to make wa2wasm or wasm-as work.  when the
# WASM module is assembled manually, the linker does not emit the final WASM
# module containing exports from the hand assembled module.
#eval.wasm: eval.wast
#	wat2wasm --relocatable eval.wast -o eval.wasm

eval.wasm: eval.c
	$(CC) --target=wasm32-unknown-unknown-wasm $^ -c -o $@

out.wasm: libjson.a eval.wasm
	wasm-ld-8 --verbose --import-memory --no-entry --export-all -L . -l json eval.wasm -o out.wasm

clean:
	rm -f *.wasm *.a
