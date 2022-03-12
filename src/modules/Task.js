export default class Task {
    constructor(title, description, dueDate = "No date", priority = 1, completed = false, id = null) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
    }

    get id () {
        return this._id;
    }

    set id (value) {
        if (value) {
            this._id = value;
        } else {
            this._id = Math.random().toString(16).slice(2);
        }
    }

    get title () {
        return this._title;
    }

    set title (value) {
        if (value) {
            this._title = value;
        }
    }

    get description () {
        return this._description;
    }

    set description (value) {
        if (value) {
            this._description = value;
        }
    }

    get dueDate () {
        return this._dueDate;
    }

    set dueDate (value) {
        if (value) {
            this._dueDate = value;
        }
    }

    get priority () {
        return this._priority;
    }

    set priority (value) {
        if (value >= 1 && value <= 5) {
            this._priority = value;
        }
    }

    get completed () {
        return this._completed;
    }

    set completed (value) {
        if (value !== null) {
            this._completed = value;
        }
    }
}

function setId (value) {
    if (!this._id) {
        this._id = Math.random().toString(16).slice(2);
    } else {
        this._id = value;
    }
}
