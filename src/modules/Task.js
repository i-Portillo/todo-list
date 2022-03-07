import { events as pubSub } from './events';

export default class Task {
    constructor(title, description, dueDate = "No date", priority = 1) {
        this._id = Math.random().toString(16).slice(2);
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = false;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (value) {
            this._title = value;
        }
    }

    get description() {
        return this._description;
    }

    set description(value)  {
        if (value) {
            this._description = value;
        }
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        if (value) {
            this._dueDate = value;
        }
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if(Number.isInteger(value) && (value >= 1 && value <= 5)) {
            this._priority = value;
        }
    }

    get completed() {
        return this._completed;
    };

    set completed(value) {
        if (value !== null) {
            this._completed = value;
        }
    }

}

