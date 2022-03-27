.PHONY: clean build run

run: build
	./build/sr run ./build/test.wasm invoke 'u32(6)'

build: build/sr build/test.wasm

build/sr: host/*.ts val/*.ts
	cd val && asc -o ../build/val.wasm val.ts
	cd host && deno compile --allow-read -o ../build/sr main.ts

build/test.wasm: client/*.ts val/*.ts
	cd client && asc --runtime stub --disable bulk-memory -Osize -o ../build/test.wasm main.ts

clean:
	rm -fr build
