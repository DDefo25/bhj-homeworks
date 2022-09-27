class UploadForm{
    constructor(container) {
        this.container = container;
        this.barEl = container.querySelector('#progress');
        this.formEl = container.querySelector('#form');

        this.registerEvent();
    }

    registerEvent() {
        this.formEl.addEventListener('submit', (e) => {
            this.uploadForm();
            e.preventDefault();
        }) 
    }

    uploadForm() {
        const form = new FormData( this.formEl );
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
        xhr.upload.onprogress = e => {
            this.barEl.value = (e.loaded / e.total).toFixed(1);
        }
        xhr.send(form);
    }
}

const uploadForm1 = new UploadForm( document.querySelector('.card') );