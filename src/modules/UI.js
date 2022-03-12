import { events as pubSub } from './events';
import Project from './Project';
import Task from './Task';
import * as dom from './domCollector';
import { getProjects } from './Storage';
// import { de } from 'date-fns/locale';

window.addEventListener('load', () => pubSub.publish('windowLoad'));

dom.addProjectBtn.addEventListener('click', () => pubSub.publish('addProjectPressed'));

dom.addTaskBtn.addEventListener('click', () => pubSub.publish('addTaskPressed'));
dom.saveTaskBtn.addEventListener('click', () => {
    pubSub.publish('newTaskSaved', [
        dom.newTaskFields.title.value,
        dom.newTaskFields.description.value,
        dom.newTaskFields.dueDate.value,
        dom.newTaskFields.priority.value,
    ]);
    pubSub.publish('saveTaskPressed');
});
dom.cancelTaskBtn.addEventListener('click', () => pubSub.publish('cancelTaskPressed'));

dom.addProjectBtn.addEventListener('click', () => pubSub.publish('addProjectPressed'));
dom.saveProjectBtn.addEventListener('click', () => {
    pubSub.publish('newProjectSaved', [
        dom.newProjectFields.name.value,
    ]);
    pubSub.publish('saveProjectPressed');
});
dom.cancelProjectBtn.addEventListener('click', () => pubSub.publish('cancelProjectPressed'));

pubSub.subscribe('windowLoad', renderFirstLoad);

pubSub.subscribe('projectTasksUpdated', renderTaskList);

pubSub.subscribe('addTaskPressed', displayNewTaskForm);
pubSub.subscribe('saveTaskPressed', hideNewTaskForm);
pubSub.subscribe('cancelTaskPressed', hideNewTaskForm);

function displayNewTaskForm() {
    dom.newTaskForm.classList.remove('hidden');
    // dom.addTaskBtn.disabled = true;
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    // dom.addTaskBtn.disabled = false;
    clearNewTaskForm();
};

function clearNewTaskForm() {
    dom.newTaskFields.title.value = null;
    dom.newTaskFields.description.value = null;
    dom.newTaskFields.dueDate.value = null;
    dom.newTaskFields.priority.value = null;
}

pubSub.subscribe('addProjectPressed', displayNewProjectForm);

function displayNewProjectForm() {
    dom.newProjectForm.classList.remove('hidden');
}

pubSub.subscribe('saveProjectPressed', hideNewProjectForm);
pubSub.subscribe('cancelProjectPressed', hideNewProjectForm);

function hideNewProjectForm() {
    dom.newProjectForm.classList.add('hidden');
}

function renderFirstLoad() {
    renderProjectList();
    renderTaskList(getProjects()[0].tasks)
}

pubSub.subscribe('projectsStored', renderProjectList);

function renderProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    getProjects().forEach(project => {
        projectList.appendChild(buildProject(project));
    });
}

function renderTaskList(tasks) {
    dom.taskList.textContent = '';
    tasks.forEach(task => {
        dom.taskList.appendChild(buildTask(task));
    });
}

pubSub.subscribe('addTaskPressed', fadeBackground);
pubSub.subscribe('addProjectPressed', fadeBackground);

function fadeBackground() {
    dom.fullscreenContainer.classList.remove('hidden');
}

pubSub.subscribe('saveTaskPressed', clearFadedBackground);
pubSub.subscribe('cancelTaskPressed', clearFadedBackground);
pubSub.subscribe('saveProjectPressed', clearFadedBackground);
pubSub.subscribe('cancelProjectPressed', clearFadedBackground);

function clearFadedBackground() {
    dom.fullscreenContainer.classList.add('hidden');
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
