#!/bin/sh

emcc ./wasm/add.cpp -s ENVIRONMENT=worker -s MODULARIZE=1 -s EXPORTED_FUNCTIONS="['_add']" -o ./wasm/add.js
