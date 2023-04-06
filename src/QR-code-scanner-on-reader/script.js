/* eslint-disable prettier/prettier */
const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const fileInput = form.querySelector('input');
const infoText = form.querySelector('p');
const closeBtn = document.querySelector('.close');
const copyBtn = document.querySelector('.copy');

async function fetchRequest(file, formData) {
  infoText.textContent = 'Scanning QR Code...';
  try {
    const resp = await fetch('http://api.qrserver.com/v1/read-qr-code/', {
      method: 'POST',
      body: formData
    });
    const json = await resp.json();
    let result = await json[0].symbol[0].data;
    infoText.textContent = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
    if (!result) return;
    document.querySelector('textarea').textContent = result;
    form.querySelector('img').src = URL.createObjectURL(file);
    wrapper.classList.add('active');
  } catch (error) {
    infoText.textContent = 'Couldn\'t scan QR Code';
  }
}

fileInput.addEventListener('change', async e => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append('file', file);
  fetchRequest(file, formData);
});

copyBtn.addEventListener('click', () => {
  let text = document.querySelector('textarea').textContent;
  navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInput.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));