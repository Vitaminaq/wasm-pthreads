import { wrap } from "comlink";
import WasmWorker from "./service/worker/wasm.worker";
import { workerPointName, mianPointName, thread } from "./service/wasm";
import { localEndpoint } from "./service/rpc/adapter";

const worker = new WasmWorker();

const workerPoint = thread ? worker : localEndpoint(mianPointName, workerPointName);

const wasmWorker = wrap(workerPoint);

(async function() {
  const result = await wasmWorker(1, 4);
  console.log(result, "0000000000000000000000000");
})();
