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

export const classListToSelector = classes => `.${classes.split(" ").join(".")}`;

export default (ComponentClass, componentInstance, node) => {
    if (typeof componentInstance.on === "function") {
        const events = componentInstance.events || ComponentClass.events;
        const delegate = node.getAttribute("data-bynd-delegate");

        if (delegate) {
            node = node.querySelector(delegate);
            if (node) {
                node.setAttribute("data-bynd-parent-ev-ref", classListToSelector(node.className));
            }
        }

        if (node && Array.isArray(events)) {
            console.log(node);
            events.forEach(eventType => {
                addEvent(node, eventType, ev => {
                    componentInstance.on(eventType, ev, {
                        delegate: !!delegate
                    });
                });
            });
        }
    }
};
