import { events as pubSub } from './events';
import { Task } from './Task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    removeTask(id) {
        const taskToDelete =  this.tasks.find(
            (task) => task.getId() === id
        );
        this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
    }

}