// Variáveis para controle de navegação
const navbarMobile = document.querySelector('.navegacao-movel'); // Navegação móvel
const menuMobile = document.querySelector('.menu-movel'); // Menu móvel
const menuIcon = document.querySelector('.menu-icon'); // Ícone do menu hamburguer

let lastScrollTop = 0;  // Variável para armazenar a última posição do scroll
const navbar = document.querySelector('.navegacao-desktop');  // Seleciona a barra de navegação
const navbarHeight = navbar ? navbar.offsetHeight : 0;  // Altura da barra de navegação

// A navbar começa visível, não aplicando a classe 'hidden' inicialmente
if (navbar) {
    navbar.classList.remove('hidden'); // Garante que a navbar esteja visível no carregamento

    // Evento de rolagem para esconder/mostrar a barra de navegação
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Se o scroll for para baixo e ultrapassar a altura da navbar, esconde a navbar
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.classList.add('hidden'); // Classe para esconder a navbar
        } else {
            navbar.classList.remove('hidden'); // Remove a classe de esconder
        }

        // Atualiza a opacidade da navbar com base na rolagem
        let opacity = Math.min(scrollTop / 200, 0.8);  // Máxima opacidade 0.8 quando rolar 200px
        navbar.style.backgroundColor = `rgba(71, 71, 71, ${opacity})`; // Altera a opacidade

        // Atualiza a posição anterior para comparar no próximo evento de scroll
        lastScrollTop = scrollTop;
    });
}

// Função para alternar a visibilidade do menu móvel
function toggleMobileMenu() {
    if (menuMobile) {
        menuMobile.classList.toggle('show'); // Alterna a visibilidade do menu móvel
    }
}

// Alternar menus drop-down
const dropButtons = document.querySelectorAll('.dropbtn');
dropButtons.forEach(button => {
    button.addEventListener('click', function () {
        const dropdownContent = this.nextElementSibling;
        if (dropdownContent) {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Carrossel de depoimentos
let currentDepoimentoIndex = 0;

function showDepoimento(index) {
    const wrapper = document.querySelector('.depoimentos-wrapper');
    const depoimentos = document.querySelectorAll('.depoimento');

    if (wrapper && depoimentos.length > 0) {
        const totalDepoimentos = depoimentos.length;
        wrapper.style.transform = `translateX(-${(index * 100) / totalDepoimentos}%)`;
    }
}

function changeDepoimento(direction) {
    const depoimentos = document.querySelectorAll('.depoimento');

    if (depoimentos.length > 0) {
        const totalDepoimentos = depoimentos.length;
        currentDepoimentoIndex = (currentDepoimentoIndex + direction + totalDepoimentos) % totalDepoimentos;
        showDepoimento(currentDepoimentoIndex);
    }
}

// Autoplay do carrossel
let autoplayInterval;

function startAutoplay() {
    if (window.innerWidth > 770) {
        autoplayInterval = setInterval(() => changeDepoimento(1), 5000); // Intervalo de 5 segundos
    }
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

function handleAutoplay() {
    if (window.innerWidth > 768) {
        startAutoplay();
    } else {
        stopAutoplay();
    }
}

// Inicia o autoplay quando a página carrega
document.addEventListener('DOMContentLoaded', handleAutoplay);

// Evento do menu móvel
if (menuIcon) {
    menuIcon.addEventListener('click', toggleMobileMenu);
}

// Fechar o menu se o usuário clicar fora do menu
document.addEventListener('click', function (event) {
    if (menuMobile && !menuMobile.contains(event.target) && !menuIcon.contains(event.target)) {
        menuMobile.classList.remove('show');
    }
});
