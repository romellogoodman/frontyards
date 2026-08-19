// Fetch every image block from the Are.na channel and show one at random.
const CHANNEL = 'frontyards';
const API = `https://api.are.na/v2/channels/${CHANNEL}/contents`;
const PER_PAGE = 100;

async function fetchAllBlocks() {
  const blocks = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}?page=${page}&per=${PER_PAGE}`);
    if (!res.ok) throw new Error(`Are.na responded ${res.status}`);
    const { contents } = await res.json();
    blocks.push(...contents);
    if (contents.length < PER_PAGE) break; // last page
  }
  return blocks;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function showRandomImage() {
  const frame = document.getElementById('frame');
  const photo = document.getElementById('photo');
  const link = document.getElementById('link');

  const blocks = await fetchAllBlocks();
  const images = blocks.filter((b) => b.image && b.image.display);
  if (images.length === 0) throw new Error('No image blocks in channel');

  const block = pickRandom(images);
  const title = block.title || 'Untitled';

  photo.alt = title;
  link.textContent = `${title} ↗ are.na`;

  photo.addEventListener('load', () => frame.classList.add('is-visible'), { once: true });
  photo.src = block.image.display.url;
}

showRandomImage().catch((err) => console.error('[frontyards]', err));
