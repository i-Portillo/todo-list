/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");



class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        console.log("Setting project name.")
        if (newName) {
            this._name = newName;
        }
    }

    addTask() {
        this.tasks.push(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Do thing'));
    }

    removeTask(id) {
        const taskToDelete =  this.tasks.find(
            (task) => task.getId() === id
        );
        this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
    }

}

/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");


class Task {
    constructor(title, description, dueDate = "No date", priority = 1) {
        this._id = Math.random().toString(16).slice(2);
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = false;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (value) {
            this._title = value;
        }
    }

    get description() {
        return this._description;
    }

    set description(value)  {
        if (value) {
            this._description = value;
        }
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        if (value) {
            this._dueDate = value;
        }
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if(Number.isInteger(value) && (value >= 1 && value <= 5)) {
            this._priority = value;
        }
    }

    get completed() {
        return this._completed;
    };

    set completed(value) {
        if (value !== null) {
            this._completed = value;
        }
    }

}



/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");




const addProjectBtn = document.getElementById('add-project-btn');
const addTaskBtn = document.getElementById('add-task-btn');

const newTaskForm = document.getElementById('new-task-box');

addTaskBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addTaskPressed'));
// addProjectBtn.addEventListener('click', () => pubSub.publish('addProjectPressed'));

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);

function displayNewTaskForm() {
    newTaskForm.classList.remove('hidden');
    _events__WEBPACK_IMPORTED_MODULE_0__.events.unsubscribe('addTaskPressed', displayNewTaskForm);
    _events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', hideNewTaskForm);
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    _events__WEBPACK_IMPORTED_MODULE_0__.events.unsubscribe('addTaskPressed', hideNewTaskForm);
    _events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);
};


/***/ }),

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");




let projects = [];
projects.push(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]('PFG'));
projects.push(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]('Todo-list'));

projects[0].addTask(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Start', 'Today'));
projects[0].addTask(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Make some progress', 'Tomorrow'));

projects[1].addTask(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Make it'));

localStorage.setItem('projects',
    JSON.stringify(projects)
);

/***/ }),

/***/ "./src/modules/events.js":
/*!*******************************!*\
  !*** ./src/modules/events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => (/* binding */ events)
/* harmony export */ });
const events = (function () {

    const events = {};

    const publish = function (event, data) {
        console.log('Published', event);
        if (events[event]) {
            events[event].forEach(handler => handler(data));
        }
    }

    const subscribe = function (event, handler) {
        events[event] = events[event] || [];
        events[event].push(handler);
    }

    const unsubscribe = function (event, handler) {
        if (event in events) {
            events[event] = events[event].filter((func) => func != handler);
        }
    };

    return {
        publish,
        subscribe,
        unsubscribe,
    }

})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Project */ "./src/modules/Project.js");
/* harmony import */ var _modules_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Task */ "./src/modules/Task.js");
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/events */ "./src/modules/events.js");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");






let projects = [];

projects.push(new _modules_Project__WEBPACK_IMPORTED_MODULE_0__["default"]('PFG'));
_modules_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('addTaskPressed', addTaskToProject);

function addTaskToProject(task) {
    projects[0].addTask(task);
    console.log(projects[0].tasks.length);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ2xCOztBQUVYO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qiw2Q0FBSTtBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQy9CNEM7O0FBRTdCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRTRDO0FBQ1o7QUFDTjs7QUFFMUI7QUFDQTs7QUFFQTs7QUFFQSwyQ0FBMkMsbURBQWM7QUFDekQ7O0FBRUEscURBQWdCOztBQUVoQjtBQUNBO0FBQ0EsSUFBSSx1REFBa0I7QUFDdEIsSUFBSSxxREFBZ0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBLElBQUksdURBQWtCO0FBQ3RCLElBQUkscURBQWdCO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7QUN4QmdDO0FBQ047QUFDa0I7O0FBRTVDO0FBQ0Esa0JBQWtCLGdEQUFPO0FBQ3pCLGtCQUFrQixnREFBTzs7QUFFekIsd0JBQXdCLDZDQUFJO0FBQzVCLHdCQUF3Qiw2Q0FBSTs7QUFFNUIsd0JBQXdCLDZDQUFJOztBQUU1QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDZk87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7VUM1QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDTjtBQUNpQjtBQUM3QjtBQUNPOztBQUU3Qjs7QUFFQSxrQkFBa0Isd0RBQU87QUFDekIsNkRBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cblxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZShuZXdOYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBwcm9qZWN0IG5hbWUuXCIpXG4gICAgICAgIGlmIChuZXdOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmV3TmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFRhc2soKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaChuZXcgVGFzaygnRG8gdGhpbmcnKSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayhpZCkge1xuICAgICAgICBjb25zdCB0YXNrVG9EZWxldGUgPSAgdGhpcy50YXNrcy5maW5kKFxuICAgICAgICAgICAgKHRhc2spID0+IHRhc2suZ2V0SWQoKSA9PT0gaWRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5pbmRleE9mKHRhc2tUb0RlbGV0ZSksIDEpO1xuICAgIH1cblxufSIsImltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSA9IFwiTm8gZGF0ZVwiLCBwcmlvcml0eSA9IDEpIHtcbiAgICAgICAgdGhpcy5faWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zbGljZSgyKTtcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5fZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICAgIH1cblxuICAgIHNldCB0aXRsZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgZGVzY3JpcHRpb24odmFsdWUpICB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgZHVlRGF0ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1ZURhdGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByaW9yaXR5O1xuICAgIH1cblxuICAgIHNldCBwcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBpZihOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSAmJiAodmFsdWUgPj0gMSAmJiB2YWx1ZSA8PSA1KSkge1xuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjb21wbGV0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZWQ7XG4gICAgfTtcblxuICAgIHNldCBjb21wbGV0ZWQodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5cbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnRuJyk7XG5jb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ0bicpO1xuXG5jb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1ib3gnKTtcblxuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRUYXNrUHJlc3NlZCcpKTtcbi8vIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnYWRkUHJvamVjdFByZXNzZWQnKSk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZGlzcGxheU5ld1Rhc2tGb3JtKTtcblxuZnVuY3Rpb24gZGlzcGxheU5ld1Rhc2tGb3JtKCkge1xuICAgIG5ld1Rhc2tGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHB1YlN1Yi51bnN1YnNjcmliZSgnYWRkVGFza1ByZXNzZWQnLCBkaXNwbGF5TmV3VGFza0Zvcm0pO1xuICAgIHB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgaGlkZU5ld1Rhc2tGb3JtKTtcbn07XG5cbmZ1bmN0aW9uIGhpZGVOZXdUYXNrRm9ybSgpIHtcbiAgICBuZXdUYXNrRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBwdWJTdWIudW5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgaGlkZU5ld1Rhc2tGb3JtKTtcbiAgICBwdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrUHJlc3NlZCcsIGRpc3BsYXlOZXdUYXNrRm9ybSk7XG59O1xuIiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuXG5sZXQgcHJvamVjdHMgPSBbXTtcbnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ1BGRycpKTtcbnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ1RvZG8tbGlzdCcpKTtcblxucHJvamVjdHNbMF0uYWRkVGFzayhuZXcgVGFzaygnU3RhcnQnLCAnVG9kYXknKSk7XG5wcm9qZWN0c1swXS5hZGRUYXNrKG5ldyBUYXNrKCdNYWtlIHNvbWUgcHJvZ3Jlc3MnLCAnVG9tb3Jyb3cnKSk7XG5cbnByb2plY3RzWzFdLmFkZFRhc2sobmV3IFRhc2soJ01ha2UgaXQnKSk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsXG4gICAgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpXG4pOyIsImV4cG9ydCBjb25zdCBldmVudHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgICBjb25zdCBwdWJsaXNoID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQdWJsaXNoZWQnLCBldmVudCk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnRdLmZvckVhY2goaGFuZGxlciA9PiBoYW5kbGVyKGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcikge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudCBpbiBldmVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdLmZpbHRlcigoZnVuYykgPT4gZnVuYyAhPSBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwdWJsaXNoLFxuICAgICAgICBzdWJzY3JpYmUsXG4gICAgICAgIHVuc3Vic2NyaWJlLFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vbW9kdWxlcy9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vbW9kdWxlcy9UYXNrJztcbmltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL21vZHVsZXMvZXZlbnRzJ1xuaW1wb3J0ICcuL21vZHVsZXMvVUknO1xuaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlcidcblxubGV0IHByb2plY3RzID0gW107XG5cbnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ1BGRycpKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgYWRkVGFza1RvUHJvamVjdCk7XG5cbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QodGFzaykge1xuICAgIHByb2plY3RzWzBdLmFkZFRhc2sodGFzayk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3MubGVuZ3RoKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=