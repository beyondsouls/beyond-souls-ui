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

var classListToSelector = function classListToSelector(classes) {
    return "." + classes.split(" ").join(".");
};

var applyFactoryMiddleware = (function (ComponentClass, componentInstance, node) {
    if (typeof componentInstance.on === "function") {
        var events = componentInstance.events || ComponentClass.events;
        var delegate = node.getAttribute("data-bynd-delegate");

        if (delegate) {
            node = node.querySelector(delegate);
            if (node) {
                node.setAttribute("data-bynd-parent-ev-ref", classListToSelector(node.className));
            }
        }

        if (node && Array.isArray(events)) {
            console.log(node);
            events.forEach(function (eventType) {
                addEvent(node, eventType, function (ev) {
                    componentInstance.on(eventType, ev, {
                        delegate: !!delegate
                    });
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
        this.events = ["focus", "blur", "click"];

        console.log("Register ", node);
    }

    createClass(InputComponent, [{
        key: "on",
        value: function on(type, event, opts) {
            switch (type) {
                case "focus":
                case "blur":
                case "click":
                default:
                    console.log("Listen to %s %s", type, opts.delegate ? "(delegated)" : "", event);
                    break;
            }
        }
    }]);
    return InputComponent;
}();

InputComponent.componentName = "Input";
InputComponent.selector = ".js-a-input";
mount(InputComponent);

console.log(components);
init();

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9mYWN0b3J5LmpzIiwiL1VzZXJzL2phbmJpYXNpL2dpdGh1Yi9iZXlvbmQtc291bHMtdWkvc3JjL0NvbXBvbmVudC5qcyIsIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9pbnB1dC9pbnB1dC5qcyIsIi9Vc2Vycy9qYW5iaWFzaS9naXRodWIvYmV5b25kLXNvdWxzLXVpL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWwsIGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICAgIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIC8vIERPTSBMZXZlbCAyIGJyb3dzZXJzXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAvLyBJRSA8PSA4XG4gICAgICAgIGVsLmF0dGFjaEV2ZW50KFwib25cIiArIGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYW5jaWVudCBicm93c2Vyc1xuICAgICAgICBlbFtcIm9uXCIgKyBldmVudFR5cGVdID0gaGFuZGxlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RUb1NlbGVjdG9yID0gY2xhc3NlcyA9PiBgLiR7Y2xhc3Nlcy5zcGxpdChcIiBcIikuam9pbihcIi5cIil9YDtcblxuZXhwb3J0IGRlZmF1bHQgKENvbXBvbmVudENsYXNzLCBjb21wb25lbnRJbnN0YW5jZSwgbm9kZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgY29tcG9uZW50SW5zdGFuY2Uub24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb25zdCBldmVudHMgPSBjb21wb25lbnRJbnN0YW5jZS5ldmVudHMgfHwgQ29tcG9uZW50Q2xhc3MuZXZlbnRzO1xuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IG5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1ieW5kLWRlbGVnYXRlXCIpO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihkZWxlZ2F0ZSk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiZGF0YS1ieW5kLXBhcmVudC1ldi1yZWZcIiwgY2xhc3NMaXN0VG9TZWxlY3Rvcihub2RlLmNsYXNzTmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgQXJyYXkuaXNBcnJheShldmVudHMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkRXZlbnQobm9kZSwgZXZlbnRUeXBlLCBldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLm9uKGV2ZW50VHlwZSwgZXYsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlOiAhIWRlbGVnYXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IGFwcGx5RmFjdG9yeU1pZGRsZXdhcmUgZnJvbSBcIi4vZmFjdG9yeVwiO1xuXG5leHBvcnQgbGV0IGNvbXBvbmVudENvdW50ZXIgPSAwO1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSB7fTtcbmV4cG9ydCBjb25zdCBjb21wb25lbnRTZWxlY3Rvck1hcCA9IHt9O1xuZXhwb3J0IGNvbnN0IGNvbXBvbmVudEluc3RhbmNlcyA9IFtdO1xuXG5leHBvcnQgY29uc3QgUkVGX0FUVFIgPSBcImRhdGEtYnluZC1yZWZcIjtcbmV4cG9ydCBjb25zdCBJRF9BVFRSID0gXCJkYXRhLWJ5bmQtaWRcIjtcblxuZXhwb3J0IGNvbnN0IGluaXQgPSAoZG9uZSA9ICgpID0+IHt9KSA9PiB7XG4gICAgZm9yIChsZXQgY29tcG9uZW50U2VsZWN0b3IgaW4gY29tcG9uZW50U2VsZWN0b3JNYXApIHtcbiAgICAgICAgY29uc3QgQ29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRTZWxlY3Rvck1hcFtjb21wb25lbnRTZWxlY3Rvcl07XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudElkID0gY29tcG9uZW50c1tDb21wb25lbnRDbGFzcy5jb21wb25lbnROYW1lXS5pZDtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb21wb25lbnRTZWxlY3RvcildO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShSRUZfQVRUUiwgQ29tcG9uZW50Q2xhc3MuY29tcG9uZW50TmFtZSk7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShJRF9BVFRSLCBgJHtjb21wb25lbnRJZH0ke2luZGV4ICsgMX1gKTtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbXBvbmVudENsYXNzKG5vZGUpO1xuICAgICAgICAgICAgYXBwbHlGYWN0b3J5TWlkZGxld2FyZShDb21wb25lbnRDbGFzcywgaW5zdGFuY2UsIG5vZGUpO1xuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb25lKCk7XG59O1xuXG5leHBvcnQgY29uc3QgbW91bnQgPSBDb21wb25lbnRDbGFzcyA9PiB7XG4gICAgY29tcG9uZW50c1tDb21wb25lbnRDbGFzcy5jb21wb25lbnROYW1lXSA9IHtcbiAgICAgICAgbmFtZTogQ29tcG9uZW50Q2xhc3MuY29tcG9uZW50TmFtZSxcbiAgICAgICAgc2VsZWN0b3I6IENvbXBvbmVudENsYXNzLnNlbGVjdG9yLFxuICAgICAgICBpZDogY29tcG9uZW50Q291bnRlcisrXG4gICAgfTtcblxuICAgIGNvbXBvbmVudFNlbGVjdG9yTWFwW0NvbXBvbmVudENsYXNzLnNlbGVjdG9yXSA9IENvbXBvbmVudENsYXNzO1xufTtcbiIsImltcG9ydCB7IG1vdW50IH0gZnJvbSBcIi4uL0NvbXBvbmVudFwiO1xuaW1wb3J0IHsgYWRkRXZlbnQgfSBmcm9tIFwiLi4vZmFjdG9yeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIGNvbXBvbmVudE5hbWUgPSBcIklucHV0XCI7XG4gICAgc3RhdGljIHNlbGVjdG9yID0gXCIuanMtYS1pbnB1dFwiO1xuXG4gICAgZXZlbnRzID0gW1wiZm9jdXNcIiwgXCJibHVyXCIsIFwiY2xpY2tcIl07XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgXCIsIG5vZGUpO1xuICAgIH1cblxuICAgIG9uKHR5cGUsIGV2ZW50LCBvcHRzKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImZvY3VzXCI6XG4gICAgICAgICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICAgICAgY2FzZSBcImNsaWNrXCI6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGlzdGVuIHRvICVzICVzXCIsIHR5cGUsIG9wdHMuZGVsZWdhdGUgPyBcIihkZWxlZ2F0ZWQpXCIgOiBcIlwiLCBldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vdW50KElucHV0Q29tcG9uZW50KTtcbiIsImltcG9ydCB7IGluaXQsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9Db21wb25lbnRcIjtcbmltcG9ydCBcIi4vaW5wdXQvaW5wdXRcIjtcblxuY29uc29sZS5sb2coY29tcG9uZW50cyk7XG5pbml0KCk7XG4iXSwibmFtZXMiOlsiYWRkRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJjbGFzc0xpc3RUb1NlbGVjdG9yIiwiY2xhc3NlcyIsInNwbGl0Iiwiam9pbiIsIkNvbXBvbmVudENsYXNzIiwiY29tcG9uZW50SW5zdGFuY2UiLCJub2RlIiwib24iLCJldmVudHMiLCJkZWxlZ2F0ZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc05hbWUiLCJBcnJheSIsImlzQXJyYXkiLCJsb2ciLCJmb3JFYWNoIiwiZXYiLCJjb21wb25lbnRDb3VudGVyIiwiY29tcG9uZW50cyIsImNvbXBvbmVudFNlbGVjdG9yTWFwIiwiY29tcG9uZW50SW5zdGFuY2VzIiwiUkVGX0FUVFIiLCJJRF9BVFRSIiwiaW5pdCIsImRvbmUiLCJjb21wb25lbnRTZWxlY3RvciIsImNvbXBvbmVudElkIiwiY29tcG9uZW50TmFtZSIsImlkIiwibm9kZXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmRleCIsImluc3RhbmNlIiwicHVzaCIsIm1vdW50Iiwic2VsZWN0b3IiLCJJbnB1dENvbXBvbmVudCIsInR5cGUiLCJldmVudCIsIm9wdHMiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxTQUFTQSxRQUFULENBQWtCQyxFQUFsQixFQUFzQkMsU0FBdEIsRUFBaUNDLE9BQWpDLEVBQTBDO1FBQ3pDRixHQUFHRyxnQkFBUCxFQUF5Qjs7V0FFbEJBLGdCQUFILENBQW9CRixTQUFwQixFQUErQkMsT0FBL0IsRUFBd0MsS0FBeEM7S0FGSixNQUdPLElBQUlGLEdBQUdJLFdBQVAsRUFBb0I7O1dB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