import { events as pubSub } from './events';
import Project from './Project';
import Task from './Task';

const addProjectBtn = document.getElementById('add-project-btn');
const addTaskBtn = document.getElementById('add-task-btn');

const newTaskForm = document.getElementById('new-task-box');

addTaskBtn.addEventListener('click', () => pubSub.publish('addTaskPressed'));
// addProjectBtn.addEventListener('click', () => pubSub.publish('addProjectPressed'));

pubSub.subscribe('addTaskPressed', displayNewTaskForm);

function displayNewTaskForm() {
    newTaskForm.classList.remove('hidden');
    pubSub.unsubscribe('addTaskPressed', displayNewTaskForm);
    pubSub.subscribe('addTaskPressed', hideNewTaskForm);
};

function hideNewTaskForm() {
    newTaskForm.classList.add('hidden');
    pubSub.unsubscribe('addTaskPressed', hideNewTaskForm);
    pubSub.subscribe('addTaskPressed', displayNewTaskForm);
};
