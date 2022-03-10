import { events as pubSub } from './events';
import Project from './Project';
import Task from './Task';
import * as dom from './domCollector';
import { de } from 'date-fns/locale';

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

pubSub.subscribe('projectTasksUpdated', renderTaskList);

pubSub.subscribe('addTaskPressed', displayNewTaskForm);
pubSub.subscribe('saveTaskPressed', hideNewTaskForm);
pubSub.subscribe('cancelTaskPressed', hideNewTaskForm);

let projects = JSON.parse(localStorage.getItem('projects')) || [];

function displayNewTaskForm() {
    dom.newTaskForm.classList.remove('hidden');
    // dom.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    // dom.addTaskBtn.disabled = false;
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
        dom.taskList.appendChild(buildTask(task));
    });
}

pubSub.subscribe('addTaskPressed', fadeBackground);

function fadeBackground() {
    dom.fullscreenContainer.classList.remove('hidden');
}

pubSub.subscribe('saveTaskPressed', clearFadedBackground);
pubSub.subscribe('cancelTaskPressed', clearFadedBackground);

function clearFadedBackground() {
    dom.fullscreenContainer.classList.add('hidden');
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
        pubSub.publish('taskCompleted', task.id);
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
        pubSub.publish('deleteTaskPressed', task.id);
    });
    newTask.appendChild(deleteTaskBtn);
    return newTask;
}
