import { EventEmitter } from "events";

const localEndpointEmitter = new EventEmitter();

localEndpointEmitter.setMaxListeners(100);

export function localEndpoint(name1, name2) {
	const listeners = new WeakMap();
	return {
		postMessage: (message) => {
			return localEndpointEmitter.emit(name1, message);
		},
		addEventListener: (_, eh) => {
			const l = (data) => {
				if ("handleEvent" in eh) {
					eh.handleEvent({ data });
				} else {
					eh({ data });
				}
			};
			localEndpointEmitter.on(name2, l);
			listeners.set(eh, l);
		},
		removeEventListener: (_, eh) => {
			const l = listeners.get(eh);
			if (!l) return;

			localEndpointEmitter.off(name2, l);
			listeners.delete(eh);
		},
		start: () => {
			//
		},
	};
}
