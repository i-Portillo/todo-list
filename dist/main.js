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



// TODO revamp module so it can compose Objects with functions and 
// avoid storing and retrieving all the projects.

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsUpdated', storeProjects);

function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(_controller__WEBPACK_IMPORTED_MODULE_1__.projects));
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('projectsStored');
}

function retrieveProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
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
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Storage */ "./src/modules/Storage.js");





// import { de } from 'date-fns/locale';

window.addEventListener('load', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('windowLoad'));

_domCollector__WEBPACK_IMPORTED_MODULE_3__.addProjectBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addProjectPressed'));

_domCollector__WEBPACK_IMPORTED_MODULE_3__.addTaskBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addTaskPressed'));
_domCollector__WEBPACK_IMPORTED_MODULE_3__.saveTaskBtn.addEventListener('click', () => {
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('newTaskSaved', [
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.title.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.description.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.dueDate.value,
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.priority.value,
    ]);
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('saveTaskPressed');
});
_domCollector__WEBPACK_IMPORTED_MODULE_3__.cancelTaskBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('cancelTaskPressed'));

_domCollector__WEBPACK_IMPORTED_MODULE_3__.addProjectBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('addProjectPressed'));
_domCollector__WEBPACK_IMPORTED_MODULE_3__.saveProjectBtn.addEventListener('click', () => {
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('newProjectSaved', [
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.newProjectFields.name.value,
    ]);
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('saveProjectPressed');
});
_domCollector__WEBPACK_IMPORTED_MODULE_3__.cancelProjectBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('cancelProjectPressed'));

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('windowLoad', renderFirstLoad);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectTasksUpdated', renderTaskList);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', hideNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', hideNewTaskForm);

function displayNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskForm.classList.remove('hidden');
    // dom.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    // dom.addTaskBtn.disabled = false;
    clearNewTaskForm();
};

function clearNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.title.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.description.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.dueDate.value = null;
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskFields.priority.value = null;
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addProjectPressed', displayNewProjectForm);

function displayNewProjectForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newProjectForm.classList.remove('hidden');
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveProjectPressed', hideNewProjectForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelProjectPressed', hideNewProjectForm);

function hideNewProjectForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newProjectForm.classList.add('hidden');
}

function renderFirstLoad() {
    renderProjectList();
    renderTaskList((0,_Storage__WEBPACK_IMPORTED_MODULE_4__.retrieveProjects)()[0].tasks)
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsStored', renderProjectList);

function renderProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    (0,_Storage__WEBPACK_IMPORTED_MODULE_4__.retrieveProjects)().forEach(project => {
        projectList.appendChild(buildProject(project));
    });
}

function renderTaskList(tasks) {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.textContent = '';
    tasks.forEach(task => {
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.appendChild(buildTask(task));
    });
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', fadeBackground);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addProjectPressed', fadeBackground);

function fadeBackground() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.fullscreenContainer.classList.remove('hidden');
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', clearFadedBackground);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', clearFadedBackground);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveProjectPressed', clearFadedBackground);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelProjectPressed', clearFadedBackground);

function clearFadedBackground() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.fullscreenContainer.classList.add('hidden');
}


    // TODO refractor event listeners, maybe put them somewhere else?
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

function buildProject(project) {
    const newProject = document.createElement('div');
    // Project name
    const projectName = document.createElement('p');
    projectName.classList.add('projectName');
    projectName.textContent = project.name;
    newProject.appendChild(projectName);
    // Delete project button
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.id = 'deleteProjectBtn';
    deleteProjectBtn.type = 'button';
    deleteProjectBtn.textContent = 'Delete';
    newProject.appendChild(deleteProjectBtn);

    return newProject;
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
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage */ "./src/modules/Storage.js");



 


// localStorage.clear(); //DEBUG

let projects = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.retrieveProjects)() || [];

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

    projects = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.retrieveProjects)();

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
    const taskToDelete = currentProject.tasks.find(
        (task) => task.id === id
    );
    currentProject.tasks.splice(currentProject.tasks.indexOf(taskToDelete), 1);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject.tasks);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated');
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('newProjectSaved', saveNewProject);

function saveNewProject([name]) {
    const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](name);
    projects.push(newProject);
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
/* harmony export */   "cancelProjectBtn": () => (/* binding */ cancelProjectBtn),
/* harmony export */   "cancelTaskBtn": () => (/* binding */ cancelTaskBtn),
/* harmony export */   "fullscreenContainer": () => (/* binding */ fullscreenContainer),
/* harmony export */   "newProjectFields": () => (/* binding */ newProjectFields),
/* harmony export */   "newProjectForm": () => (/* binding */ newProjectForm),
/* harmony export */   "newTaskFields": () => (/* binding */ newTaskFields),
/* harmony export */   "newTaskForm": () => (/* binding */ newTaskForm),
/* harmony export */   "saveProjectBtn": () => (/* binding */ saveProjectBtn),
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
const newProjectForm = document.getElementById('newProjectForm');
const newProjectFields = {
    name: document.getElementById('newProjectName'),
};
const saveProjectBtn = document.getElementById('saveProjectBtn');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbUNvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgLy8gYWRkVGFzayhuZXdUYXNrKSB7XG4gICAgLy8gICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZW1vdmVUYXNrKGlkKSB7XG4gICAgLy8gICAgIGNvbnN0IHRhc2tUb0RlbGV0ZSA9ICB0aGlzLnRhc2tzLmZpbmQoXG4gICAgLy8gICAgICAgICAodGFzaykgPT4gdGFzay5nZXRJZCgpID09PSBpZFxuICAgIC8vICAgICApO1xuICAgIC8vICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFza1RvRGVsZXRlKSwgMSk7XG4gICAgLy8gfVxuXG59IiwiaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9jb250cm9sbGVyJztcblxuLy8gVE9ETyByZXZhbXAgbW9kdWxlIHNvIGl0IGNhbiBjb21wb3NlIE9iamVjdHMgd2l0aCBmdW5jdGlvbnMgYW5kIFxuLy8gYXZvaWQgc3RvcmluZyBhbmQgcmV0cmlldmluZyBhbGwgdGhlIHByb2plY3RzLlxuXG5wdWJTdWIuc3Vic2NyaWJlKCdwcm9qZWN0c1VwZGF0ZWQnLCBzdG9yZVByb2plY3RzKTtcblxuZnVuY3Rpb24gc3RvcmVQcm9qZWN0cygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1N0b3JlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUgPSBcIk5vIGRhdGVcIiwgcHJpb3JpdHkgPSAxKSB7XG4gICAgICAgIHRoaXMuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zbGljZSgyKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb21Db2xsZWN0b3InO1xuaW1wb3J0IHsgcmV0cmlldmVQcm9qZWN0cyBhcyBwcm9qZWN0cyB9IGZyb20gJy4vU3RvcmFnZSc7XG4vLyBpbXBvcnQgeyBkZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ3dpbmRvd0xvYWQnKSk7XG5cbmRvbS5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2FkZFByb2plY3RQcmVzc2VkJykpO1xuXG5kb20uYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRUYXNrUHJlc3NlZCcpKTtcbmRvbS5zYXZlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwdWJTdWIucHVibGlzaCgnbmV3VGFza1NhdmVkJywgW1xuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy50aXRsZS52YWx1ZSxcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMuZGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLmR1ZURhdGUudmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLnByaW9yaXR5LnZhbHVlLFxuICAgIF0pO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzYXZlVGFza1ByZXNzZWQnKTtcbn0pO1xuZG9tLmNhbmNlbFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnY2FuY2VsVGFza1ByZXNzZWQnKSk7XG5cbmRvbS5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2FkZFByb2plY3RQcmVzc2VkJykpO1xuZG9tLnNhdmVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHB1YlN1Yi5wdWJsaXNoKCduZXdQcm9qZWN0U2F2ZWQnLCBbXG4gICAgICAgIGRvbS5uZXdQcm9qZWN0RmllbGRzLm5hbWUudmFsdWUsXG4gICAgXSk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3NhdmVQcm9qZWN0UHJlc3NlZCcpO1xufSk7XG5kb20uY2FuY2VsUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdjYW5jZWxQcm9qZWN0UHJlc3NlZCcpKTtcblxucHViU3ViLnN1YnNjcmliZSgnd2luZG93TG9hZCcsIHJlbmRlckZpcnN0TG9hZCk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCByZW5kZXJUYXNrTGlzdCk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZGlzcGxheU5ld1Rhc2tGb3JtKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0Zvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgLy8gZG9tLmFkZFRhc2tCdG4uZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuZnVuY3Rpb24gaGlkZU5ld1Rhc2tGb3JtKCkge1xuICAgIG5ld1Rhc2tGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIC8vIGRvbS5hZGRUYXNrQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgY2xlYXJOZXdUYXNrRm9ybSgpO1xufTtcblxuZnVuY3Rpb24gY2xlYXJOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy50aXRsZS52YWx1ZSA9IG51bGw7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMuZGVzY3JpcHRpb24udmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLmR1ZURhdGUudmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLnByaW9yaXR5LnZhbHVlID0gbnVsbDtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnYWRkUHJvamVjdFByZXNzZWQnLCBkaXNwbGF5TmV3UHJvamVjdEZvcm0pO1xuXG5mdW5jdGlvbiBkaXNwbGF5TmV3UHJvamVjdEZvcm0oKSB7XG4gICAgZG9tLm5ld1Byb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlUHJvamVjdFByZXNzZWQnLCBoaWRlTmV3UHJvamVjdEZvcm0pO1xucHViU3ViLnN1YnNjcmliZSgnY2FuY2VsUHJvamVjdFByZXNzZWQnLCBoaWRlTmV3UHJvamVjdEZvcm0pO1xuXG5mdW5jdGlvbiBoaWRlTmV3UHJvamVjdEZvcm0oKSB7XG4gICAgZG9tLm5ld1Byb2plY3RGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGaXJzdExvYWQoKSB7XG4gICAgcmVuZGVyUHJvamVjdExpc3QoKTtcbiAgICByZW5kZXJUYXNrTGlzdChwcm9qZWN0cygpWzBdLnRhc2tzKVxufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdwcm9qZWN0c1N0b3JlZCcsIHJlbmRlclByb2plY3RMaXN0KTtcblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdExpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGJ1aWxkUHJvamVjdChwcm9qZWN0KSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0KHRhc2tzKSB7XG4gICAgZG9tLnRhc2tMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgZG9tLnRhc2tMaXN0LmFwcGVuZENoaWxkKGJ1aWxkVGFzayh0YXNrKSk7XG4gICAgfSk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZmFkZUJhY2tncm91bmQpO1xucHViU3ViLnN1YnNjcmliZSgnYWRkUHJvamVjdFByZXNzZWQnLCBmYWRlQmFja2dyb3VuZCk7XG5cbmZ1bmN0aW9uIGZhZGVCYWNrZ3JvdW5kKCkge1xuICAgIGRvbS5mdWxsc2NyZWVuQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlVGFza1ByZXNzZWQnLCBjbGVhckZhZGVkQmFja2dyb3VuZCk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxUYXNrUHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVQcm9qZWN0UHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2NhbmNlbFByb2plY3RQcmVzc2VkJywgY2xlYXJGYWRlZEJhY2tncm91bmQpO1xuXG5mdW5jdGlvbiBjbGVhckZhZGVkQmFja2dyb3VuZCgpIHtcbiAgICBkb20uZnVsbHNjcmVlbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuXG4gICAgLy8gVE9ETyByZWZyYWN0b3IgZXZlbnQgbGlzdGVuZXJzLCBtYXliZSBwdXQgdGhlbSBzb21ld2hlcmUgZWxzZT9cbmZ1bmN0aW9uIGJ1aWxkVGFzayh0YXNrKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgLy8gQ2hlY2tib3hcbiAgICBjb25zdCB0YXNrQ2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICB0YXNrQ2hlY2suY2hlY2tlZCA9IHRhc2suY29tcGxldGVkO1xuICAgIHRhc2tDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVjaycpO1xuICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LnRvZ2dsZSgnY3Jvc3NlZFRocm91Z2gnKTtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Rhc2tDb21wbGV0ZWQnLCB0YXNrLmlkKTtcbiAgICB9KTtcbiAgICBuZXdUYXNrLmFwcGVuZENoaWxkKHRhc2tDaGVjayk7XG4gICAgLy8gVGFzayB0aXRsZVxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2Nyb3NzZWRUaHJvdWdoJyk7XG4gICAgbmV3VGFzay5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgIC8vIERlbGV0ZSBidXR0b25cbiAgICBjb25zdCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGVsZXRlVGFza0J0bi50eXBlID0gJ2J1dHRvbic7XG4gICAgZGVsZXRlVGFza0J0bi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdkZWxldGVUYXNrUHJlc3NlZCcsIHRhc2suaWQpO1xuICAgIH0pO1xuICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bik7XG4gICAgcmV0dXJuIG5ld1Rhc2s7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIFByb2plY3QgbmFtZVxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3ROYW1lJyk7XG4gICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gICAgbmV3UHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gICAgLy8gRGVsZXRlIHByb2plY3QgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRlbGV0ZVByb2plY3RCdG4uaWQgPSAnZGVsZXRlUHJvamVjdEJ0bic7XG4gICAgZGVsZXRlUHJvamVjdEJ0bi50eXBlID0gJ2J1dHRvbic7XG4gICAgZGVsZXRlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgIG5ld1Byb2plY3QuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bik7XG5cbiAgICByZXR1cm4gbmV3UHJvamVjdDtcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7IHJldHJpZXZlUHJvamVjdHMgfSBmcm9tICcuL1N0b3JhZ2UnOyBcblxuXG4vLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTsgLy9ERUJVR1xuXG5leHBvcnQgbGV0IHByb2plY3RzID0gcmV0cmlldmVQcm9qZWN0cygpIHx8IFtdO1xuXG5pZiAocHJvamVjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdQRkcnKTtcbiAgICBjb25zdCB0YXNrMSA9IG5ldyBUYXNrKCdEbyB0aGluZycsICdEZXNjMScpO1xuICAgIGNvbnN0IHRhc2syID0gbmV3IFRhc2soJ0RvIE90aGVyIFRoaW5nJywgJ0Rlc2MyJyk7XG4gICAgbmV3UHJvamVjdC50YXNrcy5wdXNoKHRhc2sxKTtcbiAgICBuZXdQcm9qZWN0LnRhc2tzLnB1c2godGFzazIpO1xuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLnRhc2tzWzBdLnRpdGxlKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgICBwcm9qZWN0cyA9IHJldHJpZXZlUHJvamVjdHMoKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcblxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLnRhc2tzWzFdLnRpdGxlKTtcblxuICAgIHByb2plY3RzWzBdLnRhc2tzWzBdLnRpdGxlID0gJ1dURic7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gICAgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcblxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLnRhc2tzWzBdLnRpdGxlKTtcblxufVxuXG5sZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1swXTtcblxucHViU3ViLnN1YnNjcmliZSgnbmV3VGFza1NhdmVkJywgc2F2ZU5ld1Rhc2spO1xuXG5mdW5jdGlvbiBzYXZlTmV3VGFzayhbdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eV0pIHtcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgY3VycmVudFByb2plY3QudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdFRhc2tzVXBkYXRlZCcsIGN1cnJlbnRQcm9qZWN0LnRhc2tzKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3Rhc2tDb21wbGV0ZWQnLCBzZXRUYXNrQ29tcGxldGVkKTtcblxuZnVuY3Rpb24gc2V0VGFza0NvbXBsZXRlZChpZCkge1xuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2sgPSBjdXJyZW50UHJvamVjdC50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5pZCA9PT0gaWQpO1xuICAgIGNvbXBsZXRlZFRhc2suY29tcGxldGVkID0gIWNvbXBsZXRlZFRhc2suY29tcGxldGVkO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdFRhc2tzVXBkYXRlZCcsIGN1cnJlbnRQcm9qZWN0LnRhc2tzKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2RlbGV0ZVRhc2tQcmVzc2VkJywgcmVtb3ZlVGFzayk7XG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2soaWQpIHtcbiAgICBjb25zdCB0YXNrVG9EZWxldGUgPSBjdXJyZW50UHJvamVjdC50YXNrcy5maW5kKFxuICAgICAgICAodGFzaykgPT4gdGFzay5pZCA9PT0gaWRcbiAgICApO1xuICAgIGN1cnJlbnRQcm9qZWN0LnRhc2tzLnNwbGljZShjdXJyZW50UHJvamVjdC50YXNrcy5pbmRleE9mKHRhc2tUb0RlbGV0ZSksIDEpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgY3VycmVudFByb2plY3QudGFza3MpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnKTtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnbmV3UHJvamVjdFNhdmVkJywgc2F2ZU5ld1Byb2plY3QpO1xuXG5mdW5jdGlvbiBzYXZlTmV3UHJvamVjdChbbmFtZV0pIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJyk7XG59IiwiZXhwb3J0IGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVGFza0J0bicpO1xuZXhwb3J0IGNvbnN0IHNhdmVUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVUYXNrQnRuJyk7XG5leHBvcnQgY29uc3QgY2FuY2VsVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW5jZWxUYXNrQnRuJyk7XG5cbmV4cG9ydCBjb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrRm9ybScpO1xuZXhwb3J0IGNvbnN0IG5ld1Rhc2tGaWVsZHMgPSB7XG4gICAgdGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrVGl0bGUnKSxcbiAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tEZXNjcmlwdGlvbicpLFxuICAgIGR1ZURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrRHVlRGF0ZScpLFxuICAgIHByaW9yaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza1ByaW9yaXR5JyksXG59O1xuXG5leHBvcnQgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0xpc3QnKTtcblxuZXhwb3J0IGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ0bicpO1xuZXhwb3J0IGNvbnN0IG5ld1Byb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Byb2plY3RGb3JtJyk7XG5leHBvcnQgY29uc3QgbmV3UHJvamVjdEZpZWxkcyA9IHtcbiAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3UHJvamVjdE5hbWUnKSxcbn07XG5leHBvcnQgY29uc3Qgc2F2ZVByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZVByb2plY3RCdG4nKTtcbmV4cG9ydCBjb25zdCBjYW5jZWxQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbFByb2plY3RCdG4nKTtcblxuZXhwb3J0IGNvbnN0IGZ1bGxzY3JlZW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbHNjcmVlbkNvbnRhaW5lcicpOyIsImV4cG9ydCBjb25zdCBldmVudHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgICBjb25zdCBwdWJsaXNoID0gZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdQdWJsaXNoZWQnLCBldmVudCk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnRdLmZvckVhY2goaGFuZGxlciA9PiBoYW5kbGVyKGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcikge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudCBpbiBldmVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdLmZpbHRlcigoZnVuYykgPT4gZnVuYyAhPSBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwdWJsaXNoLFxuICAgICAgICBzdWJzY3JpYmUsXG4gICAgICAgIHVuc3Vic2NyaWJlLFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9tb2R1bGVzL2NvbnRyb2xsZXInXG5pbXBvcnQgJy4vbW9kdWxlcy9VSSc7XG5pbXBvcnQgJy4vbW9kdWxlcy9TdG9yYWdlJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==