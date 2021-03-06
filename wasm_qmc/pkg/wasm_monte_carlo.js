let wasm_bindgen;
(function() {
    const __exports = {};
    let wasm;

    let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

    cachedTextDecoder.decode();

    let cachegetUint8Memory0 = null;
    function getUint8Memory0() {
        if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory0;
    }

    function getStringFromWasm0(ptr, len) {
        return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
    }

    const heap = new Array(32).fill(undefined);

    heap.push(undefined, null, true, false);

    let heap_next = heap.length;

    function addHeapObject(obj) {
        if (heap_next === heap.length) heap.push(heap.length + 1);
        const idx = heap_next;
        heap_next = heap[idx];

        heap[idx] = obj;
        return idx;
    }

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8);
    getFloat64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
__exports.init_panic_hook = function() {
    wasm.init_panic_hook();
};

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
*/
class Lattice {

    static __wrap(ptr) {
        const obj = Object.create(Lattice.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lattice_free(ptr);
    }
    /**
    * Make a new lattice with `edges`, positive implies antiferromagnetic bonds, negative is
    * ferromagnetic.
    * @param {Uint32Array} edge_a
    * @param {Uint32Array} edge_b
    * @param {Float64Array} edge_j
    * @param {number} transverse
    * @param {number} beta
    * @returns {Lattice}
    */
    static new(edge_a, edge_b, edge_j, transverse, beta) {
        var ptr0 = passArray32ToWasm0(edge_a, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(edge_b, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArrayF64ToWasm0(edge_j, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        var ret = wasm.lattice_new(ptr0, len0, ptr1, len1, ptr2, len2, transverse, beta);
        return Lattice.__wrap(ret);
    }
    /**
    * Run a quantum monte carlo simulation, return the average energy.
    *
    * # Arguments:
    * * `timesteps`: number of timesteps to run.
    *
    * # Returns:
    *  * average energy of system
    * @param {number} timesteps
    * @returns {number}
    */
    run_quantum_monte_carlo(timesteps) {
        var ret = wasm.lattice_run_quantum_monte_carlo(this.ptr, timesteps);
        return ret;
    }
    /**
    * Run only the diagonal parts of a quantum monte carlo simulation.
    *
    * # Arguments:
    * * `timesteps`: number of timesteps to run.
    * @param {number} timesteps
    */
    run_diagonal_quantum_monte_carlo(timesteps) {
        wasm.lattice_run_diagonal_quantum_monte_carlo(this.ptr, timesteps);
    }
    /**
    * Run only the offdiagonal parts of a quantum monte carlo simulation.
    *
    * # Arguments:
    * * `timesteps`: number of timesteps to run.
    * @param {number} timesteps
    */
    run_offdiagonal_quantum_monte_carlo(timesteps) {
        wasm.lattice_run_offdiagonal_quantum_monte_carlo(this.ptr, timesteps);
    }
    /**
    * Run only the rvb parts of a quantum monte carlo simulation.
    *
    * # Arguments:
    * * `timesteps`: number of timesteps to run.
    * @param {number} timesteps
    */
    run_rvb_quantum_monte_carlo(timesteps) {
        wasm.lattice_run_rvb_quantum_monte_carlo(this.ptr, timesteps);
    }
    /**
    * @returns {number}
    */
    get_nvars() {
        var ret = wasm.lattice_get_nvars(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} i
    * @returns {boolean}
    */
    get_state(i) {
        var ret = wasm.lattice_get_state(this.ptr, i);
        return ret !== 0;
    }
    /**
    * @returns {number}
    */
    get_n() {
        var ret = wasm.lattice_get_n(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get_cutoff() {
        var ret = wasm.lattice_get_cutoff(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} n
    * @returns {number}
    */
    get_p_for_n(n) {
        var ret = wasm.lattice_get_p_for_n(this.ptr, n);
        return ret >>> 0;
    }
    /**
    * @param {number} p
    * @returns {number | undefined}
    */
    get_nvars_for_op(p) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lattice_get_nvars_for_op(retptr, this.ptr, p);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} p
    * @param {number} i
    * @returns {number | undefined}
    */
    get_nth_op_var_i(p, i) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lattice_get_nth_op_var_i(retptr, this.ptr, p, i);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} p
    * @param {number} i
    * @returns {boolean | undefined}
    */
    get_nth_op_var_i_input(p, i) {
        var ret = wasm.lattice_get_nth_op_var_i_input(this.ptr, p, i);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {number} p
    * @param {number} i
    * @returns {boolean | undefined}
    */
    get_nth_op_var_i_output(p, i) {
        var ret = wasm.lattice_get_nth_op_var_i_output(this.ptr, p, i);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
}
__exports.Lattice = Lattice;

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        let src;
        if (typeof document === 'undefined') {
            src = location.href;
        } else {
            src = document.currentScript.src;
        }
        input = src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_57e4008f45f0e105 = handleError(function(arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    });
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_randomFillSync_d90848a552cbd666 = handleError(function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    });
    imports.wbg.__wbg_self_f865985e662246aa = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_static_accessor_MODULE_39947eb3fe77895f = function() {
        var ret = module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_c59851dfa0dc7e78 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_crypto_bfb05100db79193b = function(arg0) {
        var ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_f6dddc6ae048b7e2 = function(arg0) {
        var ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_buffer_0be9fb426f2dd82b = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_3a5138f465b971ad = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_4e8d18dbf9cd5240 = function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_4769de301eb521d7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_newwithlength_19241666d161c55f = function(arg0) {
        var ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_b07d46fd5261d77f = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

wasm_bindgen = Object.assign(init, __exports);

})();
