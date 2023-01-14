const b1 = document.querySelector('.b1');

b1.addEventListener('mouseover', (e) => {
    const x = e.pageX - b1.offsetLeft;
    const y = e.pageY - b1.offsetTop;

    b1.style.setProperty('--btn-x', x + 'px');
    b1.style.setProperty('--btn-y', y + 'px');
});

