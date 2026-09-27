const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

const starterReplies = [
  'Absolutely — let’s go with a cinematic synth mix and a warm late-night mood.',
  'I can queue a deep house set with dreamy vocals and strong basslines.',
  'Nice choice. I’d pair that with a moody video and a full energy playlist.',
  'Try a playlist with mellow beats, soft leads, and clean percussion.',
  'I’m feeling a lounge-meets-electro vibe for that one.'
];

function appendMessage(text, sender = 'bot') {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${sender}`;

  const bubble = document.createElement('span');
  bubble.className = 'bubble';
  bubble.textContent = text;

  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes('hi') || lower.includes('hello')) return 'Hey! I can help with a chill playlist, a playlist mood, or a video recommendation.';
  if (lower.includes('play') || lower.includes('music')) return 'I can queue a moody house set with smooth synths and deep rhythm.';
  if (lower.includes('video') || lower.includes('youtube')) return 'Perfect — I’d match that with a cinematic visual set and an atmospheric track.';
  if (lower.includes('chill') || lower.includes('relax')) return 'Great choice. A soft ambient mix with mellow drums and warm pads is the move.';
  if (lower.includes('party') || lower.includes('energy')) return 'Let’s turn it up with punchy bass, fast grooves, and an upbeat anthem.';
  if (lower.includes('bye')) return 'Catch you later — keep the vibe alive.';

  return starterReplies[Math.floor(Math.random() * starterReplies.length)];
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = chatInput.value.trim();

  if (!value) return;

  appendMessage(value, 'user');
  chatInput.value = '';

  window.setTimeout(() => {
    appendMessage(generateReply(value), 'bot');
  }, 500);
});
