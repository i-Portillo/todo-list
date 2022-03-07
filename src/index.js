import Project from './modules/Project';
import Task from './modules/Task';
import { events as pubSub } from './modules/events'
import './modules/UI';
import './modules/controller'

let projects = [];

projects.push(new Project('PFG'));
pubSub.subscribe('addTaskPressed', addTaskToProject);

function addTaskToProject(task) {
    projects[0].addTask(task);
    console.log(projects[0].tasks.length);
};
