import { events as pubSub } from './events';
import Project from './Project';
import Task from './Task';
import * as dom from './domCollector';

window.addEventListener('load', () => pubSub.publish('windowLoad'));

const addProjectBtn = document.getElementById('add-project-btn');
// const addTaskBtn = document.getElementById('add-task-btn');

// const newTaskForm = document.getElementById('newTaskForm');

dom.addTaskBtn.addEventListener('click', () => pubSub.publish('addTaskPressed'));
dom.saveTaskBtn.addEventListener('click', () => {
    pubSub.publish('saveTaskPressed');
    pubSub.publish('newTaskSaved', [
        dom.newTaskFields.title.value,
        dom.newTaskFields.description.value,
        dom.newTaskFields.dueDate.value,
        dom.newTaskFields.priority.value,
    ]);
});
dom.cancelTaskBtn.addEventListener('click', () => pubSub.publish('cancelTaskPressed'));

dom.addProjectBtn.addEventListener('click', () => pubSub.publish('addProjectPressed'));

pubSub.subscribe('windowLoad', renderFirstLoad);
// pubSub.subscribe('windowLoad', renderTaskList);

pubSub.subscribe('projectTasksUpdated', renderTaskList);

pubSub.subscribe('addTaskPressed', displayNewTaskForm);
pubSub.subscribe('saveTaskPressed', hideNewTaskForm);
pubSub.subscribe('cancelTaskPressed', hideNewTaskForm);

let projects = JSON.parse(localStorage.getItem('projects')) || [];

function displayNewTaskForm() {
    dom.newTaskForm.classList.remove('hidden');
    dom.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    dom.addTaskBtn.disabled = false;
    //clearNewTaskForm();
};

function clearNewTaskForm() {
    dom.newTaskFields.title.value = null;
    dom.newTaskFields.description.value = null;
    dom.newTaskFields.dueDate.value = null;
    dom.newTaskFields.priority.value = null;
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
    dom.taskList.textContent = '';
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.textContent = task.title;
        dom.taskList.appendChild(newTask);
    });
}
