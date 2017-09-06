(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function addEvent(el, eventType, handler) {
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

var applyFactoryMiddleware = (function (ComponentClass, componentInstance, node) {
    if (typeof componentInstance.on === "function") {
        var events = componentInstance.events || ComponentClass.events;
        if (Array.isArray(events)) {
            events.forEach(function (eventType) {
                addEvent(node, eventType, function (ev) {
                    componentInstance.on(eventType, ev);
                });
            });
        }
    }
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var componentCounter = 0;
var components = {};
var componentSelectorMap = {};
var componentInstances = [];

var REF_ATTR = "data-bynd-ref";
var ID_ATTR = "data-bynd-id";

var init = function init() {
    var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    var _loop = function _loop(componentSelector) {
        var ComponentClass = componentSelectorMap[componentSelector];
        var componentId = components[ComponentClass.componentName].id;
        var nodes = [].concat(toConsumableArray(document.querySelectorAll(componentSelector)));

        nodes.forEach(function (node, index) {
            node.setAttribute(REF_ATTR, ComponentClass.componentName);
            node.setAttribute(ID_ATTR, "" + componentId + (index + 1));
            var instance = new ComponentClass(node);
            applyFactoryMiddleware(ComponentClass, instance, node);
            componentInstances.push(instance);
        });
    };

    for (var componentSelector in componentSelectorMap) {
        _loop(componentSelector);
    }

    done();
};

var mount = function mount(ComponentClass) {
    components[ComponentClass.componentName] = {
        name: ComponentClass.componentName,
        selector: ComponentClass.selector,
        id: componentCounter++
    };

    componentSelectorMap[ComponentClass.selector] = ComponentClass;
};

var InputComponent = function () {
    function InputComponent(node) {
        classCallCheck(this, InputComponent);
        this.events = ["focus", "blur"];

        console.log("Register ", node);
    }

    createClass(InputComponent, [{
        key: "on",
        value: function on(type, event) {
            switch (type) {
                case "focus":
                case "blur":
                default:
                    console.log("Listen to %s ", event);
                    break;
            }
        }
    }]);
    return InputComponent;
}();

InputComponent.componentName = "Input";
InputComponent.selector = ".a-input";
mount(InputComponent);

console.log(components);
init();

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9mYWN0b3J5LmpzIiwiL1VzZXJzL2phbmJpYXNpL2dpdGh1Yi9iZXlvbmQtc291bHMtdWkvc3JjL0NvbXBvbmVudC5qcyIsIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9pbnB1dC9pbnB1dC5qcyIsIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWwsIGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICAgIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIC8vIERPTSBMZXZlbCAyIGJyb3dzZXJzXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAvLyBJRSA8PSA4XG4gICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIiArIGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW5jaWVudCBicm93c2Vyc1xuICAgICAgICBlbFtcIm9uXCIgKyBldmVudFR5cGVdID0gaGFuZGxlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChDb21wb25lbnRDbGFzcywgY29tcG9uZW50SW5zdGFuY2UsIG5vZGUpID0+IHtcbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudEluc3RhbmNlLm9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gY29tcG9uZW50SW5zdGFuY2UuZXZlbnRzIHx8IENvbXBvbmVudENsYXNzLmV2ZW50cztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnRzKSkge1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZXZlbnRUeXBlID0+IHtcbiAgICAgICAgICAgICAgICBhZGRFdmVudChub2RlLCBldmVudFR5cGUsIGV2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2Uub24oZXZlbnRUeXBlLCBldik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgYXBwbHlGYWN0b3J5TWlkZGxld2FyZSBmcm9tIFwiLi9mYWN0b3J5XCI7XG5cbmV4cG9ydCBsZXQgY29tcG9uZW50Q291bnRlciA9IDA7XG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IHt9O1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudFNlbGVjdG9yTWFwID0ge307XG5leHBvcnQgY29uc3QgY29tcG9uZW50SW5zdGFuY2VzID0gW107XG5cbmV4cG9ydCBjb25zdCBSRUZfQVRUUiA9IFwiZGF0YS1ieW5kLXJlZlwiO1xuZXhwb3J0IGNvbnN0IElEX0FUVFIgPSBcImRhdGEtYnluZC1pZFwiO1xuXG5leHBvcnQgY29uc3QgaW5pdCA9IChkb25lID0gKCkgPT4ge30pID0+IHtcbiAgICBmb3IgKGxldCBjb21wb25lbnRTZWxlY3RvciBpbiBjb21wb25lbnRTZWxlY3Rvck1hcCkge1xuICAgICAgICBjb25zdCBDb21wb25lbnRDbGFzcyA9IGNvbXBvbmVudFNlbGVjdG9yTWFwW2NvbXBvbmVudFNlbGVjdG9yXTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50SWQgPSBjb21wb25lbnRzW0NvbXBvbmVudENsYXNzLmNvbXBvbmVudE5hbWVdLmlkO1xuICAgICAgICBjb25zdCBub2RlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbXBvbmVudFNlbGVjdG9yKV07XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFJFRl9BVFRSLCBDb21wb25lbnRDbGFzcy5jb21wb25lbnROYW1lKTtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKElEX0FUVFIsIGAke2NvbXBvbmVudElkfSR7aW5kZXggKyAxfWApO1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50Q2xhc3Mobm9kZSk7XG4gICAgICAgICAgICBhcHBseUZhY3RvcnlNaWRkbGV3YXJlKENvbXBvbmVudENsYXNzLCBpbnN0YW5jZSwgbm9kZSk7XG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvbmUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBtb3VudCA9IENvbXBvbmVudENsYXNzID0+IHtcbiAgICBjb21wb25lbnRzW0NvbXBvbmVudENsYXNzLmNvbXBvbmVudE5hbWVdID0ge1xuICAgICAgICBuYW1lOiBDb21wb25lbnRDbGFzcy5jb21wb25lbnROYW1lLFxuICAgICAgICBzZWxlY3RvcjogQ29tcG9uZW50Q2xhc3Muc2VsZWN0b3IsXG4gICAgICAgIGlkOiBjb21wb25lbnRDb3VudGVyKytcbiAgICB9O1xuXG4gICAgY29tcG9uZW50U2VsZWN0b3JNYXBbQ29tcG9uZW50Q2xhc3Muc2VsZWN0b3JdID0gQ29tcG9uZW50Q2xhc3M7XG59O1xuIiwiaW1wb3J0IHsgbW91bnQgfSBmcm9tIFwiLi4vQ29tcG9uZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0Q29tcG9uZW50IHtcbiAgICBzdGF0aWMgY29tcG9uZW50TmFtZSA9IFwiSW5wdXRcIjtcbiAgICBzdGF0aWMgc2VsZWN0b3IgPSBcIi5hLWlucHV0XCI7XG5cbiAgICBldmVudHMgPSBbXCJmb2N1c1wiLCBcImJsdXJcIl07XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgXCIsIG5vZGUpO1xuICAgIH1cblxuICAgIG9uKHR5cGUsIGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxpc3RlbiB0byAlcyBcIiwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb3VudChJbnB1dENvbXBvbmVudCk7XG4iLCJpbXBvcnQgeyBpbml0LCBjb21wb25lbnRzIH0gZnJvbSBcIi4vQ29tcG9uZW50XCI7XG5pbXBvcnQgXCIuL2lucHV0L2lucHV0XCI7XG5cbmNvbnNvbGUubG9nKGNvbXBvbmVudHMpO1xuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImFkZEV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiQ29tcG9uZW50Q2xhc3MiLCJjb21wb25lbnRJbnN0YW5jZSIsIm5vZGUiLCJvbiIsImV2ZW50cyIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJldiIsImNvbXBvbmVudENvdW50ZXIiLCJjb21wb25lbnRzIiwiY29tcG9uZW50U2VsZWN0b3JNYXAiLCJjb21wb25lbnRJbnN0YW5jZXMiLCJSRUZfQVRUUiIsIklEX0FUVFIiLCJpbml0IiwiZG9uZSIsImNvbXBvbmVudFNlbGVjdG9yIiwiY29tcG9uZW50SWQiLCJjb21wb25lbnROYW1lIiwiaWQiLCJub2RlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImluZGV4Iiwic2V0QXR0cmlidXRlIiwiaW5zdGFuY2UiLCJwdXNoIiwibW91bnQiLCJzZWxlY3RvciIsIklucHV0Q29tcG9uZW50IiwibG9nIiwidHlwZSIsImV2ZW50IiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sU0FBU0EsUUFBVCxDQUFrQkMs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