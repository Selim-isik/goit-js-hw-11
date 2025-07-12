import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const API_KEY = '51262986-c338856f457aa770ab0affaea';
const BASE_URL = 'https://pixabay.com/api/';

const lightbox = new SimpleLightbox('.gallery a');

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

function clearGallery() {
  gallery.innerHTML = '';
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a href="${largeImageURL}" class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `
    )
    .join('');
}

async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const { data } = await axios.get(BASE_URL, { params });
    return data.hits;
  } catch (error) {
    console.error('API Hatası:', error);
    throw error;
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        title: 'Oops',
        message: 'No images found. Try a different keyword.',
      });
      return;
    }

    gallery.innerHTML = createMarkup(images);
    lightbox.refresh();
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
    });
  } finally {
    hideLoader();
  }
});
