import { events as pubSub } from './events';
import { projects } from './controller';

pubSub.subscribe('projectsUpdated', storeProjects);

function storeProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function retrieveProjects() {
    return JSON.parse(localStorage.getItem('projects'));
}
