import applyFactoryMiddleware from "./factory";

export let componentCounter = 0;
export const components = {};
export const componentSelectorMap = {};
export const componentInstances = [];

export const REF_ATTR = "data-bynd-ref";
export const ID_ATTR = "data-bynd-id";

export const init = (done = () => {}) => {
    for (let componentSelector in componentSelectorMap) {
        const ComponentClass = componentSelectorMap[componentSelector];
        const componentId = components[ComponentClass.componentName].id;
        const nodes = [...document.querySelectorAll(componentSelector)];

        nodes.forEach((node, index) => {
            node.setAttribute(REF_ATTR, ComponentClass.componentName);
            node.setAttribute(ID_ATTR, `${componentId}${index + 1}`);
            const instance = new ComponentClass(node);
            applyFactoryMiddleware(ComponentClass, instance, node);
            componentInstances.push(instance);
        });
    }

    done();
};

export const mount = ComponentClass => {
    components[ComponentClass.componentName] = {
        name: ComponentClass.componentName,
        selector: ComponentClass.selector,
        id: componentCounter++
    };

    componentSelectorMap[ComponentClass.selector] = ComponentClass;
};
