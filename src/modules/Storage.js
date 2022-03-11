import { events as pubSub } from './events';
import { projects } from './controller';

// TODO revamp module so it can compose Objects with functions and 
// avoid storing and retrieving all the projects.

pubSub.subscribe('projectsUpdated', storeProjects);

function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
    pubSub.publish('projectsStored');
}

export function retrieveProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}
