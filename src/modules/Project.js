import { events as pubSub } from './events';
import { Task } from './Task';

export default class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    get name () {
        return this._name;
    }

    set name (value) {
        if (value) {
            this._name = value;
        }
    }

    get tasks () {
        return this._tasks;
    }

    set tasks (value) {
        if (value) {
            this._tasks = value;
        } else {
            this._tasks = [];
        }
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    // removeTask(id) {
    //     const taskToDelete =  this.tasks.find(
    //         (task) => task.getId() === id
    //     );
    //     this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
    // }

}