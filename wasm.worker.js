import { expose } from "comlink";
import addWasm from "./wasm/add.wasm";
import addJS from "./wasm/add.js";

// const loadWasm = async () => {
//     return new Promise(async resolve => {
//         const wasm = await fetch(addWasm);
//         const buffer = await wasm.arrayBuffer();
//         const _instance = await addJS({
//           wasmBinary: buffer
//         });
    
//         resolve(_instance._add(a, b))
//       });
// }

const sum = async (a, b) =>
  new Promise(async resolve => {
    const wasm = await fetch(addWasm);
    const buffer = await wasm.arrayBuffer();
    const _instance = await addJS({
      wasmBinary: buffer,
      test: () => {
        console.log("vvvvvv");
      }
    });

    console.log("获取到的Module", _instance);

    resolve(_instance._add(a, b))
  });

expose(sum);
