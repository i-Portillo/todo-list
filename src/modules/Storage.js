import { events as pubSub } from './events';
import Project from './Project';
import Task from './Task';

// TODO revamp module so it can compose Objects with functions and 
// avoid storing and retrieving all the projects.

pubSub.subscribe('projectsUpdated', storeProjects);

function storeProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
    pubSub.publish('projectsStored');
}

export function getProjects() {
    const projects = (JSON.parse(localStorage.getItem('projects')) || [])
        .map((project) => Object.assign(new Project(), project));
    projects.forEach(project => {
        project.tasks = project.tasks
            .map((task) => Object.assign(new Task(), task));
    });
    console.log(projects);
    return projects;
}
