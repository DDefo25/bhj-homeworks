class Planner {
    constructor( container ) {
        this.container = container;
        this.taskInput = container.querySelector('.tasks__input');
        this.taskAddBtn = container.querySelector('.tasks__add');
        this.taskList = container.querySelector('.tasks__list');
        
        this.tasksStorage = window.localStorage;
        this.renderTasksFromStorage();

        this.registerEvents();
    }

    registerEvents() {
        this.taskAddBtn.addEventListener('click', event => {
            event.preventDefault();
            const value = this.getTaskValue();
            const id = this.getTaskId();
            if ( value ) {
                this.createTaskEl( id, value );
                this.addTaskToStorage( id, value )
            };
        })
    }

    getTaskValue() {
        const task = this.taskInput.value;
        this.taskInput.value = '';
        return task;
    }

    getTaskId() {
        const getRandomId = () => Math.round(Math.random() * 100000);
        let id = getRandomId();
        while ( id in this.tasksStorage ) {
            id = getRandomId();
        }
        return id;        
    }

    createTaskEl( id, value ) {
        const task = document.createElement('div');
        task.className = 'task';
        task.dataset.id = id;
        task.innerHTML = `
            <div class="task__title">${value}</div>
            <a href="#" class="task__remove">&times;</a>
        `;

        const taskRemover = task.querySelector('.task__remove');
        taskRemover.onclick = () => this.removeTask( taskRemover );

        this.taskList.appendChild( task );

    }

    removeTask( el ) {
        const taskEl = el.closest('.task');
        this.tasksStorage.removeItem(taskEl.dataset.id);
        taskEl.remove();
    }

    addTaskToStorage( id, value ) {
        this.tasksStorage.setItem( id, value );
    }

    renderTasksFromStorage() {
        for( let i = 0; i < this.tasksStorage.length; i++ ) {
            const id = this.tasksStorage.key(i);
            const value = this.tasksStorage.getItem(id);
            this.createTaskEl(id, value);
        }
    }
 
}

const planner1 = new Planner(document.querySelector('.card'));