import Project from './Project';
import Task from './Task';
import { events as pubSub } from './events';


localStorage.clear(); //DEBUG

let projects = JSON.parse(localStorage.getItem('projects')) || [];

if (projects.length === 0) {
    const newProject = new Project('PFG');
    const task1 = new Task('Do thing', 'Desc1');
    const task2 = new Task('Do Other Thing', 'Desc2');
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

pubSub.subscribe('newTaskSaved', saveNewTask);

function saveNewTask([title, description, dueDate, priority]) {
    const newTask = new Task(title, description, dueDate, priority);
    currentProject.tasks.push(newTask);
    pubSub.publish('projectTasksUpdated', currentProject.tasks);
}



// projects.push(new Project('PFG'));
// projects.push(new Project('Todo-list'));

// projects[0].addTask(new Task('Start', 'Today'));
// projects[0].addTask(new Task('Make some progress', 'Tomorrow'));

// projects[1].addTask(new Task('Make it'));

// localStorage.setItem('projects',
//     JSON.stringify(projects)
// );