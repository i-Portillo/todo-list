import Project from './Project';
import Task from './Task';
import { events as pubSub } from './events';


// localStorage.clear(); //DEBUG

export let projects = JSON.parse(localStorage.getItem('projects')) || [];

if (projects.length === 0) {
    const newProject = new Project('PFG');
    const task1 = new Task('Do thing', 'Desc1');
    const task2 = new Task('Do Other Thing', 'Desc2');
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

pubSub.subscribe('newTaskSaved', saveNewTask);

function saveNewTask([title, description, dueDate, priority]) {
    const newTask = new Task(title, description, dueDate, priority);
    currentProject.tasks.push(newTask);
    pubSub.publish('projectTasksUpdated', currentProject.tasks);
    pubSub.publish('projectsUpdated');
}

pubSub.subscribe('taskCompleted', setTaskCompleted);

function setTaskCompleted(id) {
    const completedTask = currentProject.tasks.find(task => task.id === id);
    completedTask.completed = !completedTask.completed;
    console.log(currentProject);
    pubSub.publish('projectTasksUpdated', currentProject.tasks);
    pubSub.publish('projectsUpdated');
}

pubSub.subscribe('deleteTaskPressed', removeTask);

function removeTask(id) {
    // currentProject.removeTask(id);
    const taskToDelete = currentProject.tasks.find(
        (task) => task.id === id
    );
    currentProject.tasks.splice(currentProject.tasks.indexOf(taskToDelete), 1);
    pubSub.publish('projectTasksUpdated', currentProject.tasks);
    pubSub.publish('projectsUpdated');
}