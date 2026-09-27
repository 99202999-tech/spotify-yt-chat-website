const tracks = [
  { title: 'Midnight City', artist: 'M83', cover: 'art-one', filter: 'all' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit', cover: 'art-two', filter: 'chill' },
  { title: 'Innerbloom', artist: 'RÜFÜS DU SOL', cover: 'art-three', filter: 'focus' },
  { title: 'Electric Feel', artist: 'MGMT', cover: 'art-two', filter: 'energy' },
  { title: 'Golden Hours', artist: 'Ava West', cover: 'art-three', filter: 'made' },
  { title: 'Night Pulse', artist: 'Nova', cover: 'art-one', filter: 'energy' },
  { title: 'Glass Clouds', artist: 'Kite', cover: 'art-two', filter: 'chill' },
  { title: 'Afterglow', artist: 'Eli Dew', cover: 'art-three', filter: 'made' }
];

const playlistGrid = document.getElementById('playlistGrid');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.getElementById('searchInput');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const miniTitle = document.getElementById('miniTitle');
const miniArtist = document.getElementById('miniArtist');
const nowArt = document.querySelector('.now-art');
const miniCover = document.querySelector('.mini-cover');
const playHero = document.getElementById('playHero');
const togglePlay = document.getElementById('togglePlay');
const bottomPlayToggle = document.getElementById('bottomPlayToggle');
const chatWidget = document.getElementById('chatWidget');
const chatLauncher = document.getElementById('chatLauncher');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

let activeFilter = 'all';
let playing = false;

function renderPlaylist() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = tracks.filter((track) => {
    const matchesFilter = activeFilter === 'all' || track.filter === activeFilter;
    const haystack = `${track.title} ${track.artist}`.toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) {
    playlistGrid.innerHTML = '<div style="color:#9aa5b1;padding:20px;grid-column:1/-1;">No matching tracks found.</div>';
    return;
  }

  playlistGrid.innerHTML = filtered
    .map(
      (track, idx) => `
        <article class="play-card" data-index="${tracks.indexOf(track)}">
          <div class="card-cover ${track.cover}"></div>
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.play-card').forEach((card) => {
    card.addEventListener('click', () => {
      const index = Number(card.dataset.index);
      setCurrentTrack(tracks[index]);
    });
  });
}

function setCurrentTrack(track) {
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  miniTitle.textContent = track.title;
  miniArtist.textContent = track.artist;
  nowArt.className = `now-art ${track.cover}`;
  miniCover.className = `mini-cover ${track.cover}`;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderPlaylist();
  });
});

searchInput.addEventListener('input', renderPlaylist);

function togglePlaybackUI() {
  playing = !playing;
  const label = playing ? '❚❚' : '▶';
  togglePlay.textContent = label;
  bottomPlayToggle.textContent = label;
}

playHero.addEventListener('click', togglePlaybackUI);
togglePlay.addEventListener('click', togglePlaybackUI);
bottomPlayToggle.addEventListener('click', togglePlaybackUI);

function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  msg.innerHTML = text.replace(/\n/g, '<br />');
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(input) {
  const value = input.toLowerCase();

  if (value.includes('chill')) return 'Perfect — I’d go for a late-night chill mix with soft synths and mellow percussion.';
  if (value.includes('workout') || value.includes('energy')) return 'Let’s push the tempo. I’d queue a strong bass-driven, high-energy set for you.';
  if (value.includes('focus') || value.includes('study')) return 'Focus mode activated: soft instrumental beats, airy pads, and clean rhythm.';
  if (value.includes('party')) return 'Night out energy — think punchy drops, groovy bass, and confident vocals.';
  if (value.includes('hello') || value.includes('hi')) return 'Hey! I can find a playlist, a mood, or the perfect track for your vibe.';
  return 'I’ve got you — I’d pair that with a smooth mix and a warm visual vibe. Try “chill mix”, “workout energy”, or “focus mode”.';
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;

  addMessage(value, 'user');
  chatInput.value = '';

  setTimeout(() => {
    addMessage(getBotReply(value), 'bot');
  }, 400);
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    chatInput.value = chip.textContent.trim();
    chatForm.requestSubmit();
  });
});

chatLauncher.addEventListener('click', () => {
  chatWidget.classList.remove('hidden');
  chatLauncher.style.display = 'none';
});

document.getElementById('closeChat').addEventListener('click', () => {
  chatWidget.classList.add('hidden');
  chatLauncher.style.display = 'block';
});

renderPlaylist();
setCurrentTrack(tracks[0]);
