import { expose, wrap } from "comlink";
import addWasm from "../../../wasm/add.wasm";
import addJS from "../../../wasm/add.js";
import { localEndpoint } from "../rpc/adapter";

// 是否开启多线程开关
export const thread = false;

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
    });

    const res = _instance._add(a, b);

    resolve(res)
  });


export const workerPointName = "worker";
export const mainPointName = "mian";

export const workerPoint = thread
	? self
	: localEndpoint(workerPointName, mainPointName);

const main = wrap(workerPoint)

expose(sum, workerPoint);

setTimeout(async () => {
  const res = await main.add();

  console.log("主线程计算结果", res);
}, 2000);
