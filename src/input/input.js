import { mount } from "../Component";

export default class InputComponent {
    static componentName = "Input";
    static selector = ".a-input";

    events = ["focus", "blur"];

    constructor(node) {
        console.log("Register ", node);
    }

    on(type, event) {
        switch (type) {
            case "focus":
            case "blur":
            default:
                console.log("Listen to %s ", event);
                break;
        }
    }
}

mount(InputComponent);
