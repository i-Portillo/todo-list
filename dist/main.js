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
        this._name = name;
        this._tasks = [];
    }

    get name () {
        return this._name;
    }

    set name (value) {
        if (value) {
            this._name = value;
        }
    }

    get tasks () {
        return this._tasks;
    }

    set tasks (value) {
        if (value) {
            this._tasks = value;
        } else {
            this._tasks = [];
        }
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

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
/* harmony export */   "getProjects": () => (/* binding */ getProjects)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/modules/controller.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");





// TODO revamp module so it can compose Objects with functions and 
// avoid storing and retrieving all the projects.

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsUpdated', storeProjects);

function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(_controller__WEBPACK_IMPORTED_MODULE_1__.projects));
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('projectsStored');
}

function getProjects() {
    const projects = (JSON.parse(localStorage.getItem('projects')) || [])
        .map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_2__["default"](), project));
    projects.forEach(project => {
        project.tasks = project.tasks
            .map((task) => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_3__["default"](), task));
    });
    return projects;
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
    constructor(title, description, dueDate = "No date", priority = 1, completed = false, id = null) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }

    get id () {
        return this._id;
    }

    set id (value) {
        if (value) {
            this._id = value;
        } else {
            this._id = Math.random().toString(16).slice(2);
        }
    }

    get title () {
        return this._title;
    }

    set title (value) {
        if (value) {
            this._title = value;
        }
    }

    get description () {
        return this._description;
    }

    set description (value) {
        if (value) {
            this._description = value;
        }
    }

    get dueDate () {
        return this._dueDate;
    }

    set dueDate (value) {
        if (value) {
            this._dueDate = value;
        }
    }

    get priority () {
        return this._priority;
    }

    set priority (value) {
        if (value >= 1 && value <= 5) {
            this._priority = value;
        }
    }

    get completed () {
        return this._completed;
    }

    set completed (value) {
        if (value !== null) {
            this._completed = value;
        }
    }
}

function setId (value) {
    if (!this._id) {
        this._id = Math.random().toString(16).slice(2);
    } else {
        this._id = value;
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
    renderTaskList((0,_Storage__WEBPACK_IMPORTED_MODULE_4__.getProjects)()[0].tasks)
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsStored', renderProjectList);

function renderProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    (0,_Storage__WEBPACK_IMPORTED_MODULE_4__.getProjects)().forEach(project => {
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

let projects = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getProjects)();

// DEBUG
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

    projects = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getProjects)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87O0FBRUE7QUFDQTtBQUNBO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDdEJBOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7O1VDNUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNQO0FBQ0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbUNvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fdGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0YXNrcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrcztcbiAgICB9XG5cbiAgICBzZXQgdGFza3MgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFza3MgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Rhc2tzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZVRhc2soaWQpIHtcbiAgICAvLyAgICAgY29uc3QgdGFza1RvRGVsZXRlID0gIHRoaXMudGFza3MuZmluZChcbiAgICAvLyAgICAgICAgICh0YXNrKSA9PiB0YXNrLmdldElkKCkgPT09IGlkXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuaW5kZXhPZih0YXNrVG9EZWxldGUpLCAxKTtcbiAgICAvLyB9XG5cbn0iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5cbi8vIFRPRE8gcmV2YW1wIG1vZHVsZSBzbyBpdCBjYW4gY29tcG9zZSBPYmplY3RzIHdpdGggZnVuY3Rpb25zIGFuZCBcbi8vIGF2b2lkIHN0b3JpbmcgYW5kIHJldHJpZXZpbmcgYWxsIHRoZSBwcm9qZWN0cy5cblxucHViU3ViLnN1YnNjcmliZSgncHJvamVjdHNVcGRhdGVkJywgc3RvcmVQcm9qZWN0cyk7XG5cbmZ1bmN0aW9uIHN0b3JlUHJvamVjdHMoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNTdG9yZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdKVxuICAgICAgICAubWFwKChwcm9qZWN0KSA9PiBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0KCksIHByb2plY3QpKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBwcm9qZWN0LnRhc2tzID0gcHJvamVjdC50YXNrc1xuICAgICAgICAgICAgLm1hcCgodGFzaykgPT4gT2JqZWN0LmFzc2lnbihuZXcgVGFzaygpLCB0YXNrKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb2plY3RzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlID0gXCJObyBkYXRlXCIsIHByaW9yaXR5ID0gMSwgY29tcGxldGVkID0gZmFsc2UsIGlkID0gbnVsbCkge1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgICAgICB0aGlzLl90aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLl9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5fY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIH1cblxuICAgIGdldCBpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGl0bGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IHRpdGxlICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGVzY3JpcHRpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0IGRlc2NyaXB0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZHVlRGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdWVEYXRlO1xuICAgIH1cblxuICAgIHNldCBkdWVEYXRlICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1ZURhdGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcmlvcml0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXQgcHJpb3JpdHkgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+PSAxICYmIHZhbHVlIDw9IDUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY29tcGxldGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlZDtcbiAgICB9XG5cbiAgICBzZXQgY29tcGxldGVkICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRJZCAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgICAgIHRoaXMuX2lkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb21Db2xsZWN0b3InO1xuaW1wb3J0IHsgZ2V0UHJvamVjdHMgfSBmcm9tICcuL1N0b3JhZ2UnO1xuLy8gaW1wb3J0IHsgZGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCd3aW5kb3dMb2FkJykpO1xuXG5kb20uYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRQcm9qZWN0UHJlc3NlZCcpKTtcblxuZG9tLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnYWRkVGFza1ByZXNzZWQnKSk7XG5kb20uc2F2ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHViU3ViLnB1Ymxpc2goJ25ld1Rhc2tTYXZlZCcsIFtcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMudGl0bGUudmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLmRlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy5kdWVEYXRlLnZhbHVlLFxuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy5wcmlvcml0eS52YWx1ZSxcbiAgICBdKTtcbiAgICBwdWJTdWIucHVibGlzaCgnc2F2ZVRhc2tQcmVzc2VkJyk7XG59KTtcbmRvbS5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2NhbmNlbFRhc2tQcmVzc2VkJykpO1xuXG5kb20uYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRQcm9qZWN0UHJlc3NlZCcpKTtcbmRvbS5zYXZlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwdWJTdWIucHVibGlzaCgnbmV3UHJvamVjdFNhdmVkJywgW1xuICAgICAgICBkb20ubmV3UHJvamVjdEZpZWxkcy5uYW1lLnZhbHVlLFxuICAgIF0pO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzYXZlUHJvamVjdFByZXNzZWQnKTtcbn0pO1xuZG9tLmNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnY2FuY2VsUHJvamVjdFByZXNzZWQnKSk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3dpbmRvd0xvYWQnLCByZW5kZXJGaXJzdExvYWQpO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgcmVuZGVyVGFza0xpc3QpO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrUHJlc3NlZCcsIGRpc3BsYXlOZXdUYXNrRm9ybSk7XG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlVGFza1ByZXNzZWQnLCBoaWRlTmV3VGFza0Zvcm0pO1xucHViU3ViLnN1YnNjcmliZSgnY2FuY2VsVGFza1ByZXNzZWQnLCBoaWRlTmV3VGFza0Zvcm0pO1xuXG5mdW5jdGlvbiBkaXNwbGF5TmV3VGFza0Zvcm0oKSB7XG4gICAgZG9tLm5ld1Rhc2tGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIC8vIGRvbS5hZGRUYXNrQnRuLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGhpZGVOZXdUYXNrRm9ybSgpIHtcbiAgICBuZXdUYXNrRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAvLyBkb20uYWRkVGFza0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGNsZWFyTmV3VGFza0Zvcm0oKTtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyTmV3VGFza0Zvcm0oKSB7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMudGl0bGUudmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLmRlc2NyaXB0aW9uLnZhbHVlID0gbnVsbDtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy5kdWVEYXRlLnZhbHVlID0gbnVsbDtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy5wcmlvcml0eS52YWx1ZSA9IG51bGw7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFByb2plY3RQcmVzc2VkJywgZGlzcGxheU5ld1Byb2plY3RGb3JtKTtcblxuZnVuY3Rpb24gZGlzcGxheU5ld1Byb2plY3RGb3JtKCkge1xuICAgIGRvbS5uZXdQcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnc2F2ZVByb2plY3RQcmVzc2VkJywgaGlkZU5ld1Byb2plY3RGb3JtKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2NhbmNlbFByb2plY3RQcmVzc2VkJywgaGlkZU5ld1Byb2plY3RGb3JtKTtcblxuZnVuY3Rpb24gaGlkZU5ld1Byb2plY3RGb3JtKCkge1xuICAgIGRvbS5uZXdQcm9qZWN0Rm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRmlyc3RMb2FkKCkge1xuICAgIHJlbmRlclByb2plY3RMaXN0KCk7XG4gICAgcmVuZGVyVGFza0xpc3QoZ2V0UHJvamVjdHMoKVswXS50YXNrcylcbn1cblxucHViU3ViLnN1YnNjcmliZSgncHJvamVjdHNTdG9yZWQnLCByZW5kZXJQcm9qZWN0TGlzdCk7XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RMaXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChidWlsZFByb2plY3QocHJvamVjdCkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrTGlzdCh0YXNrcykge1xuICAgIGRvbS50YXNrTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGRvbS50YXNrTGlzdC5hcHBlbmRDaGlsZChidWlsZFRhc2sodGFzaykpO1xuICAgIH0pO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrUHJlc3NlZCcsIGZhZGVCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFByb2plY3RQcmVzc2VkJywgZmFkZUJhY2tncm91bmQpO1xuXG5mdW5jdGlvbiBmYWRlQmFja2dyb3VuZCgpIHtcbiAgICBkb20uZnVsbHNjcmVlbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnc2F2ZVRhc2tQcmVzc2VkJywgY2xlYXJGYWRlZEJhY2tncm91bmQpO1xucHViU3ViLnN1YnNjcmliZSgnY2FuY2VsVGFza1ByZXNzZWQnLCBjbGVhckZhZGVkQmFja2dyb3VuZCk7XG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlUHJvamVjdFByZXNzZWQnLCBjbGVhckZhZGVkQmFja2dyb3VuZCk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxQcm9qZWN0UHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcblxuZnVuY3Rpb24gY2xlYXJGYWRlZEJhY2tncm91bmQoKSB7XG4gICAgZG9tLmZ1bGxzY3JlZW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cblxuICAgIC8vIFRPRE8gcmVmcmFjdG9yIGV2ZW50IGxpc3RlbmVycywgbWF5YmUgcHV0IHRoZW0gc29tZXdoZXJlIGVsc2U/XG5mdW5jdGlvbiBidWlsZFRhc2sodGFzaykge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIC8vIENoZWNrYm94XG4gICAgY29uc3QgdGFza0NoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgdGFza0NoZWNrLmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlZDtcbiAgICB0YXNrQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2snKTtcbiAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC50b2dnbGUoJ2Nyb3NzZWRUaHJvdWdoJyk7XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd0YXNrQ29tcGxldGVkJywgdGFzay5pZCk7XG4gICAgfSk7XG4gICAgbmV3VGFzay5hcHBlbmRDaGlsZCh0YXNrQ2hlY2spO1xuICAgIC8vIFRhc2sgdGl0bGVcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICBpZiAodGFzay5jb21wbGV0ZWQpIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKCdjcm9zc2VkVGhyb3VnaCcpO1xuICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAvLyBEZWxldGUgYnV0dG9uXG4gICAgY29uc3QgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGRlbGV0ZVRhc2tCdG4udHlwZSA9ICdidXR0b24nO1xuICAgIGRlbGV0ZVRhc2tCdG4udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICBkZWxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwdWJTdWIucHVibGlzaCgnZGVsZXRlVGFza1ByZXNzZWQnLCB0YXNrLmlkKTtcbiAgICB9KTtcbiAgICBuZXdUYXNrLmFwcGVuZENoaWxkKGRlbGV0ZVRhc2tCdG4pO1xuICAgIHJldHVybiBuZXdUYXNrO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBQcm9qZWN0IG5hbWVcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0TmFtZScpO1xuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICAgIG5ld1Byb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIC8vIERlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkZWxldGVQcm9qZWN0QnRuLmlkID0gJ2RlbGV0ZVByb2plY3RCdG4nO1xuICAgIGRlbGV0ZVByb2plY3RCdG4udHlwZSA9ICdidXR0b24nO1xuICAgIGRlbGV0ZVByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICBuZXdQcm9qZWN0LmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xuXG4gICAgcmV0dXJuIG5ld1Byb2plY3Q7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBnZXRQcm9qZWN0cyB9IGZyb20gJy4vU3RvcmFnZSc7IFxuXG5cbi8vIGxvY2FsU3RvcmFnZS5jbGVhcigpOyAvL0RFQlVHXG5cbmV4cG9ydCBsZXQgcHJvamVjdHMgPSBnZXRQcm9qZWN0cygpO1xuXG4vLyBERUJVR1xuaWYgKHByb2plY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgnUEZHJyk7XG4gICAgY29uc3QgdGFzazEgPSBuZXcgVGFzaygnRG8gdGhpbmcnLCAnRGVzYzEnKTtcbiAgICBjb25zdCB0YXNrMiA9IG5ldyBUYXNrKCdEbyBPdGhlciBUaGluZycsICdEZXNjMicpO1xuICAgIG5ld1Byb2plY3QudGFza3MucHVzaCh0YXNrMSk7XG4gICAgbmV3UHJvamVjdC50YXNrcy5wdXNoKHRhc2syKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1swXS50YXNrc1swXS50aXRsZSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gICAgcHJvamVjdHMgPSBnZXRQcm9qZWN0cygpO1xuXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdHMpO1xuXG4gICAgY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3NbMV0udGl0bGUpO1xuXG4gICAgcHJvamVjdHNbMF0udGFza3NbMF0udGl0bGUgPSAnV1RGJztcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgICBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuXG4gICAgY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3NbMF0udGl0bGUpO1xuXG59XG5cbmxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzWzBdO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCduZXdUYXNrU2F2ZWQnLCBzYXZlTmV3VGFzayk7XG5cbmZ1bmN0aW9uIHNhdmVOZXdUYXNrKFt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5XSkge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICBjdXJyZW50UHJvamVjdC50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgY3VycmVudFByb2plY3QudGFza3MpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnKTtcbn1cblxucHViU3ViLnN1YnNjcmliZSgndGFza0NvbXBsZXRlZCcsIHNldFRhc2tDb21wbGV0ZWQpO1xuXG5mdW5jdGlvbiBzZXRUYXNrQ29tcGxldGVkKGlkKSB7XG4gICAgY29uc3QgY29tcGxldGVkVGFzayA9IGN1cnJlbnRQcm9qZWN0LnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmlkID09PSBpZCk7XG4gICAgY29tcGxldGVkVGFzay5jb21wbGV0ZWQgPSAhY29tcGxldGVkVGFzay5jb21wbGV0ZWQ7XG4gICAgY29uc29sZS5sb2coY3VycmVudFByb2plY3QpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgY3VycmVudFByb2plY3QudGFza3MpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnKTtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnZGVsZXRlVGFza1ByZXNzZWQnLCByZW1vdmVUYXNrKTtcblxuZnVuY3Rpb24gcmVtb3ZlVGFzayhpZCkge1xuICAgIGNvbnN0IHRhc2tUb0RlbGV0ZSA9IGN1cnJlbnRQcm9qZWN0LnRhc2tzLmZpbmQoXG4gICAgICAgICh0YXNrKSA9PiB0YXNrLmlkID09PSBpZFxuICAgICk7XG4gICAgY3VycmVudFByb2plY3QudGFza3Muc3BsaWNlKGN1cnJlbnRQcm9qZWN0LnRhc2tzLmluZGV4T2YodGFza1RvRGVsZXRlKSwgMSk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCBjdXJyZW50UHJvamVjdC50YXNrcyk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RzVXBkYXRlZCcpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCduZXdQcm9qZWN0U2F2ZWQnLCBzYXZlTmV3UHJvamVjdCk7XG5cbmZ1bmN0aW9uIHNhdmVOZXdQcm9qZWN0KFtuYW1lXSkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnKTtcbn0iLCJleHBvcnQgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrQnRuJyk7XG5leHBvcnQgY29uc3Qgc2F2ZVRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZVRhc2tCdG4nKTtcbmV4cG9ydCBjb25zdCBjYW5jZWxUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbFRhc2tCdG4nKTtcblxuZXhwb3J0IGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tGb3JtJyk7XG5leHBvcnQgY29uc3QgbmV3VGFza0ZpZWxkcyA9IHtcbiAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tUaXRsZScpLFxuICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza0Rlc2NyaXB0aW9uJyksXG4gICAgZHVlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tEdWVEYXRlJyksXG4gICAgcHJpb3JpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrUHJpb3JpdHknKSxcbn07XG5cbmV4cG9ydCBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTGlzdCcpO1xuXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0QnRuJyk7XG5leHBvcnQgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3UHJvamVjdEZvcm0nKTtcbmV4cG9ydCBjb25zdCBuZXdQcm9qZWN0RmllbGRzID0ge1xuICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdQcm9qZWN0TmFtZScpLFxufTtcbmV4cG9ydCBjb25zdCBzYXZlUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlUHJvamVjdEJ0bicpO1xuZXhwb3J0IGNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsUHJvamVjdEJ0bicpO1xuXG5leHBvcnQgY29uc3QgZnVsbHNjcmVlbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsc2NyZWVuQ29udGFpbmVyJyk7IiwiZXhwb3J0IGNvbnN0IGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBldmVudHMgPSB7fTtcblxuICAgIGNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1B1Ymxpc2hlZCcsIGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0uZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgfVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50XSA9IGV2ZW50c1tldmVudF0uZmlsdGVyKChmdW5jKSA9PiBmdW5jICE9IGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2gsXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICAgICAgdW5zdWJzY3JpYmUsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlcidcbmltcG9ydCAnLi9tb2R1bGVzL1VJJztcbmltcG9ydCAnLi9tb2R1bGVzL1N0b3JhZ2UnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9