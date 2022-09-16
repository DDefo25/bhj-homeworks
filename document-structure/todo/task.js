class Planner {
    constructor( container ) {
        this.container = container;
        this.taskInput = container.querySelector('.tasks__input');
        this.taskAddBtn = container.querySelector('.tasks__add');
        this.taskListEl = container.querySelector('.tasks__list');
        this.taskList = [];
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
                this.addTask( id, value )
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

        this.taskListEl.appendChild( task );

    }

    removeTask( el ) {
        const taskEl = el.closest('.task');
        const taskIndex = this.taskList.findIndex(el => el.id === taskEl.dataset.id)
        this.taskList.splice(taskIndex, 1);
        this.tasksStorage.setItem('tasks', JSON.stringify(this.taskList));
        taskEl.remove();
    }

    addTask( id, value ) {
        const task = {
            id,
            value,
        }
        this.taskList.push(task);
        this.tasksStorage.setItem('tasks', JSON.stringify(this.taskList));
    }

    renderTasksFromStorage() {
        if (this.tasksStorage.getItem('tasks')) {
            this.taskList = JSON.parse(this.tasksStorage.getItem('tasks'));
            console.log(this.taskList);
            this.taskList.forEach(el => {
                let {id, value} = el;
                this.createTaskEl(id, value);
            })
        }
    }
 
}

const planner1 = new Planner(document.querySelector('.card'));