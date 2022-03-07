import { events as pubSub } from './events';
import Task from './Task';

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        console.log("Setting project name.")
        if (newName) {
            this._name = newName;
        }
    }

    addTask() {
        this.tasks.push(new Task('Do thing'));
    }

    removeTask(id) {
        const taskToDelete =  this.tasks.find(
            (task) => task.getId() === id
        );
        this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
    }

}