window.onload = function () {
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');

    toggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navigation.classList.toggle('active');
    });
};
