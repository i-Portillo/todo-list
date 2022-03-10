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

    // addTask(newTask) {
    //     this.tasks.push(newTask);
    // }

    // removeTask(id) {
    //     const taskToDelete =  this.tasks.find(
    //         (task) => task.getId() === id
    //     );
    //     this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
    // }

}

/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "retrieveProjects": () => (/* binding */ retrieveProjects)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");



_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsUpdated', storeProjects);

function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(_controller__WEBPACK_IMPORTED_MODULE_1__.projects));
}

function retrieveProjects() {
    return JSON.parse(localStorage.getItem('projects'));
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
class Task {
    constructor(title, description, dueDate = "No date", priority = 1) {
        this.id = Math.random().toString(16).slice(2);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
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
/* harmony import */ var _domCollector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domCollector */ "./src/modules/domCollector.js");






window.addEventListener('load', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('windowLoad'));

const addProjectBtn = document.getElementById('add-project-btn');
// const addTaskBtn = document.getElementById('add-task-btn');

// const newTaskForm = document.getElementById('newTaskForm');

_domCollector__WEBPACK_IMPORTED_MODULE_3__.addTaskBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addTaskPressed'));
_domCollector__WEBPACK_IMPORTED_MODULE_3__.saveTaskBtn.addEventListener('click', () => {
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('saveTaskPressed');
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('newTaskSaved', [
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.title.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.description.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.dueDate.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.priority.value,
    ]);
});
_domCollector__WEBPACK_IMPORTED_MODULE_3__.cancelTaskBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('cancelTaskPressed'));

_domCollector__WEBPACK_IMPORTED_MODULE_3__.addProjectBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addProjectPressed'));

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('windowLoad', renderFirstLoad);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectTasksUpdated', renderTaskList);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', hideNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', hideNewTaskForm);

let projects = JSON.parse(localStorage.getItem('projects')) || [];

function displayNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskForm.classList.remove('hidden');
    // dom.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    // dom.addTaskBtn.disabled = false;
    //clearNewTaskForm();
};

function clearNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.title.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.description.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.dueDate.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.priority.value = null;
}

function renderFirstLoad() {
    renderProjectList();
    renderTaskList(projects[0].tasks)
}

function renderProjectList() {
    const projectList = document.getElementById('sidebar');
    projects.forEach(project => {
        const newProject = document.createElement('div');
        newProject.classList.add('project');
        newProject.innerHTML = 
            `<p class="project-name">${project.name}</p>
            <ul>
                <li>Today</li>
                <li>This week</li>
                <li>All tasks</li>
            </ul>`;
        projectList.appendChild(newProject);
    });
}

function renderTaskList(tasks) {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.textContent = '';
    tasks.forEach(task => {
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.appendChild(buildTask(task));
    });
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', fadeBackground);

function fadeBackground() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.fullscreenContainer.classList.remove('hidden');
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', clearFadedBackground);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', clearFadedBackground);

function clearFadedBackground() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.fullscreenContainer.classList.add('hidden');
}


    // TODO refactor event listeners, maybe put them somewhere else?
function buildTask(task) {
    const newTask = document.createElement('li');
    // Checkbox
    const taskCheck = document.createElement('input');
    taskCheck.type = 'checkbox';
    taskCheck.checked = task.completed;
    taskCheck.addEventListener('change', () => {
        console.log('check');
        taskTitle.classList.toggle('crossedThrough');
        _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('taskCompleted', task.id);
    });
    newTask.appendChild(taskCheck);
    // Task title
    const taskTitle = document.createElement('p');
    taskTitle.textContent = task.title;
    if (task.completed) taskTitle.classList.add('crossedThrough');
    newTask.appendChild(taskTitle);
    // Delete button
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.type = 'button';
    deleteTaskBtn.textContent = 'Delete';
    deleteTaskBtn.addEventListener('click', () => {
        _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('deleteTaskPressed', task.id);
    });
    newTask.appendChild(deleteTaskBtn);
    return newTask;
}


/***/ }),

/***/ "./src/modules/controller.js":
/*!***********************************!*\
  !*** ./src/modules/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");





// localStorage.clear(); //DEBUG

let projects = JSON.parse(localStorage.getItem('projects')) || [];

if (projects.length === 0) {
    const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]('PFG');
    const task1 = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Do thing', 'Desc1');
    const task2 = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Do Other Thing', 'Desc2');
    newProject.tasks.push(task1);
    newProject.tasks.push(task2);
    projects.push(newProject);

    // console.log(JSON.stringify(projects));

    // console.log(projects);
    console.log(projects[0].tasks[0].title);

    localStorage.setItem('projects', JSON.stringify(projects));

    projects = JSON.parse(localStorage.getItem('projects'));

    // console.log(projects);

    console.log(projects[0].tasks[1].title);

    projects[0].tasks[0].title = 'WTF';

    localStorage.setItem('projects', JSON.stringify(projects));

    projects = JSON.parse(localStorage.getItem('projects'));

    console.log(projects[0].tasks[0].title);

}

let currentProject = projects[0];

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('newTaskSaved', saveNewTask);

function saveNewTask([title, description, dueDate, priority]) {
    const newTask = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"](title, description, dueDate, priority);
    currentProject.tasks.push(newTask);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject.tasks);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated');
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('taskCompleted', setTaskCompleted);

function setTaskCompleted(id) {
    const completedTask = currentProject.tasks.find(task => task.id === id);
    completedTask.completed = !completedTask.completed;
    console.log(currentProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject.tasks);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated');
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('deleteTaskPressed', removeTask);

function removeTask(id) {
    // currentProject.removeTask(id);
    const taskToDelete = currentProject.tasks.find(
        (task) => task.id === id
    );
    currentProject.tasks.splice(currentProject.tasks.indexOf(taskToDelete), 1);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject.tasks);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated');
}

/***/ }),

/***/ "./src/modules/domCollector.js":
/*!*************************************!*\
  !*** ./src/modules/domCollector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectBtn": () => (/* binding */ addProjectBtn),
/* harmony export */   "addTaskBtn": () => (/* binding */ addTaskBtn),
/* harmony export */   "cancelTaskBtn": () => (/* binding */ cancelTaskBtn),
/* harmony export */   "fullscreenContainer": () => (/* binding */ fullscreenContainer),
/* harmony export */   "newTaskFields": () => (/* binding */ newTaskFields),
/* harmony export */   "newTaskForm": () => (/* binding */ newTaskForm),
/* harmony export */   "saveTaskBtn": () => (/* binding */ saveTaskBtn),
/* harmony export */   "taskList": () => (/* binding */ taskList)
/* harmony export */ });
const addTaskBtn = document.getElementById('addTaskBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');

const newTaskForm = document.getElementById('newTaskForm');
const newTaskFields = {
    title: document.getElementById('newTaskTitle'),
    description: document.getElementById('newTaskDescription'),
    dueDate: document.getElementById('newTaskDueDate'),
    priority: document.getElementById('newTaskPriority'),
};

const taskList = document.getElementById('taskList');

const addProjectBtn = document.getElementById('addProjectBtn');

const fullscreenContainer = document.querySelector('.fullscreenContainer');

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
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_Storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Storage */ "./src/modules/Storage.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7VUM1QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ1A7QUFDSyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tQ29sbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL1Rhc2snO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICAvLyAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIC8vIH1cblxuICAgIC8vIHJlbW92ZVRhc2soaWQpIHtcbiAgICAvLyAgICAgY29uc3QgdGFza1RvRGVsZXRlID0gIHRoaXMudGFza3MuZmluZChcbiAgICAvLyAgICAgICAgICh0YXNrKSA9PiB0YXNrLmdldElkKCkgPT09IGlkXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuaW5kZXhPZih0YXNrVG9EZWxldGUpLCAxKTtcbiAgICAvLyB9XG5cbn0iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCdwcm9qZWN0c1VwZGF0ZWQnLCBzdG9yZVByb2plY3RzKTtcblxuZnVuY3Rpb24gc3RvcmVQcm9qZWN0cygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUgPSBcIk5vIGRhdGVcIiwgcHJpb3JpdHkgPSAxKSB7XG4gICAgICAgIHRoaXMuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zbGljZSgyKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb21Db2xsZWN0b3InO1xuaW1wb3J0IHsgZGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCd3aW5kb3dMb2FkJykpO1xuXG5jb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWJ0bicpO1xuLy8gY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1idG4nKTtcblxuLy8gY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza0Zvcm0nKTtcblxuZG9tLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnYWRkVGFza1ByZXNzZWQnKSk7XG5kb20uc2F2ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3NhdmVUYXNrUHJlc3NlZCcpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCduZXdUYXNrU2F2ZWQnLCBbXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLnRpdGxlLnZhbHVlLFxuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy5kZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMuZHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMucHJpb3JpdHkudmFsdWUsXG4gICAgXSk7XG59KTtcbmRvbS5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2NhbmNlbFRhc2tQcmVzc2VkJykpO1xuXG5kb20uYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRQcm9qZWN0UHJlc3NlZCcpKTtcblxucHViU3ViLnN1YnNjcmliZSgnd2luZG93TG9hZCcsIHJlbmRlckZpcnN0TG9hZCk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCByZW5kZXJUYXNrTGlzdCk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZGlzcGxheU5ld1Rhc2tGb3JtKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5cbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xuXG5mdW5jdGlvbiBkaXNwbGF5TmV3VGFza0Zvcm0oKSB7XG4gICAgZG9tLm5ld1Rhc2tGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIC8vIGRvbS5hZGRUYXNrQnRuLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGhpZGVOZXdUYXNrRm9ybSgpIHtcbiAgICBuZXdUYXNrRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAvLyBkb20uYWRkVGFza0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIC8vY2xlYXJOZXdUYXNrRm9ybSgpO1xufTtcblxuZnVuY3Rpb24gY2xlYXJOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy50aXRsZS52YWx1ZSA9IG51bGw7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMuZGVzY3JpcHRpb24udmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLmR1ZURhdGUudmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLnByaW9yaXR5LnZhbHVlID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRmlyc3RMb2FkKCkge1xuICAgIHJlbmRlclByb2plY3RMaXN0KCk7XG4gICAgcmVuZGVyVGFza0xpc3QocHJvamVjdHNbMF0udGFza3MpXG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1Byb2plY3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBuZXdQcm9qZWN0LmlubmVySFRNTCA9IFxuICAgICAgICAgICAgYDxwIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9wPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaT5Ub2RheTwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlRoaXMgd2VlazwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkFsbCB0YXNrczwvbGk+XG4gICAgICAgICAgICA8L3VsPmA7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKG5ld1Byb2plY3QpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrTGlzdCh0YXNrcykge1xuICAgIGRvbS50YXNrTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGRvbS50YXNrTGlzdC5hcHBlbmRDaGlsZChidWlsZFRhc2sodGFzaykpO1xuICAgIH0pO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrUHJlc3NlZCcsIGZhZGVCYWNrZ3JvdW5kKTtcblxuZnVuY3Rpb24gZmFkZUJhY2tncm91bmQoKSB7XG4gICAgZG9tLmZ1bGxzY3JlZW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVUYXNrUHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2NhbmNlbFRhc2tQcmVzc2VkJywgY2xlYXJGYWRlZEJhY2tncm91bmQpO1xuXG5mdW5jdGlvbiBjbGVhckZhZGVkQmFja2dyb3VuZCgpIHtcbiAgICBkb20uZnVsbHNjcmVlbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuXG4gICAgLy8gVE9ETyByZWZhY3RvciBldmVudCBsaXN0ZW5lcnMsIG1heWJlIHB1dCB0aGVtIHNvbWV3aGVyZSBlbHNlP1xuZnVuY3Rpb24gYnVpbGRUYXNrKHRhc2spIHtcbiAgICBjb25zdCBuZXdUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAvLyBDaGVja2JveFxuICAgIGNvbnN0IHRhc2tDaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGFza0NoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIHRhc2tDaGVjay5jaGVja2VkID0gdGFzay5jb21wbGV0ZWQ7XG4gICAgdGFza0NoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrJyk7XG4gICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QudG9nZ2xlKCdjcm9zc2VkVGhyb3VnaCcpO1xuICAgICAgICBwdWJTdWIucHVibGlzaCgndGFza0NvbXBsZXRlZCcsIHRhc2suaWQpO1xuICAgIH0pO1xuICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQodGFza0NoZWNrKTtcbiAgICAvLyBUYXNrIHRpdGxlXG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgnY3Jvc3NlZFRocm91Z2gnKTtcbiAgICBuZXdUYXNrLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG4gICAgLy8gRGVsZXRlIGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkZWxldGVUYXNrQnRuLnR5cGUgPSAnYnV0dG9uJztcbiAgICBkZWxldGVUYXNrQnRuLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG4gICAgZGVsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ2RlbGV0ZVRhc2tQcmVzc2VkJywgdGFzay5pZCk7XG4gICAgfSk7XG4gICAgbmV3VGFzay5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKTtcbiAgICByZXR1cm4gbmV3VGFzaztcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcblxuXG4vLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTsgLy9ERUJVR1xuXG5leHBvcnQgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG5cbmlmIChwcm9qZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoJ1BGRycpO1xuICAgIGNvbnN0IHRhc2sxID0gbmV3IFRhc2soJ0RvIHRoaW5nJywgJ0Rlc2MxJyk7XG4gICAgY29uc3QgdGFzazIgPSBuZXcgVGFzaygnRG8gT3RoZXIgVGhpbmcnLCAnRGVzYzInKTtcbiAgICBuZXdQcm9qZWN0LnRhc2tzLnB1c2godGFzazEpO1xuICAgIG5ld1Byb2plY3QudGFza3MucHVzaCh0YXNrMik7XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3NbMF0udGl0bGUpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1swXS50YXNrc1sxXS50aXRsZSk7XG5cbiAgICBwcm9qZWN0c1swXS50YXNrc1swXS50aXRsZSA9ICdXVEYnO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1swXS50YXNrc1swXS50aXRsZSk7XG5cbn1cblxubGV0IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbMF07XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2tTYXZlZCcsIHNhdmVOZXdUYXNrKTtcblxuZnVuY3Rpb24gc2F2ZU5ld1Rhc2soW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIGN1cnJlbnRQcm9qZWN0LnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCBjdXJyZW50UHJvamVjdC50YXNrcyk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RzVXBkYXRlZCcpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCd0YXNrQ29tcGxldGVkJywgc2V0VGFza0NvbXBsZXRlZCk7XG5cbmZ1bmN0aW9uIHNldFRhc2tDb21wbGV0ZWQoaWQpIHtcbiAgICBjb25zdCBjb21wbGV0ZWRUYXNrID0gY3VycmVudFByb2plY3QudGFza3MuZmluZCh0YXNrID0+IHRhc2suaWQgPT09IGlkKTtcbiAgICBjb21wbGV0ZWRUYXNrLmNvbXBsZXRlZCA9ICFjb21wbGV0ZWRUYXNrLmNvbXBsZXRlZDtcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdCk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCBjdXJyZW50UHJvamVjdC50YXNrcyk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RzVXBkYXRlZCcpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdkZWxldGVUYXNrUHJlc3NlZCcsIHJlbW92ZVRhc2spO1xuXG5mdW5jdGlvbiByZW1vdmVUYXNrKGlkKSB7XG4gICAgLy8gY3VycmVudFByb2plY3QucmVtb3ZlVGFzayhpZCk7XG4gICAgY29uc3QgdGFza1RvRGVsZXRlID0gY3VycmVudFByb2plY3QudGFza3MuZmluZChcbiAgICAgICAgKHRhc2spID0+IHRhc2suaWQgPT09IGlkXG4gICAgKTtcbiAgICBjdXJyZW50UHJvamVjdC50YXNrcy5zcGxpY2UoY3VycmVudFByb2plY3QudGFza3MuaW5kZXhPZih0YXNrVG9EZWxldGUpLCAxKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdFRhc2tzVXBkYXRlZCcsIGN1cnJlbnRQcm9qZWN0LnRhc2tzKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJyk7XG59IiwiZXhwb3J0IGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J0bicpO1xuZXhwb3J0IGNvbnN0IHNhdmVUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVUYXNrQnRuJyk7XG5leHBvcnQgY29uc3QgY2FuY2VsVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWxUYXNrQnRuJyk7XG5cbmV4cG9ydCBjb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrRm9ybScpO1xuZXhwb3J0IGNvbnN0IG5ld1Rhc2tGaWVsZHMgPSB7XG4gICAgdGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrVGl0bGUnKSxcbiAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tEZXNjcmlwdGlvbicpLFxuICAgIGR1ZURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrRHVlRGF0ZScpLFxuICAgIHByaW9yaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza1ByaW9yaXR5JyksXG59O1xuXG5leHBvcnQgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0xpc3QnKTtcblxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ0bicpO1xuXG5leHBvcnQgY29uc3QgZnVsbHNjcmVlbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsc2NyZWVuQ29udGFpbmVyJyk7IiwiZXhwb3J0IGNvbnN0IGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBldmVudHMgPSB7fTtcblxuICAgIGNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1B1Ymxpc2hlZCcsIGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0uZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgfVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50XSA9IGV2ZW50c1tldmVudF0uZmlsdGVyKChmdW5jKSA9PiBmdW5jICE9IGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2gsXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICAgICAgdW5zdWJzY3JpYmUsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlcidcbmltcG9ydCAnLi9tb2R1bGVzL1VJJztcbmltcG9ydCAnLi9tb2R1bGVzL1N0b3JhZ2UnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9