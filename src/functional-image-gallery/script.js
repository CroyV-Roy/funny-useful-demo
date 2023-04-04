/* eslint-disable prettier/prettier */
const imagesContainer = document.querySelector('.images');
const loadMore = document.querySelector('.load-more');
const searchInput = document.querySelector('.search-box input');
const lightBox = document.querySelector('.light-box');
const closeBtn = lightBox.querySelector('.uil-times');
const downloadImageBtn = lightBox.querySelector('.uil-import');

const apiKey = 'h6WKdyfqd9ltumDuwmIMthS1L8Qw6GhkNQ4XJfPZiQ4Z4fpI0JTmCTQi';
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = async (imgURL) => {
  try {
    const res = await fetch(imgURL);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = new Date().getTime();
    a.click();
    a.remove();
  } catch (error) {
    console.log('Failed to download image!')
  }
}

const showLightbox = (name, img) => {
  lightBox.querySelector('img').src = img;
  lightBox.querySelector('span').textContent = name;
  downloadImageBtn.setAttribute('data-img', img);
  lightBox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

const hideLightbox = () => {
  lightBox.classList.remove('show');
  document.body.style.overflow = 'auto';
}

const generateHTML = (images) => {
  imagesContainer.innerHTML += images.map(img => 
  `<li class="card" onclick="showLightbox('${img.photographer}', '${img.src.large2x}')">
    <img src="${img.src.large2x}" alt="">
    <div class="details">
      <div class="photographer">
        <i class="uil uil-camera"></i>
        <span>${img.photographer}</span>
      </div>
      <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
        <i class="uil uil-import"></i>
      </button>
    </div>
  </li>`
  ).join('');
}

const getImage = async (apiURL) => {
  loadMore.textContent = 'Loading...';
  loadMore.classList.add('disabled');
  try {
    const res = await fetch(apiURL, {headers: { Authorization: apiKey }});
    const data = await res.json();
    const photos = await data.photos;
    generateHTML(photos);
  } catch (error) {
    console.log('Failed to load images!');
  } finally {
    loadMore.textContent = 'Load More';
    loadMore.classList.remove('disabled');
  }
}

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
  apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
  getImage(apiURL);
}

const loadSearchImages = (e) => {
  if (e.target.value === '') return searchTerm = null;
  if (e.key === 'Enter') {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesContainer.innerHTML = '';
    getImage(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
  }
}

getImage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMore.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keyup', loadSearchImages);
closeBtn.addEventListener('click', hideLightbox);
downloadImageBtn.addEventListener('click', (e) => downloadImg(e.target.dataset.img));