import Axios from 'axios';
import iziToast from 'izitoast';

const refs = {
  artistsList: document.querySelector('.artists-list-js'),
};

modalWindow();

function modalWindow() {
  let id;
  refs.artistsList.addEventListener('click', async function (e) {
    const button = e.target.closest('.artists-learn-js');
    if (button && refs.artistsList.contains(button)) {
      id = button.dataset.artistId;
      try {
        showLoader();
        const albumsInfo = await Axios.get(
          `https://sound-wave.b.goit.study/api/artists/${id}/albums`
        );
        hideLoader();
        showModalWindow();
        createArtist(albumsInfo.data);
        createAlbums(albumsInfo.data);
        closeModalFu();
      } catch {
        hideLoader();
        hideModalWindow();
        iziToast.show({
          title: 'Oops',
          message: 'An error must have occurred',
        });
      }
    }
  });
}

function createArtist(artist) {
  const artistInfoModal = document.querySelector('.modal-window-js');
  const artistGenres = artist.genres.map(genre => createGenre(genre)).join('');
  const markup = `<div class="modal-content">
    <button class="modal-close-btn-js modal-close-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.8353 14.364L14.3638 14.8354C14.1035 15.0957 13.6814 15.0957 13.421 14.8354L7.99988 9.4142L2.57868 14.8353C2.31838 15.0957 1.89626 15.0957 1.63591 14.8353L1.1645 14.3639C0.904151 14.1036 0.904151 13.6815 1.1645 13.4211L6.58568 8L1.1645 2.5788C0.904151 2.3185 0.904151 1.89638 1.1645 1.63603L1.6359 1.16463C1.89625 0.904282 2.31838 0.904282 2.57868 1.16463L7.99988 6.5858L13.421 1.16462C13.6814 0.904273 14.1035 0.904273 14.3638 1.16462L14.8353 1.63602C15.0956 1.89637 15.0956 2.3185 14.8353 2.5788L9.41408 8L14.8353 13.4211C15.0956 13.6815 15.0956 14.1036 14.8353 14.364Z" fill="white" />
</svg></button>
    <p class="modal-artist-name">${artist.strArtist}</p>
    <div class="modal-img-desc-box">
    <div class="modal-img-container">
    <img src="${artist.strArtistThumb}" alt="${artist.strArtist}"/>
    </div>
    <ul>
      <li>
        <ul class="modal-artist-desc-list">
        <div class="modal-columns">
          <li>
            <p class="modal-desc-header">Years</p>
            <p class="modal-artist-desc">${artist.intFormedYear} - ${
    artist.intDiedYear || 'Present'
  }</p>
          </li>
          <li>
            <p class="modal-desc-header">Sex</p>
            <p class="modal-artist-desc">${artist.strGender}</p>
          </li>
          </div>
          <div  class="modal-columns">
          <li >
            <p class="modal-desc-header">Members</p>
            <p class="modal-artist-desc"> ${artist.intMembers}</p>
          </li>
          <li>
            <p class="modal-desc-header">Country</p>
            <p class="modal-artist-desc">${artist.strCountry}</p>
          </li>
          </div>
        </ul>
        
      </li>
      <li>
        <p class="modal-desc-header">Biography</p>
        <p class="modal-artist-desc">${artist.strBiographyEN}</p>
      </li>
      
      <li>
        <ul class="modal-artist-genres">
          ${artistGenres}
        </ul>
        
      </li>
      </div>
    </ul>
    <p class="modal-desc-header">Albums</p>
    <div class="albums-list-js"></div>
  </div>`;
  artistInfoModal.innerHTML = markup;
  hideLoader();
}

function createGenre(genre) {
  return `
  <li class="artist-genre">
  <p>${genre}</p>
  </li>`;
}

function createSong(song) {
  let songLink;
  if (song.movie) {
    songLink = `<a href="${song.movie}" target="_blank"> <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5933 2.41614C20.4794 1.99354 20.2568 1.60815 19.9477 1.29831C19.6386 0.988473 19.2537 0.765003 18.8313 0.650142C17.2653 0.220142 11.0003 0.213142 11.0003 0.213142C11.0003 0.213142 4.73633 0.206142 3.16933 0.617142C2.74725 0.737289 2.36315 0.963919 2.0539 1.27528C1.74464 1.58663 1.52062 1.97226 1.40333 2.39514C0.99033 3.96114 0.98633 7.20914 0.98633 7.20914C0.98633 7.20914 0.98233 10.4731 1.39233 12.0231C1.62233 12.8801 2.29733 13.5571 3.15533 13.7881C4.73733 14.2181 10.9853 14.2251 10.9853 14.2251C10.9853 14.2251 17.2503 14.2321 18.8163 13.8221C19.2388 13.7075 19.6241 13.4845 19.934 13.1753C20.2439 12.8661 20.4677 12.4814 20.5833 12.0591C20.9973 10.4941 21.0003 7.24714 21.0003 7.24714C21.0003 7.24714 21.0203 3.98214 20.5933 2.41614ZM8.99633 10.2181L9.00133 4.21814L14.2083 7.22314L8.99633 10.2181Z" fill="white" />
</svg></a>`;
  } else {
    songLink = '';
  }
  const songTime = millisToMinutesAndSeconds(song.intDuration);

  return ` <tr>
    <td class="modal-table-row">${song.strTrack}</td>
    <td class="modal-table-row">${songTime}</td>
    <td class="modal-table-row" >${songLink}</td>
  </tr> `;
}

function createAlbum(album) {
  const songsList = (album.tracks || []).map(song => createSong(song)).join('');
  return `
  <div class="modal-album-container">
<p class="modal-album-name">${album.strAlbum}</p> 
<table class="albums-table-js">
<tr>
<th class="modal-table-header">Track</th>
<th class="modal-table-header">Time</th>
<th class="modal-table-header">Link</th>
</tr>
${songsList}
</table>
</div>`;
}

function createAlbums(artist) {
  const albums = document.querySelector('.albums-list-js');
  const albumsList = (artist.albumsList || [])
    .map(album => createAlbum(album))
    .join('');
  albums.insertAdjacentHTML('beforeend', albumsList);
}

function closeModalFu() {
  const button = document.querySelector('.modal-close-btn-js');
  const modalWindow = document.querySelector('.modal-window-js');
  const modalContent = document.querySelector('.modal-content');
  modalWindow.addEventListener(
    'click',
    e => {
      if (!modalContent.contains(e.target)) {
        hideModalWindow();
      }
    },
    { once: true }
  );
  button.addEventListener('click', hideModalWindow, { once: true });
  window.addEventListener(
    'keydown',
    function (event) {
      if (event.key === 'Escape') {
        hideModalWindow();
      }
    },
    { once: true }
  );
}

function showModalWindow() {
  hideLoader();
  const modalWindow = document.querySelector('.modal-window-js');
  modalWindow.classList.add('modal-active');
  document.body.style.overflow = 'hidden';
}
function hideModalWindow() {
  const modalWindow = document.querySelector('.modal-window-js');
  modalWindow.classList.remove('modal-active');
  document.body.style.overflow = '';
}

function showLoader() {
  const loader = document.querySelector('.modal-loader-js');
  loader.style.display = 'flex';
}
function hideLoader() {
  const loader = document.querySelector('.modal-loader-js');
  loader.style.display = 'none';
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
