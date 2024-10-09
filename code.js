// Clase para manejar la autenticación
class Auth {
    constructor() {
        this.users = []; // Almacenará los usuarios registrados
    }

    register(username, password) {
        // Verifica si el usuario ya está registrado
        const userExists = this.users.some(user => user.username === username);
        if (userExists) {
            alert("El nombre de usuario ya está registrado.");
            return false;
        }

        // Registra al nuevo usuario
        this.users.push({ username, password });
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        return true;
    }

    login(username, password) {
        // Verifica si las credenciales coinciden
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
            alert("Inicio de sesión exitoso.");
            return true;
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
            return false;
        }
    }
}

// Clase para manejar el juego
class Game {
    constructor() {
        this.choices = ['piedra', 'papel', 'tijera'];
        this.resultText = document.getElementById('result-text');
        this.userChoiceText = document.getElementById('user-choice');
        this.computerChoiceText = document.getElementById('computer-choice');
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    }

    play(userChoice) {
        const computerChoice = this.getComputerChoice();
        const result = this.getResult(userChoice, computerChoice);

        // Actualiza el DOM con los resultados
        this.resultText.textContent = `Resultado: ${result}`;
        this.userChoiceText.textContent = `Tu elección: ${userChoice}`;
        this.computerChoiceText.textContent = `Elección del computador: ${computerChoice}`;
    }

    getResult(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'Empate';
        }

        if (
            (userChoice === 'piedra' && computerChoice === 'tijera') ||
            (userChoice === 'papel' && computerChoice === 'piedra') ||
            (userChoice === 'tijera' && computerChoice === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return 'Perdiste';
        }
    }
}

// Inicialización de las clases
const auth = new Auth();
const game = new Game();

// DOM Elements
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const gameContainer = document.getElementById('game-container');
const authContainer = document.getElementById('auth-container');

// Event Listeners para el registro
document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (auth.register(username, password)) {
        toggleForms('login');
    }
});

// Event Listeners para el inicio de sesión
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (auth.login(username, password)) {
        toggleForms('game');
    }
});

// Cambiar entre formularios
document.getElementById('show-register').addEventListener('click', () => {
    toggleForms('register');
});

document.getElementById('show-login').addEventListener('click', () => {
    toggleForms('login');
});

function toggleForms(form) {
    if (form === 'register') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        gameContainer.style.display = 'none';
    } else if (form === 'login') {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        gameContainer.style.display = 'none';
    } else if (form === 'game') {
        authContainer.style.display = 'none';
        gameContainer.style.display = 'block';
    }
}

// Event listeners para las elecciones del juego
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.getAttribute('data-choice');
        game.play(userChoice);
    });
});

// Event listener para cerrar sesión
document.getElementById('logout-btn').addEventListener('click', () => {
    authContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    toggleForms('login');
});