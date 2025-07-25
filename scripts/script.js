
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.startGame-btn');

    btn.addEventListener('click', () => {
        // Add 'clicked' class
        btn.classList.add('clicked');

        // Optionally: Remove the class after the animation (if you want to allow repeated clicks)
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 300);
    });
});