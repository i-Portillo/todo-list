import Project from './Project';
import Task from './Task';
import { events as pubSub } from './events';

let projects = [];
projects.push(new Project('PFG'));
projects.push(new Project('Todo-list'));

projects[0].addTask(new Task('Start', 'Today'));
projects[0].addTask(new Task('Make some progress', 'Tomorrow'));

projects[1].addTask(new Task('Make it'));

localStorage.setItem('projects',
    JSON.stringify(projects)
);