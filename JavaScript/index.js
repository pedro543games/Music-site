function updateText() {
    const now = new Date();
    const hours = now.getHours();
    const h1 = document.getElementById('timerh1');

    if (hours < 12) {
        h1.innerHTML = 'Bom <span>Dia</span>';
    } else if (hours < 18) {
        h1.innerHTML = 'Boa <span>Tarde</span>';
    } else {
        h1.innerHTML = 'Boa <span>Noite</span>';
    }
}

// Atualiza o texto de saudação uma vez e a cada minuto
updateText();
setInterval(updateText, 60000);

// Adiciona uma classe ao header quando ocorre rolagem na página
const navBar = document.getElementById('header');
const playerMusic = document.getElementById('player-music')
document.addEventListener('scroll', () => {

    navBar.classList.toggle('scroll', window.scrollY > 0);
    if (window.scrollY > 0.5 ) {
        playerMusic.classList.replace('not-visible', 'visible')
    } else {
        playerMusic.classList.replace('visible', 'not-visible')
    }
});

// Exibe o nome do usuário se estiver salvo no localStorage
const userName = localStorage.getItem('UserName') || 'Visitante';
document.getElementById('UserNameDisplay').textContent = `Olá, ${userName}`;

if (userName !== 'Visitante') {
    document.getElementById('user-name').textContent = userName;
    document.getElementById('button-entrar').remove();
} else {
    document.getElementById('user-image').remove();
    document.getElementById('user-name').remove();
}