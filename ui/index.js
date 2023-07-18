import { wrap, expose } from "comlink";
import WasmWorker from "./service/worker/wasm.worker";
import { workerPointName, mainPointName, thread } from "./service/wasm";
import { localEndpoint } from "./service/rpc/adapter";

const worker = new WasmWorker();

const workerPoint = thread ? worker : localEndpoint(mainPointName, workerPointName);

expose({
  add: () => {
    return 4;
  }
}, workerPoint)

const wasmWorker = wrap(workerPoint);

(async function() {
  const result = await wasmWorker(1, 4);
  console.log(result, "0000000000000000000000000");
})();
