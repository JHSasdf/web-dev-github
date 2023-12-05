const mobileMenuBtnElement = document.querySelector('#mobile-menu-btn');
const mobilemenuElement= document.getElementById('mobile-menu');

function toggleMobileMenu() {
    mobilemenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu)