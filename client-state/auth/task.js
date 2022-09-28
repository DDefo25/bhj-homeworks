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
            this.loginReguest();
            e.preventDefault();
        })

        this.welcome.querySelector('#signout__btn').onclick = () => {
            this.logout();
        }
    }

    loginReguest() {
        const xhr = new XMLHttpRequest();
        const formData = new FormData( this.form )
        xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
        xhr.responseType = 'json';
        xhr.onload = () => {
            if(xhr.statusText === 'OK') {
                if (xhr.response['success']) {
                    this.login( xhr.response['user_id'] );
                    this.clear();
                } else {
                    alert('Неверные логин/пароль');
                    this.clear();
                }
            }
        }
        xhr.send( formData );
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

const signin = new Signin(document.querySelector('#signin'), document.querySelector('#welcome'));