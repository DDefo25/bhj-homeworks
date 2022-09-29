class Signin {
    constructor(signin, welcome) {
        this.signin = signin;
        this.welcome = welcome;
        this.form = signin.querySelector('#signin__form');

        this.checkLogin();
        this.registerEvent();
    }

    checkLogin() {
        const user = localStorage.getItem('userId');
        if( user ) {
            this.login( user );
        }
    }

    registerEvent() {
        this.form.addEventListener('submit', e => {
            const requestLogin = Request.sendForm({
                method: 'POST',
                url: 'https://netology-slow-rest.herokuapp.com/auth.php',
                responseType: 'json',
                form: this.form,
            });
            
            requestLogin.onload = () => {
                if(requestLogin.statusText === 'OK') {
                    this.checkLoginPass( requestLogin.response );
                }
            }
            e.preventDefault();
        })

        this.welcome.querySelector('#signout__btn').onclick = () => {
            this.logout();
        }
    }

    checkLoginPass( response ) {
        if (response['success']) {
            this.login( response['user_id'] );
            this.clear();
        } else {
            alert('Неверные логин/пароль');
            this.clear();
        }
    }

    login( userId ) {
        this.signin.classList.remove('signin_active');
        this.welcome.classList.add('welcome_active');
        this.welcome.querySelector('#user_id').textContent = userId;
        localStorage.setItem('userId', userId);
    }

    logout() {
        this.signin.classList.add('signin_active');
        this.welcome.classList.remove('welcome_active');
        this.welcome.querySelector('#user_id').textContent = '';
        localStorage.removeItem('userId');
    }

    clear() {
        this.form.login.value = '';
        this.form.password.value = '';
    }
}

class Request {
    static sendForm( params ) {
        let { method, url, responseType, form } = params;
        const xhr = new XMLHttpRequest();
        const formData = new FormData( form )
        xhr.open(method, url);
        xhr.responseType = responseType;
        xhr.send( formData );
        return xhr;
    }
}

const signin = new Signin(document.querySelector('#signin'), document.querySelector('#welcome'));