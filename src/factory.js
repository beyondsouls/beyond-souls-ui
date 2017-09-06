export function addEvent(el, eventType, handler) {
    if (el.addEventListener) {
        // DOM Level 2 browsers
        el.addEventListener(eventType, handler, false);
    } else if (el.attachEvent) {
        // IE <= 8
        el.attachEvent("on" + eventType, handler);
    } else {
        // ancient browsers
        el["on" + eventType] = handler;
    }
}

export default (ComponentClass, componentInstance, node) => {
    if (typeof componentInstance.on === "function") {
        const events = componentInstance.events || ComponentClass.events;
        if (Array.isArray(events)) {
            events.forEach(eventType => {
                addEvent(node, eventType, ev => {
                    componentInstance.on(eventType, ev);
                });
            });
        }
    }
};
