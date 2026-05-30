const memory = new WebAssembly.Memory({ initial: 108 });

/* STRIPPED LOGGING 
   We define these but keep them empty or console-only to prevent HTML clutter.
*/
function readWasmString(offset, length) {
    const bytes = new Uint8Array(memory.buffer, offset, length);
    return new TextDecoder('utf8').decode(bytes);
}

function appendOutput(style) {
    return (offset, length) => {
        // console.log(readWasmString(offset, length)); // Uncomment for debug
    }
}

function getMilliseconds() {
    return performance.now();
}

/* RENDERING */
const canvas = document.getElementById('screen');
const doom_screen_width = 320 * 2;
const doom_screen_height = 200 * 2;

// Ensure canvas internal buffer matches Doom resolution
canvas.width = doom_screen_width;
canvas.height = doom_screen_height;

function drawCanvas(ptr) {
    const doom_screen = new Uint8ClampedArray(memory.buffer, ptr, doom_screen_width * doom_screen_height * 4);
    const render_screen = new ImageData(doom_screen, doom_screen_width, doom_screen_height);
    const ctx = canvas.getContext('2d');
    ctx.putImageData(render_screen, 0, 0);
}

/* WASM IMPORTS */
const importObject = {
    js: {
        js_console_log: appendOutput("log"),
        js_stdout: appendOutput("stdout"),
        js_stderr: appendOutput("stderr"),
        js_milliseconds_since_start: getMilliseconds,
        js_draw_screen: drawCanvas,
    },
    env: {
        memory: memory
    }
};

/* DOOM LOGIC */
WebAssembly.instantiateStreaming(fetch('doom.wasm'), importObject)
    .then(obj => {

    obj.instance.exports.main();

    // Doom Key Constants
    const KEY_LEFT = 0xac;
    const KEY_UP = 0xad;
    const KEY_RIGHT = 0xae;
    const KEY_DOWN = 0xaf;
    const KEY_BACKSPACE = 127;
    const KEY_RCTRL = 0x80 + 0x1d;
    const KEY_RALT = 0x80 + 0x38;
    const KEY_Y = 121; // Lowercase 'y'
    const KEY_N = 110; // Lowercase 'n'

    /* CROSS-BROWSER INPUT MAPPING
       Uses event.key (modern standard) with event.keyCode as fallback.
       event.keyCode is deprecated and unreliable in Edge/Chromium.
    */
    const doomKeyCode = (event) => {
        const key = event.key;

        // Modern event.key mapping (preferred, works reliably in Edge)
        switch (key) {
            case 'ArrowLeft':   return KEY_LEFT;
            case 'ArrowUp':     return KEY_UP;
            case 'ArrowRight':  return KEY_RIGHT;
            case 'ArrowDown':   return KEY_DOWN;

            case ' ':           return KEY_RCTRL;   // Space -> Fire
            case 'Control':     return 32;          // Ctrl -> Use/Open
            case 'Shift':       return KEY_RALT;    // Shift -> Strafe

            case 'Enter':       return 13;
            case 'Backspace':   return KEY_BACKSPACE;
            case 'Escape':      return 27;

            case 'y': case 'Y': return KEY_Y;
            case 'n': case 'N': return KEY_N;
        }

        // Number keys 0–9 for weapon switching
        if (key >= '0' && key <= '9') return key.charCodeAt(0);

        // Fallback to keyCode for any edge cases
        const keyCode = event.keyCode;
        if (keyCode >= 48 && keyCode <= 57) return keyCode; // 0–9

        return 0;
    };

    const keyDown = (keyCode) => { 
        if(keyCode !== 0) obj.instance.exports.add_browser_event(0, keyCode); 
    };
    
    const keyUp = (keyCode) => { 
        if(keyCode !== 0) obj.instance.exports.add_browser_event(1, keyCode); 
    };

    /* Keyboard Listeners */
    window.addEventListener('keydown', (event) => {
        const k = doomKeyCode(event);
        if (k !== 0) {
            keyDown(k);
            event.preventDefault(); // Stop browser scrolling
        }
    }, false);

    window.addEventListener('keyup', (event) => {
        const k = doomKeyCode(event);
        if (k !== 0) {
            keyUp(k);
            event.preventDefault();
        }
    }, false);

    /* Mobile Touch Input */
    const mobileMap = [
        ["btn-up", KEY_UP],
        ["btn-down", KEY_DOWN],
        ["btn-left", KEY_LEFT],
        ["btn-right", KEY_RIGHT],
        ["btn-y", KEY_Y],
        ["btn-n", KEY_N],
        ["btn-enter", 13],
        ["btn-strafe", KEY_RALT],
        ["btn-fire", KEY_RCTRL],
        ["btn-use", 32],
        ["btn-esc", 27],
    ];

    for (const [id, code] of mobileMap) {
        const btn = document.getElementById(id);
        if(btn) {
            // Prevent context menu
            btn.addEventListener("contextmenu", e => { e.preventDefault(); });
            
            btn.addEventListener("touchstart", (e) => {
                e.preventDefault();
                btn.style.backgroundColor = "rgba(255,255,255,0.5)";
                keyDown(code);
            });
            
            btn.addEventListener("touchend", (e) => {
                e.preventDefault();
                btn.style.backgroundColor = "";
                keyUp(code);
            });
        }
    };

    /* Focus Hint */
    // Clicking anywhere on screen focuses the canvas
    window.addEventListener('click', () => canvas.focus());
    canvas.focus();

    /* Notify parent that WASM + game is ready */
    window.parent.postMessage({ type: "doom-ready" }, "*");

    /* Game Loop */
    function step(timestamp) {
        obj.instance.exports.doom_loop_step();
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
});