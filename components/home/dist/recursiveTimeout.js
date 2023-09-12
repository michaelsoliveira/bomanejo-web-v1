"use strict";
exports.__esModule = true;
var react_1 = require("react");
function RecursiveTimeout(callback, delay) {
    // we use this state to check if our carousel in running or not
    var _a = react_1.useState(false), isRunning = _a[0], setIsRunning = _a[1];
    // we will use stop and play methods as a way to control our
    // carousel's animation states to start and stop animating it.
    var stop = react_1.useCallback(function () { return setIsRunning(false); }, [setIsRunning]);
    var play = react_1.useCallback(function () { return setIsRunning(true); }, [setIsRunning]);
    var savedCallback = react_1.useRef(callback);
    react_1.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    react_1.useEffect(function () {
        if (!isRunning)
            return;
        var id = 0;
        function tick() {
            // if our carousel is not running then use the clearTimeout()
            // method to cancel the setTimeout() method we might have used.
            if (!isRunning)
                return clearTimeout(id);
            savedCallback.current();
            requestAnimationFrame(function () {
                id = setTimeout(tick, delay);
            });
        }
        // else start an animation with a timeout delay of { delay }
        requestAnimationFrame(function () { return (id = setTimeout(tick, delay)); });
        return function () {
            if (id)
                clearTimeout(id);
            stop();
        };
    }, [isRunning, delay, stop]);
    // return our play or stop method which we can call from
    // our parent element.
    return { play: play, delay: delay, stop: stop };
}
exports["default"] = RecursiveTimeout;
