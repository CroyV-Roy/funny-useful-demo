const wrapper = document.querySelector('.wrapper');
const selectBtn = document.querySelector('.select-btn');
const searchInp = document.querySelector('.search input');
const options = document.querySelector('.options');

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

function addCountry(selectedCountry) {
  options.textContent = '';
  countries.forEach(country => {
    let isSelected = country == selectedCountry ? 'selected' : '';
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML('beforeend', li);
  });
}
addCountry();

function updateName(selectedLi) {
  searchInp.value = '';
  addCountry(selectedLi.textContent);
  wrapper.classList.remove('active');
  selectBtn.firstElementChild.textContent = selectedLi.textContent;
}

searchInp.addEventListener('keyup', () => {
  let arr = {};
  let searchWord = searchInp.value.toLowerCase();
  arr = countries.filter(data => {
    return data.toLowerCase().startsWith(searchWord);
  }).map(data => {
    let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
    return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
  }).join('');
  options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener('click', () => wrapper.classList.toggle('active'));