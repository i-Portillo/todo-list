import Project from './Project';
import Task from './Task';
import { events as pubSub } from './events';
import { getProjects } from './Storage'; 


// localStorage.clear(); //DEBUG

export let projects = getProjects();

// DEBUG
if (projects.length === 0) {
    const newProject = new Project('PFG');
    const task1 = new Task('Do thing', 'Desc1');
    const task2 = new Task('Do Other Thing', 'Desc2');
    newProject.tasks.push(task1);
    newProject.tasks.push(task2);
    projects.push(newProject);
    pubSub.publish('projectsUpdated', projects);
}

let currentProject = projects[0];

pubSub.subscribe('newTaskSaved', saveNewTask);

function saveNewTask([title, description, dueDate, priority]) {
    const newTask = new Task(title, description, dueDate, priority);
    currentProject.tasks.push(newTask);
    pubSub.publish('projectTasksUpdated', currentProject);
    pubSub.publish('projectsUpdated', projects);
}

pubSub.subscribe('taskCompleted', setTaskCompleted);

function setTaskCompleted(id) {
    const completedTask = currentProject.tasks.find(task => task.id === id);
    completedTask.completed = !completedTask.completed;
    console.log(currentProject);
    pubSub.publish('projectTasksUpdated', currentProject);
    pubSub.publish('projectsUpdated', projects);
}

pubSub.subscribe('deleteTaskPressed', removeTask);

function removeTask(id) {
    const taskToDelete = currentProject.tasks.find(
        (task) => task.id === id
    );
    currentProject.tasks.splice(currentProject.tasks.indexOf(taskToDelete), 1);
    pubSub.publish('projectTasksUpdated', currentProject);
    pubSub.publish('projectsUpdated', projects);
}

pubSub.subscribe('newProjectSaved', saveNewProject);

function saveNewProject([name]) {
    const newProject = new Project(name);
    projects.push(newProject);
    pubSub.publish('projectsUpdated', projects);
}

pubSub.subscribe('deleteProjectPressed', removeProject);

function removeProject(name) {
    const projectToDelete = projects.find(
        (project) => project.name === name
    );
    projects.splice(projects.indexOf(projectToDelete), 1);
    pubSub.publish('projectsUpdated', projects);
}

pubSub.subscribe('currentProjectChanged', changeCurrentProject);

function changeCurrentProject(newCurrentProject) {
    currentProject = projects.find(
        (project) => project.name === newCurrentProject.name
    );
    console.log(currentProject);
}