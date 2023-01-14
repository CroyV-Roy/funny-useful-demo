window.onload = function () {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        const bodymovinLayer = card.querySelector('.card-img');
        const anima = lottie.loadAnimation({
            container: bodymovinLayer,
            loop: false,
            autoplay: false,
            renderer: 'svg',
            path: bodymovinLayer.dataset.path,
        });

        card.addEventListener('mouseenter', () => {
            anima.play();
        });
        card.addEventListener('mouseleave', () => {
            anima.stop();
        });
    });
};
