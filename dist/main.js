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
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");




// TODO revamp module so it can compose Objects with functions and 
// avoid storing and retrieving all the projects.

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsUpdated', storeProjects);

function storeProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
    _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('projectsStored');
}

function getProjects() {
    const projects = (JSON.parse(localStorage.getItem('projects')) || [])
        .map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](), project));
    projects.forEach(project => {
        project.tasks = project.tasks
            .map((task) => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](), task));
    });
    console.log(projects);
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






let currentProject = null;

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
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('currentProjectChanged', renderTaskList)

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', hideNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', hideNewTaskForm);

function displayNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskForm.classList.remove('hidden');
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
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
    currentProject = (0,_Storage__WEBPACK_IMPORTED_MODULE_4__.getProjects)()[0];
    renderProjectList();
    renderTaskList(currentProject)
}

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectsStored', renderProjectList);

function renderProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    (0,_Storage__WEBPACK_IMPORTED_MODULE_4__.getProjects)().forEach(project => {
        projectList.appendChild(buildProject(project));
    });
}

function renderTaskList(project) {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.textContent = '';
    project.tasks.forEach(task => {
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
    projectName.addEventListener('click', () => {
        if (project.name !== currentProject.name) {
            currentProject = project;
            _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('currentProjectChanged', project);
        }
    });
    newProject.appendChild(projectName);
    // Delete project button
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.id = 'deleteProjectBtn';
    deleteProjectBtn.type = 'button';
    deleteProjectBtn.textContent = 'Delete';
    deleteProjectBtn.addEventListener('click', () => {
        _events__WEBPACK_IMPORTED_MODULE_0__.events.publish('deleteProjectPressed');
    });
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
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

let currentProject = projects[0];

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('newTaskSaved', saveNewTask);

function saveNewTask([title, description, dueDate, priority]) {
    const newTask = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"](title, description, dueDate, priority);
    currentProject.tasks.push(newTask);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('taskCompleted', setTaskCompleted);

function setTaskCompleted(id) {
    const completedTask = currentProject.tasks.find(task => task.id === id);
    completedTask.completed = !completedTask.completed;
    console.log(currentProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('deleteTaskPressed', removeTask);

function removeTask(id) {
    const taskToDelete = currentProject.tasks.find(
        (task) => task.id === id
    );
    currentProject.tasks.splice(currentProject.tasks.indexOf(taskToDelete), 1);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectTasksUpdated', currentProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('newProjectSaved', saveNewProject);

function saveNewProject([name]) {
    const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](name);
    projects.push(newProject);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('deleteProjectPressed', removeProject);

function removeProject(name) {
    const projectToDelete = projects.find(
        (project) => project.name === name
    );
    projects.splice(projects.indexOf(projectToDelete), 1);
    _events__WEBPACK_IMPORTED_MODULE_2__.events.publish('projectsUpdated', projects);
}

_events__WEBPACK_IMPORTED_MODULE_2__.events.subscribe('currentProjectChanged', changeCurrentProject);

function changeCurrentProject(newCurrentProject) {
    currentProject = projects.find(
        (project) => project.name === newCurrentProject.name
    );
    console.log(currentProject);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxtREFBYztBQUNsQjs7QUFFQSxxREFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFTztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87O0FBRUE7QUFDQTtBQUNBO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDdEJBOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7O1VDNUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ042QjtBQUNQO0FBQ0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbUNvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fdGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0YXNrcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrcztcbiAgICB9XG5cbiAgICBzZXQgdGFza3MgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdGFza3MgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Rhc2tzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZVRhc2soaWQpIHtcbiAgICAvLyAgICAgY29uc3QgdGFza1RvRGVsZXRlID0gIHRoaXMudGFza3MuZmluZChcbiAgICAvLyAgICAgICAgICh0YXNrKSA9PiB0YXNrLmdldElkKCkgPT09IGlkXG4gICAgLy8gICAgICk7XG4gICAgLy8gICAgIHRoaXMudGFza3Muc3BsaWNlKHRoaXMudGFza3MuaW5kZXhPZih0YXNrVG9EZWxldGUpLCAxKTtcbiAgICAvLyB9XG5cbn0iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5cbi8vIFRPRE8gcmV2YW1wIG1vZHVsZSBzbyBpdCBjYW4gY29tcG9zZSBPYmplY3RzIHdpdGggZnVuY3Rpb25zIGFuZCBcbi8vIGF2b2lkIHN0b3JpbmcgYW5kIHJldHJpZXZpbmcgYWxsIHRoZSBwcm9qZWN0cy5cblxucHViU3ViLnN1YnNjcmliZSgncHJvamVjdHNVcGRhdGVkJywgc3RvcmVQcm9qZWN0cyk7XG5cbmZ1bmN0aW9uIHN0b3JlUHJvamVjdHMocHJvamVjdHMpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1N0b3JlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW10pXG4gICAgICAgIC5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpO1xuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIHByb2plY3QudGFza3MgPSBwcm9qZWN0LnRhc2tzXG4gICAgICAgICAgICAubWFwKCh0YXNrKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUYXNrKCksIHRhc2spKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgcmV0dXJuIHByb2plY3RzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlID0gXCJObyBkYXRlXCIsIHByaW9yaXR5ID0gMSwgY29tcGxldGVkID0gZmFsc2UsIGlkID0gbnVsbCkge1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgICAgICB0aGlzLl90aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLl9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5fY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgIH1cblxuICAgIGdldCBpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBzZXQgaWQgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGl0bGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IHRpdGxlICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGVzY3JpcHRpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0IGRlc2NyaXB0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZHVlRGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdWVEYXRlO1xuICAgIH1cblxuICAgIHNldCBkdWVEYXRlICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1ZURhdGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcmlvcml0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXQgcHJpb3JpdHkgKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+PSAxICYmIHZhbHVlIDw9IDUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY29tcGxldGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRlZDtcbiAgICB9XG5cbiAgICBzZXQgY29tcGxldGVkICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRJZCAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX2lkKSB7XG4gICAgICAgIHRoaXMuX2lkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBldmVudHMgYXMgcHViU3ViIH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb21Db2xsZWN0b3InO1xuaW1wb3J0IHsgZ2V0UHJvamVjdHMgfSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5sZXQgY3VycmVudFByb2plY3QgPSBudWxsO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCd3aW5kb3dMb2FkJykpO1xuXG5kb20uYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRQcm9qZWN0UHJlc3NlZCcpKTtcblxuZG9tLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnYWRkVGFza1ByZXNzZWQnKSk7XG5kb20uc2F2ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHViU3ViLnB1Ymxpc2goJ25ld1Rhc2tTYXZlZCcsIFtcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMudGl0bGUudmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLmRlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy5kdWVEYXRlLnZhbHVlLFxuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy5wcmlvcml0eS52YWx1ZSxcbiAgICBdKTtcbiAgICBwdWJTdWIucHVibGlzaCgnc2F2ZVRhc2tQcmVzc2VkJyk7XG59KTtcbmRvbS5jYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2NhbmNlbFRhc2tQcmVzc2VkJykpO1xuXG5kb20uYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdhZGRQcm9qZWN0UHJlc3NlZCcpKTtcbmRvbS5zYXZlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwdWJTdWIucHVibGlzaCgnbmV3UHJvamVjdFNhdmVkJywgW1xuICAgICAgICBkb20ubmV3UHJvamVjdEZpZWxkcy5uYW1lLnZhbHVlLFxuICAgIF0pO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzYXZlUHJvamVjdFByZXNzZWQnKTtcbn0pO1xuZG9tLmNhbmNlbFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnY2FuY2VsUHJvamVjdFByZXNzZWQnKSk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3dpbmRvd0xvYWQnLCByZW5kZXJGaXJzdExvYWQpO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgcmVuZGVyVGFza0xpc3QpO1xucHViU3ViLnN1YnNjcmliZSgnY3VycmVudFByb2plY3RDaGFuZ2VkJywgcmVuZGVyVGFza0xpc3QpXG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZGlzcGxheU5ld1Rhc2tGb3JtKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxUYXNrUHJlc3NlZCcsIGhpZGVOZXdUYXNrRm9ybSk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0Zvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5mdW5jdGlvbiBoaWRlTmV3VGFza0Zvcm0oKSB7XG4gICAgbmV3VGFza0Zvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgY2xlYXJOZXdUYXNrRm9ybSgpO1xufTtcblxuZnVuY3Rpb24gY2xlYXJOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy50aXRsZS52YWx1ZSA9IG51bGw7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMuZGVzY3JpcHRpb24udmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLmR1ZURhdGUudmFsdWUgPSBudWxsO1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLnByaW9yaXR5LnZhbHVlID0gbnVsbDtcbn1cblxucHViU3ViLnN1YnNjcmliZSgnYWRkUHJvamVjdFByZXNzZWQnLCBkaXNwbGF5TmV3UHJvamVjdEZvcm0pO1xuXG5mdW5jdGlvbiBkaXNwbGF5TmV3UHJvamVjdEZvcm0oKSB7XG4gICAgZG9tLm5ld1Byb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlUHJvamVjdFByZXNzZWQnLCBoaWRlTmV3UHJvamVjdEZvcm0pO1xucHViU3ViLnN1YnNjcmliZSgnY2FuY2VsUHJvamVjdFByZXNzZWQnLCBoaWRlTmV3UHJvamVjdEZvcm0pO1xuXG5mdW5jdGlvbiBoaWRlTmV3UHJvamVjdEZvcm0oKSB7XG4gICAgZG9tLm5ld1Byb2plY3RGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGaXJzdExvYWQoKSB7XG4gICAgY3VycmVudFByb2plY3QgPSBnZXRQcm9qZWN0cygpWzBdO1xuICAgIHJlbmRlclByb2plY3RMaXN0KCk7XG4gICAgcmVuZGVyVGFza0xpc3QoY3VycmVudFByb2plY3QpXG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3Byb2plY3RzU3RvcmVkJywgcmVuZGVyUHJvamVjdExpc3QpO1xuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0TGlzdCcpO1xuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIGdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQoYnVpbGRQcm9qZWN0KHByb2plY3QpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza0xpc3QocHJvamVjdCkge1xuICAgIGRvbS50YXNrTGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICAgIHByb2plY3QudGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgZG9tLnRhc2tMaXN0LmFwcGVuZENoaWxkKGJ1aWxkVGFzayh0YXNrKSk7XG4gICAgfSk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2FkZFRhc2tQcmVzc2VkJywgZmFkZUJhY2tncm91bmQpO1xucHViU3ViLnN1YnNjcmliZSgnYWRkUHJvamVjdFByZXNzZWQnLCBmYWRlQmFja2dyb3VuZCk7XG5cbmZ1bmN0aW9uIGZhZGVCYWNrZ3JvdW5kKCkge1xuICAgIGRvbS5mdWxsc2NyZWVuQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdzYXZlVGFza1ByZXNzZWQnLCBjbGVhckZhZGVkQmFja2dyb3VuZCk7XG5wdWJTdWIuc3Vic2NyaWJlKCdjYW5jZWxUYXNrUHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ3NhdmVQcm9qZWN0UHJlc3NlZCcsIGNsZWFyRmFkZWRCYWNrZ3JvdW5kKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2NhbmNlbFByb2plY3RQcmVzc2VkJywgY2xlYXJGYWRlZEJhY2tncm91bmQpO1xuXG5mdW5jdGlvbiBjbGVhckZhZGVkQmFja2dyb3VuZCgpIHtcbiAgICBkb20uZnVsbHNjcmVlbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuXG4gICAgLy8gVE9ETyByZWZyYWN0b3IgZXZlbnQgbGlzdGVuZXJzLCBtYXliZSBwdXQgdGhlbSBzb21ld2hlcmUgZWxzZT9cbmZ1bmN0aW9uIGJ1aWxkVGFzayh0YXNrKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgLy8gQ2hlY2tib3hcbiAgICBjb25zdCB0YXNrQ2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICB0YXNrQ2hlY2suY2hlY2tlZCA9IHRhc2suY29tcGxldGVkO1xuICAgIHRhc2tDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVjaycpO1xuICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LnRvZ2dsZSgnY3Jvc3NlZFRocm91Z2gnKTtcbiAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3Rhc2tDb21wbGV0ZWQnLCB0YXNrLmlkKTtcbiAgICB9KTtcbiAgICBuZXdUYXNrLmFwcGVuZENoaWxkKHRhc2tDaGVjayk7XG4gICAgLy8gVGFzayB0aXRsZVxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgIGlmICh0YXNrLmNvbXBsZXRlZCkgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2Nyb3NzZWRUaHJvdWdoJyk7XG4gICAgbmV3VGFzay5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgIC8vIERlbGV0ZSBidXR0b25cbiAgICBjb25zdCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGVsZXRlVGFza0J0bi50eXBlID0gJ2J1dHRvbic7XG4gICAgZGVsZXRlVGFza0J0bi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdkZWxldGVUYXNrUHJlc3NlZCcsIHRhc2suaWQpO1xuICAgIH0pO1xuICAgIG5ld1Rhc2suYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bik7XG4gICAgcmV0dXJuIG5ld1Rhc2s7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIFByb2plY3QgbmFtZVxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3ROYW1lJyk7XG4gICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gICAgcHJvamVjdE5hbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgIT09IGN1cnJlbnRQcm9qZWN0Lm5hbWUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCdjdXJyZW50UHJvamVjdENoYW5nZWQnLCBwcm9qZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG5ld1Byb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIC8vIERlbGV0ZSBwcm9qZWN0IGJ1dHRvblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkZWxldGVQcm9qZWN0QnRuLmlkID0gJ2RlbGV0ZVByb2plY3RCdG4nO1xuICAgIGRlbGV0ZVByb2plY3RCdG4udHlwZSA9ICdidXR0b24nO1xuICAgIGRlbGV0ZVByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICBkZWxldGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwdWJTdWIucHVibGlzaCgnZGVsZXRlUHJvamVjdFByZXNzZWQnKTtcbiAgICB9KTtcbiAgICBuZXdQcm9qZWN0LmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xuXG4gICAgcmV0dXJuIG5ld1Byb2plY3Q7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBnZXRQcm9qZWN0cyB9IGZyb20gJy4vU3RvcmFnZSc7IFxuXG5cbi8vIGxvY2FsU3RvcmFnZS5jbGVhcigpOyAvL0RFQlVHXG5cbmV4cG9ydCBsZXQgcHJvamVjdHMgPSBnZXRQcm9qZWN0cygpO1xuXG4vLyBERUJVR1xuaWYgKHByb2plY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgnUEZHJyk7XG4gICAgY29uc3QgdGFzazEgPSBuZXcgVGFzaygnRG8gdGhpbmcnLCAnRGVzYzEnKTtcbiAgICBjb25zdCB0YXNrMiA9IG5ldyBUYXNrKCdEbyBPdGhlciBUaGluZycsICdEZXNjMicpO1xuICAgIG5ld1Byb2plY3QudGFza3MucHVzaCh0YXNrMSk7XG4gICAgbmV3UHJvamVjdC50YXNrcy5wdXNoKHRhc2syKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnLCBwcm9qZWN0cyk7XG59XG5cbmxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzWzBdO1xuXG5wdWJTdWIuc3Vic2NyaWJlKCduZXdUYXNrU2F2ZWQnLCBzYXZlTmV3VGFzayk7XG5cbmZ1bmN0aW9uIHNhdmVOZXdUYXNrKFt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5XSkge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICBjdXJyZW50UHJvamVjdC50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0VGFza3NVcGRhdGVkJywgY3VycmVudFByb2plY3QpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnLCBwcm9qZWN0cyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3Rhc2tDb21wbGV0ZWQnLCBzZXRUYXNrQ29tcGxldGVkKTtcblxuZnVuY3Rpb24gc2V0VGFza0NvbXBsZXRlZChpZCkge1xuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2sgPSBjdXJyZW50UHJvamVjdC50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5pZCA9PT0gaWQpO1xuICAgIGNvbXBsZXRlZFRhc2suY29tcGxldGVkID0gIWNvbXBsZXRlZFRhc2suY29tcGxldGVkO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdFRhc2tzVXBkYXRlZCcsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJywgcHJvamVjdHMpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCdkZWxldGVUYXNrUHJlc3NlZCcsIHJlbW92ZVRhc2spO1xuXG5mdW5jdGlvbiByZW1vdmVUYXNrKGlkKSB7XG4gICAgY29uc3QgdGFza1RvRGVsZXRlID0gY3VycmVudFByb2plY3QudGFza3MuZmluZChcbiAgICAgICAgKHRhc2spID0+IHRhc2suaWQgPT09IGlkXG4gICAgKTtcbiAgICBjdXJyZW50UHJvamVjdC50YXNrcy5zcGxpY2UoY3VycmVudFByb2plY3QudGFza3MuaW5kZXhPZih0YXNrVG9EZWxldGUpLCAxKTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdFRhc2tzVXBkYXRlZCcsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICBwdWJTdWIucHVibGlzaCgncHJvamVjdHNVcGRhdGVkJywgcHJvamVjdHMpO1xufVxuXG5wdWJTdWIuc3Vic2NyaWJlKCduZXdQcm9qZWN0U2F2ZWQnLCBzYXZlTmV3UHJvamVjdCk7XG5cbmZ1bmN0aW9uIHNhdmVOZXdQcm9qZWN0KFtuYW1lXSkge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnLCBwcm9qZWN0cyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2RlbGV0ZVByb2plY3RQcmVzc2VkJywgcmVtb3ZlUHJvamVjdCk7XG5cbmZ1bmN0aW9uIHJlbW92ZVByb2plY3QobmFtZSkge1xuICAgIGNvbnN0IHByb2plY3RUb0RlbGV0ZSA9IHByb2plY3RzLmZpbmQoXG4gICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IG5hbWVcbiAgICApO1xuICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0cy5pbmRleE9mKHByb2plY3RUb0RlbGV0ZSksIDEpO1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdwcm9qZWN0c1VwZGF0ZWQnLCBwcm9qZWN0cyk7XG59XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ2N1cnJlbnRQcm9qZWN0Q2hhbmdlZCcsIGNoYW5nZUN1cnJlbnRQcm9qZWN0KTtcblxuZnVuY3Rpb24gY2hhbmdlQ3VycmVudFByb2plY3QobmV3Q3VycmVudFByb2plY3QpIHtcbiAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IG5ld0N1cnJlbnRQcm9qZWN0Lm5hbWVcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcbn0iLCJleHBvcnQgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrQnRuJyk7XG5leHBvcnQgY29uc3Qgc2F2ZVRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZVRhc2tCdG4nKTtcbmV4cG9ydCBjb25zdCBjYW5jZWxUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbFRhc2tCdG4nKTtcblxuZXhwb3J0IGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tGb3JtJyk7XG5leHBvcnQgY29uc3QgbmV3VGFza0ZpZWxkcyA9IHtcbiAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tUaXRsZScpLFxuICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza0Rlc2NyaXB0aW9uJyksXG4gICAgZHVlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tEdWVEYXRlJyksXG4gICAgcHJpb3JpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrUHJpb3JpdHknKSxcbn07XG5cbmV4cG9ydCBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTGlzdCcpO1xuXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0QnRuJyk7XG5leHBvcnQgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3UHJvamVjdEZvcm0nKTtcbmV4cG9ydCBjb25zdCBuZXdQcm9qZWN0RmllbGRzID0ge1xuICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdQcm9qZWN0TmFtZScpLFxufTtcbmV4cG9ydCBjb25zdCBzYXZlUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlUHJvamVjdEJ0bicpO1xuZXhwb3J0IGNvbnN0IGNhbmNlbFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FuY2VsUHJvamVjdEJ0bicpO1xuXG5leHBvcnQgY29uc3QgZnVsbHNjcmVlbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mdWxsc2NyZWVuQ29udGFpbmVyJyk7IiwiZXhwb3J0IGNvbnN0IGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBldmVudHMgPSB7fTtcblxuICAgIGNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1B1Ymxpc2hlZCcsIGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0uZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgfVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50XSA9IGV2ZW50c1tldmVudF0uZmlsdGVyKChmdW5jKSA9PiBmdW5jICE9IGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2gsXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICAgICAgdW5zdWJzY3JpYmUsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21vZHVsZXMvY29udHJvbGxlcidcbmltcG9ydCAnLi9tb2R1bGVzL1VJJztcbmltcG9ydCAnLi9tb2R1bGVzL1N0b3JhZ2UnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9