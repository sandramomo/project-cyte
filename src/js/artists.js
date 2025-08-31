//Get artists
import Axios from 'axios';
import iziToast from 'izitoast';
const axios = Axios.create({
  baseURL: 'https://sound-wave.b.goit.study/api/artists',
  headers: {},
  params: {
    limit: 8,
  },
});
async function getArtists(page) {
  const result = await axios.get('', {
    params: {
      page: page,
    },
  });
  return result.data;
}
let page;
let maxPages;

document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad(e) {
  e.preventDefault();
  page = 1;
  try {
    const result = await getArtists(page);
    maxPages = Math.ceil(result.totalArtists / 8);
    if (result.artists.length === 0) {
      iziToast.show({
        title: 'Oops',
        message: 'The are no artists found...',
      });
      hideLoader();
      return;
    } else {
      createArtists(result.artists);
      hideLoader();
      checkPages();
    }
  } catch {
    maxPages = 0;
    iziToast.show({
      title: 'Oops',
      message: 'An error must have occurred',
    });
    hideLoader();
  }
}

function checkPages() {
  if (maxPages > page) {
    showLoadMoreBtn();
  } else if (page === maxPages) {
    hideLoadMoreBtn();
    iziToast.show({
      title: 'Wow',
      message: 'You have reached the end of the list',
    });
    return;
  }
}

function createArtists(artists) {
  const artistsList = document.querySelector('.artists-list-js');
  const markup = artists.map(artist => createArtist(artist)).join('');
  artistsList.innerHTML = markup;
}

function createArtist(artist) {
  const artistGenres = artist.genres.map(genre => createGenre(genre)).join('');
  let artistBio;
  if (artist.strBiographyEN.length > 120) {
    artistBio = artist.strBiographyEN.slice(0, 120) + '...';
  } else {
    artistBio = artist.strBiographyEN;
  }
  return ` <li class="artists-list-item">
      <ul class="artists-card">
        <li>
          <div class="artist-img-box">
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}"/>
          </div>
        </li>
        <li>
          <div>
            <ul class="artist-genres">${artistGenres}</ul>
          </div>
          <div class="artist-desc">
            <p class="artist-name"> ${artist.strArtist}</p>
            <p class="artist-bio">${artistBio} </p>
          </div>
        </li>
        <li>
          <button class="artists-learn-js artists-learn"> Learn more  <span class="artist-svg"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 14.9426L8 7.94263L0 0.942627V14.9426Z" fill="white" />
</svg></span> </button>
        </li>
      </ul>
    </li>`;
}
function createGenre(genre) {
  return `
  <li class="artist-genre">
  <p>${genre}</p>
  </li>`;
}

function loadMoreArtists(artists) {
  const artistList = document.querySelector('.artists-list-js');
  const markup = artists.map(artist => createArtist(artist)).join('');
  artistList.insertAdjacentHTML('beforeend', markup);
}
function showLoader() {
  const loader = document.querySelector('.artist-loader-js');
  loader.style.display = 'flex';
}
function hideLoader() {
  const loader = document.querySelector('.artist-loader-js');
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  const loadbtn = document.querySelector('.artists-load-js');
  loadbtn.classList.add('artists-load-more');
}
function hideLoadMoreBtn() {
  const loadbtn = document.querySelector('.artists-load-js');
  loadbtn.classList.remove('artists-load-more');
}

const artistLoadBtn = document.querySelector('.artists-load-js');
artistLoadBtn.addEventListener('click', handleLoadMoreClick);

async function handleLoadMoreClick(e) {
  e.preventDefault();
  page += 1;
  showLoader();
  try {
    const result = await getArtists(page);
    hideLoader();
    loadMoreArtists(result.artists);
    checkPages();
  } catch {
    iziToast.show({
      title: 'Oops',
      message: 'An error must have occurred',
    });
    hideLoader();
  }
}
