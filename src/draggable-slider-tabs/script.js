/* eslint-disable prettier/prettier */
const tabsBox = document.querySelector('.tabs-box');
const arrowIcons = document.querySelectorAll('.icon i');

let isDragging = false;

function handleIcon(scrollVal) {
  let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? 'none' : 'flex';
  arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
}

arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    tabsBox.scrollLeft += icon.id === 'left' ? -300 : 300;
    handleIcon(tabsBox.scrollLeft);
  })
});

tabsBox.addEventListener('click', e => {
  if (e.target.nodeName !== 'LI') return;
  tabsBox.querySelector('.active').classList.remove('active');
  e.target.classList.add('active');
})

function dragging(e) {
  if (!isDragging) return;
  tabsBox.classList.add('dragging');
  tabsBox.scrollLeft -= e.movementX;
  handleIcon(tabsBox.scrollLeft);
}

function dragStop() {
  isDragging = false;
  tabsBox.classList.remove('dragging');
}

tabsBox.addEventListener('mousedown', () => isDragging = true);
tabsBox.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop);