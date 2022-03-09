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

    addTask(newTask) {
        this.tasks.push(newTask);
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
// pubSub.subscribe('windowLoad', renderTaskList);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('projectTasksUpdated', renderTaskList);

_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('addTaskPressed', displayNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('saveTaskPressed', hideNewTaskForm);
_events__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('cancelTaskPressed', hideNewTaskForm);

let projects = JSON.parse(localStorage.getItem('projects')) || [];

function displayNewTaskForm() {
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.newTaskForm.classList.remove('hidden');
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    _domCollector__WEBPACK_IMPORTED_MODULE_3__.addTaskBtn.disabled = false;
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
        const newTask = document.createElement('li');
        newTask.textContent = task.title;
        _domCollector__WEBPACK_IMPORTED_MODULE_3__.taskList.appendChild(newTask);
    });
}


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





localStorage.clear(); //DEBUG

let projects = JSON.parse(localStorage.getItem('projects')) || [];

if (projects.length === 0) {
    const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]('PFG');
    const task1 = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Do thing', 'Desc1');
    const task2 = new _Task__WEBPACK_IMPORTED_MODULE_1__["default"]('Do Other Thing', 'Desc2');
    newProject.addTask(task1);
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
}



// projects.push(new Project('PFG'));
// projects.push(new Project('Todo-list'));

// projects[0].addTask(new Task('Start', 'Today'));
// projects[0].addTask(new Task('Make some progress', 'Tomorrow'));

// projects[1].addTask(new Task('Make it'));

// localStorage.setItem('projects',
//     JSON.stringify(projects)
// );

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
/* harmony import */ var _modules_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/controller */ "./src/modules/controller.js");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");






// const task = new Task('Test', 'Desc Test');

// let projects = [];

// projects.push(new Project('PFG'));
// pubSub.subscribe('addTaskPressed', addTaskToProject);

// function addTaskToProject(task) {
//     projects[0].addTask(task);
//     console.log(projects[0].tasks.length);
// };

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbUNvbGxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi9UYXNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayhuZXdUYXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHRhc2tUb0RlbGV0ZSA9ICB0aGlzLnRhc2tzLmZpbmQoXG4gICAgICAgICAgICAodGFzaykgPT4gdGFzay5nZXRJZCgpID09PSBpZFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZSh0aGlzLnRhc2tzLmluZGV4T2YodGFza1RvRGVsZXRlKSwgMSk7XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlID0gXCJObyBkYXRlXCIsIHByaW9yaXR5ID0gMSkge1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tQ29sbGVjdG9yJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnd2luZG93TG9hZCcpKTtcblxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idG4nKTtcbi8vIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stYnRuJyk7XG5cbi8vIGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tGb3JtJyk7XG5cbmRvbS5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcHViU3ViLnB1Ymxpc2goJ2FkZFRhc2tQcmVzc2VkJykpO1xuZG9tLnNhdmVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHB1YlN1Yi5wdWJsaXNoKCdzYXZlVGFza1ByZXNzZWQnKTtcbiAgICBwdWJTdWIucHVibGlzaCgnbmV3VGFza1NhdmVkJywgW1xuICAgICAgICBkb20ubmV3VGFza0ZpZWxkcy50aXRsZS52YWx1ZSxcbiAgICAgICAgZG9tLm5ld1Rhc2tGaWVsZHMuZGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLmR1ZURhdGUudmFsdWUsXG4gICAgICAgIGRvbS5uZXdUYXNrRmllbGRzLnByaW9yaXR5LnZhbHVlLFxuICAgIF0pO1xufSk7XG5kb20uY2FuY2VsVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHB1YlN1Yi5wdWJsaXNoKCdjYW5jZWxUYXNrUHJlc3NlZCcpKTtcblxuZG9tLmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwdWJTdWIucHVibGlzaCgnYWRkUHJvamVjdFByZXNzZWQnKSk7XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ3dpbmRvd0xvYWQnLCByZW5kZXJGaXJzdExvYWQpO1xuLy8gcHViU3ViLnN1YnNjcmliZSgnd2luZG93TG9hZCcsIHJlbmRlclRhc2tMaXN0KTtcblxucHViU3ViLnN1YnNjcmliZSgncHJvamVjdFRhc2tzVXBkYXRlZCcsIHJlbmRlclRhc2tMaXN0KTtcblxucHViU3ViLnN1YnNjcmliZSgnYWRkVGFza1ByZXNzZWQnLCBkaXNwbGF5TmV3VGFza0Zvcm0pO1xucHViU3ViLnN1YnNjcmliZSgnc2F2ZVRhc2tQcmVzc2VkJywgaGlkZU5ld1Rhc2tGb3JtKTtcbnB1YlN1Yi5zdWJzY3JpYmUoJ2NhbmNlbFRhc2tQcmVzc2VkJywgaGlkZU5ld1Rhc2tGb3JtKTtcblxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG5cbmZ1bmN0aW9uIGRpc3BsYXlOZXdUYXNrRm9ybSgpIHtcbiAgICBkb20ubmV3VGFza0Zvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgZG9tLmFkZFRhc2tCdG4uZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuZnVuY3Rpb24gaGlkZU5ld1Rhc2tGb3JtKCkge1xuICAgIG5ld1Rhc2tGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGRvbS5hZGRUYXNrQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgLy9jbGVhck5ld1Rhc2tGb3JtKCk7XG59O1xuXG5mdW5jdGlvbiBjbGVhck5ld1Rhc2tGb3JtKCkge1xuICAgIGRvbS5uZXdUYXNrRmllbGRzLnRpdGxlLnZhbHVlID0gbnVsbDtcbiAgICBkb20ubmV3VGFza0ZpZWxkcy5kZXNjcmlwdGlvbi52YWx1ZSA9IG51bGw7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMuZHVlRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgZG9tLm5ld1Rhc2tGaWVsZHMucHJpb3JpdHkudmFsdWUgPSBudWxsO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGaXJzdExvYWQoKSB7XG4gICAgcmVuZGVyUHJvamVjdExpc3QoKTtcbiAgICByZW5kZXJUYXNrTGlzdChwcm9qZWN0c1swXS50YXNrcylcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3UHJvamVjdC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgICAgIG5ld1Byb2plY3QuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICBgPHAgY2xhc3M9XCJwcm9qZWN0LW5hbWVcIj4ke3Byb2plY3QubmFtZX08L3A+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPGxpPlRvZGF5PC9saT5cbiAgICAgICAgICAgICAgICA8bGk+VGhpcyB3ZWVrPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+QWxsIHRhc2tzPC9saT5cbiAgICAgICAgICAgIDwvdWw+YDtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobmV3UHJvamVjdCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0KHRhc2tzKSB7XG4gICAgZG9tLnRhc2tMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIG5ld1Rhc2sudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgICAgICBkb20udGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFzayk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7IGV2ZW50cyBhcyBwdWJTdWIgfSBmcm9tICcuL2V2ZW50cyc7XG5cblxubG9jYWxTdG9yYWdlLmNsZWFyKCk7IC8vREVCVUdcblxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG5cbmlmIChwcm9qZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoJ1BGRycpO1xuICAgIGNvbnN0IHRhc2sxID0gbmV3IFRhc2soJ0RvIHRoaW5nJywgJ0Rlc2MxJyk7XG4gICAgY29uc3QgdGFzazIgPSBuZXcgVGFzaygnRG8gT3RoZXIgVGhpbmcnLCAnRGVzYzInKTtcbiAgICBuZXdQcm9qZWN0LmFkZFRhc2sodGFzazEpO1xuICAgIG5ld1Byb2plY3QudGFza3MucHVzaCh0YXNrMik7XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgY29uc29sZS5sb2cocHJvamVjdHNbMF0udGFza3NbMF0udGl0bGUpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1swXS50YXNrc1sxXS50aXRsZSk7XG5cbiAgICBwcm9qZWN0c1swXS50YXNrc1swXS50aXRsZSA9ICdXVEYnO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1swXS50YXNrc1swXS50aXRsZSk7XG5cbn1cblxubGV0IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbMF07XG5cbnB1YlN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2tTYXZlZCcsIHNhdmVOZXdUYXNrKTtcblxuZnVuY3Rpb24gc2F2ZU5ld1Rhc2soW3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHldKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIGN1cnJlbnRQcm9qZWN0LnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgcHViU3ViLnB1Ymxpc2goJ3Byb2plY3RUYXNrc1VwZGF0ZWQnLCBjdXJyZW50UHJvamVjdC50YXNrcyk7XG59XG5cblxuXG4vLyBwcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdQRkcnKSk7XG4vLyBwcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdUb2RvLWxpc3QnKSk7XG5cbi8vIHByb2plY3RzWzBdLmFkZFRhc2sobmV3IFRhc2soJ1N0YXJ0JywgJ1RvZGF5JykpO1xuLy8gcHJvamVjdHNbMF0uYWRkVGFzayhuZXcgVGFzaygnTWFrZSBzb21lIHByb2dyZXNzJywgJ1RvbW9ycm93JykpO1xuXG4vLyBwcm9qZWN0c1sxXS5hZGRUYXNrKG5ldyBUYXNrKCdNYWtlIGl0JykpO1xuXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLFxuLy8gICAgIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKVxuLy8gKTsiLCJleHBvcnQgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUYXNrQnRuJyk7XG5leHBvcnQgY29uc3Qgc2F2ZVRhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZVRhc2tCdG4nKTtcbmV4cG9ydCBjb25zdCBjYW5jZWxUYXNrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbFRhc2tCdG4nKTtcblxuZXhwb3J0IGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tGb3JtJyk7XG5leHBvcnQgY29uc3QgbmV3VGFza0ZpZWxkcyA9IHtcbiAgICB0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tUaXRsZScpLFxuICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VGFza0Rlc2NyaXB0aW9uJyksXG4gICAgZHVlRGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1Rhc2tEdWVEYXRlJyksXG4gICAgcHJpb3JpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdUYXNrUHJpb3JpdHknKSxcbn07XG5cbmV4cG9ydCBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrTGlzdCcpO1xuXG5leHBvcnQgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0QnRuJyk7IiwiZXhwb3J0IGNvbnN0IGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBldmVudHMgPSB7fTtcblxuICAgIGNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1B1Ymxpc2hlZCcsIGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudF0uZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgfVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50XSA9IGV2ZW50c1tldmVudF0uZmlsdGVyKChmdW5jKSA9PiBmdW5jICE9IGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHB1Ymxpc2gsXG4gICAgICAgIHN1YnNjcmliZSxcbiAgICAgICAgdW5zdWJzY3JpYmUsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9tb2R1bGVzL1Byb2plY3QnO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi9tb2R1bGVzL1Rhc2snO1xuaW1wb3J0IHsgZXZlbnRzIGFzIHB1YlN1YiB9IGZyb20gJy4vbW9kdWxlcy9ldmVudHMnXG5pbXBvcnQgJy4vbW9kdWxlcy9jb250cm9sbGVyJ1xuaW1wb3J0ICcuL21vZHVsZXMvVUknO1xuXG4vLyBjb25zdCB0YXNrID0gbmV3IFRhc2soJ1Rlc3QnLCAnRGVzYyBUZXN0Jyk7XG5cbi8vIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4vLyBwcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdQRkcnKSk7XG4vLyBwdWJTdWIuc3Vic2NyaWJlKCdhZGRUYXNrUHJlc3NlZCcsIGFkZFRhc2tUb1Byb2plY3QpO1xuXG4vLyBmdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KHRhc2spIHtcbi8vICAgICBwcm9qZWN0c1swXS5hZGRUYXNrKHRhc2spO1xuLy8gICAgIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLnRhc2tzLmxlbmd0aCk7XG4vLyB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9