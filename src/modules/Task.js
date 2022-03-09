export default class Task {
    constructor(title, description, dueDate = "No date", priority = 1) {
        this.id = Math.random().toString(16).slice(2);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}
