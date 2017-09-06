import { mount } from "../Component";
import { addEvent } from "../factory";

export default class InputComponent {
    static componentName = "Input";
    static selector = ".js-a-input";

    events = ["focus", "blur", "click"];

    constructor(node) {
        console.log("Register ", node);
    }

    on(type, event, opts) {
        switch (type) {
            case "focus":
            case "blur":
            case "click":
            default:
                console.log("Listen to %s %s", type, opts.delegate ? "(delegated)" : "", event);
                break;
        }
    }
}

mount(InputComponent);
