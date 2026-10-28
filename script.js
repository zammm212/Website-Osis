
const CONFIG = {
  spotifyUrl: "https://open.spotify.com/track/6v5RJuJ9yhvaXkMXMeMZBw?si=5kCW0jp3RBKT_tyjBx3QpQ&utm_source=copy-link",

  // 30 FOTO GALERI: foto11.jpg sampai foto40.jpg
  gallery: Array.from({ length: 30 }, (_, i) => ({
    file: `assets/foto${i + 11}.jpg`,
    caption: `Foto ${i + 11}`
  })),

  // 10 FOTO PESAN: foto1.jpg sampai foto10.jpg
  messages: [
    {
      name: "Azzam",
      role: "FROM",
      photo: "assets/foto1.jpg",
      text: "Terima kasih sudah menjadi bagian dari perjalanan ini. Semoga semua pengalaman, kerja keras, dan kenangan yang kita buat bisa menjadi cerita yang selalu kita ingat."
    },
    {
      name: "Faiz",
      role: "FROM",
      photo: "assets/foto2.jpg",
      text: "Terima kasih untuk setiap proses yang sudah kita lewati. Tidak semuanya mudah, tetapi setiap tantangan mengajarkan kita arti kerja sama dan saling percaya."
    },
    {
      name: "Almeira",
      role: "FROM",
      photo: "assets/foto3.jpg",
      text: "Banyak hal yang mungkin terlihat sederhana sekarang, tetapi suatu hari nanti justru akan menjadi bagian yang paling kita rindukan. Terima kasih untuk semua ceritanya."
    },
    {
      name: "Amy",
      role: "FROM",
      photo: "assets/foto4.jpg",
      text: "Terima kasih sudah berjuang bersama. Semoga setelah perjalanan ini selesai, kita tetap menjadi orang-orang yang saling mendukung, meskipun punya jalan masing-masing."
    },
    {
      name: "Hafeezur",
      role: "FROM",
      photo: "assets/foto5.jpg",
      text: "Dari rapat sampai acara, dari tawa sampai rasa lelah, semuanya menjadi kenangan yang berharga. Senang bisa menjadi bagian dari cerita ini."
    },
    {
      name: "Lingga",
      role: "FROM",
      photo: "assets/foto6.jpg",
      text: "Mungkin nanti kita tidak lagi bertemu sesering sekarang. Namun, semoga setiap momen yang kita buat tetap punya tempat tersendiri dalam ingatan."
    },
    {
      name: "Afnan",
      role: "FROM",
      photo: "assets/foto7.jpg",
      text: "Terima kasih untuk bantuan kecil, candaan, dan kebersamaan yang membuat perjalanan ini terasa lebih ringan. Kalian adalah bagian penting dari kenangan ini."
    },
    {
      name: "Afiqah",
      role: "FROM",
      photo: "assets/foto8.jpg",
      text: "Kita datang dengan cerita masing-masing, lalu belajar berjalan bersama. Semoga pengalaman ini menjadi bekal baik untuk perjalanan kita selanjutnya."
    },
    {
      name: "Juna",
      role: "FROM",
      photo: "assets/foto9.jpg",
      text: "Tidak semua momen harus sempurna untuk dikenang. Justru dari kekurangan dan prosesnya, kita belajar menjadi tim yang lebih baik."
    },
    {
      name: "Zalykha",
      role: "FROM",
      photo: "assets/foto10.jpg",
      text: "Sampai di akhir bab ini, satu hal yang ingin disampaikan: terima kasih sudah hadir, berusaha, dan membuat perjalanan ini punya arti. Sampai bertemu di cerita berikutnya."
    }
  ]
};

/* =========================
   NAVIGASI 7 HALAMAN
========================= */

const pageNames = [
  "home",
  "story",
  "music",
  "messages",
  "gallery",
  "ending",
  "thankyou"
];

const pageCounter = document.getElementById("pageCounter");
const musicPanel = document.getElementById("musicPanel");

function goToPage(pageId) {
  const target = document.getElementById(pageId);
  if (!target) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  target.classList.add("active");
  target.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });

  const pageNumber = pageNames.indexOf(pageId) + 1;

  pageCounter.textContent =
    `${String(pageNumber).padStart(2, "0")} / ${String(pageNames.length).padStart(2, "0")}`;

  musicPanel.classList.remove("open");
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    goToPage(button.dataset.go);
  });
});

/* =========================
   FOTO DAN PLACEHOLDER
========================= */

function makeImage(file, alt = "") {
  const img = document.createElement("img");
  img.src = file;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  return img;
}

function makePlaceholder(number, text) {
  const placeholder = document.createElement("div");
  placeholder.className = "photo-placeholder";
  placeholder.textContent =
    `✳ ${String(number).padStart(2, "0")} · ${text}`;
  return placeholder;
}

/* =========================
   PESAN KENANGAN
========================= */

const messageGrid = document.getElementById("messageGrid");
const messageModal = document.getElementById("messageModal");

let messagePage = 0;
let currentMessageIndex = 0;

const messagesPerPage = 4;

function renderMessages() {
  messageGrid.replaceChildren();

  const start = messagePage * messagesPerPage;
  const visibleMessages = CONFIG.messages.slice(
    start,
    start + messagesPerPage
  );

  visibleMessages.forEach((message, offset) => {
    const realIndex = start + offset;

    const card = document.createElement("button");
    card.className = "message-card";
    card.type = "button";
    card.style.animationDelay = `${offset * 70}ms`;

    const photo = document.createElement("div");
    photo.className = "photo-frame message-thumb";

    const img = makeImage(message.photo, message.name);
    photo.append(img);

    img.addEventListener("error", () => {
      photo.replaceChildren(
        makePlaceholder(realIndex + 1, "Foto belum tersedia")
      );
    }, { once: true });

    const copy = document.createElement("div");
    copy.className = "message-card-copy";

    const role = document.createElement("p");
    role.className = "eyebrow";
    role.textContent = message.role;

    const name = document.createElement("h3");
    name.textContent = message.name;

    const teaser = document.createElement("p");
    teaser.textContent = "Buka pesan ↗";

    copy.append(role, name, teaser);
    card.append(photo, copy);

    card.addEventListener("click", () => openMessage(realIndex));

    messageGrid.append(card);
  });

  updatePager(
    messagePager,
    messagePage,
    CONFIG.messages.length,
    messagesPerPage
  );
}

function openMessage(index) {
  currentMessageIndex = index;

  const message = CONFIG.messages[index];

  document.getElementById("messageName").textContent = message.name;
  document.getElementById("messageRole").textContent = message.role;
  document.getElementById("messageText").textContent = message.text;

  const photo = document.getElementById("messageModalPhoto");
  photo.replaceChildren();

  const img = makeImage(message.photo, message.name);
  photo.append(img);

  img.addEventListener("error", () => {
    photo.replaceChildren(
      makePlaceholder(index + 1, "Foto belum tersedia")
    );
  }, { once: true });

  document.getElementById("nextMessage").textContent =
    index === CONFIG.messages.length - 1
      ? "TUTUP PESAN ↗"
      : "PESAN BERIKUTNYA →";

  if (!messageModal.open) messageModal.showModal();
}

document.getElementById("closeMessage").addEventListener("click", () => {
  messageModal.close();
});

document.getElementById("nextMessage").addEventListener("click", () => {
  if (currentMessageIndex >= CONFIG.messages.length - 1) {
    messageModal.close();
    return;
  }

  openMessage(currentMessageIndex + 1);
});

/* =========================
   PAGINASI
========================= */

function createPager(id, onChange) {
  const nav = document.createElement("div");
  nav.className = "pager";
  nav.id = id;

  const prev = document.createElement("button");
  prev.className = "secondary-button";
  prev.textContent = "← SEBELUMNYA";
  prev.type = "button";

  const label = document.createElement("span");
  label.className = "pager-label";

  const next = document.createElement("button");
  next.className = "secondary-button";
  next.textContent = "BERIKUTNYA →";
  next.type = "button";

  prev.addEventListener("click", () => onChange(-1));
  next.addEventListener("click", () => onChange(1));

  nav.append(prev, label, next);

  return { nav, prev, label, next };
}

function updatePager(pager, page, total, perPage) {
  const maxPage = Math.ceil(total / perPage);

  pager.label.textContent = `${page + 1} / ${maxPage}`;
  pager.prev.disabled = page === 0;
  pager.next.disabled = page >= maxPage - 1;
  pager.nav.hidden = maxPage <= 1;
}

const messagePager = createPager("messagePager", direction => {
  const maxPage = Math.ceil(
    CONFIG.messages.length / messagesPerPage
  );

  messagePage = Math.max(
    0,
    Math.min(maxPage - 1, messagePage + direction)
  );

  renderMessages();
});

messageGrid.after(messagePager.nav);

/* =========================
   GALERI 30 FOTO
========================= */

const galleryGrid = document.getElementById("galleryGrid");
const photoModal = document.getElementById("photoModal");
const viewerImageWrap = document.getElementById("viewerImageWrap");

let galleryPage = 0;
let currentPhotoIndex = 0;

const photosPerPage = 6;

function renderGallery() {
  galleryGrid.replaceChildren();

  const start = galleryPage * photosPerPage;
  const visiblePhotos = CONFIG.gallery.slice(
    start,
    start + photosPerPage
  );

  visiblePhotos.forEach((item, offset) => {
    const realIndex = start + offset;

    const card = document.createElement("button");
    card.className = "gallery-card";
    card.type = "button";
    card.style.animationDelay = `${offset * 55}ms`;

    const photo = document.createElement("div");
    photo.className = "gallery-photo";

    const img = makeImage(item.file, item.caption);
    photo.append(img);

    img.addEventListener("error", () => {
      photo.replaceChildren(
        makePlaceholder(realIndex + 11, "Foto belum tersedia")
      );
    }, { once: true });

    const caption = document.createElement("p");
    caption.className = "gallery-caption";
    caption.textContent = item.caption;

    card.append(photo, caption);
    card.addEventListener("click", () => openPhoto(realIndex));

    galleryGrid.append(card);
  });

  updatePager(
    galleryPager,
    galleryPage,
    CONFIG.gallery.length,
    photosPerPage
  );
}

function openPhoto(index) {
  currentPhotoIndex = index;
  showPhoto();

  if (!photoModal.open) photoModal.showModal();
}

function showPhoto() {
  const item = CONFIG.gallery[currentPhotoIndex];

  viewerImageWrap.replaceChildren();

  const img = makeImage(item.file, item.caption);
  viewerImageWrap.append(img);

  img.addEventListener("error", () => {
    viewerImageWrap.replaceChildren(
      makePlaceholder(currentPhotoIndex + 11, "Foto belum tersedia")
    );
  }, { once: true });

  document.getElementById("viewerCaption").textContent = item.caption;

  document.getElementById("viewerCounter").textContent =
    `${String(currentPhotoIndex + 1).padStart(2, "0")} / ${CONFIG.gallery.length}`;
}

const galleryPager = createPager("galleryPager", direction => {
  const maxPage = Math.ceil(
    CONFIG.gallery.length / photosPerPage
  );

  galleryPage = Math.max(
    0,
    Math.min(maxPage - 1, galleryPage + direction)
  );

  renderGallery();
});

galleryGrid.after(galleryPager.nav);

document.getElementById("closePhoto").addEventListener("click", () => {
  photoModal.close();
});

document.getElementById("previousPhoto").addEventListener("click", () => {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + CONFIG.gallery.length) %
    CONFIG.gallery.length;

  showPhoto();
});

document.getElementById("nextPhoto").addEventListener("click", () => {
  currentPhotoIndex =
    (currentPhotoIndex + 1) % CONFIG.gallery.length;

  showPhoto();
});

/* =========================
   PEMUTAR MP3
========================= */

const musicToggle = document.getElementById("musicToggle");
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPagePlayButton = document.getElementById("musicPagePlayButton");
const audioPlayer = document.getElementById("audioPlayer");
const musicTitle = document.getElementById("musicTitle");
const musicSubtitle = document.getElementById("musicSubtitle");
const audioStatus = document.getElementById("audioStatus");

function updateAudioButtons() {
  const playing = !audioPlayer.paused;

  musicPlayButton.textContent = playing
    ? "Ⅱ JEDA LAGU"
    : "▶ PUTAR LAGU";

  musicPagePlayButton.textContent = playing
    ? "Ⅱ JEDA LAGU"
    : "▶ PUTAR LAGU";

  musicTitle.textContent = "Lagu kenangan OSIS";

  musicSubtitle.textContent = playing
    ? "MP3 · Sedang diputar"
    : "MP3 · Our soundtrack";

  audioStatus.textContent = playing
    ? "♫ Lagu sedang diputar"
    : "Lagu kenangan OSIS";
}

async function toggleAudio() {
  if (audioPlayer.paused) {
    try {
      await audioPlayer.play();
    } catch (error) {
      musicSubtitle.textContent =
        "Lagu gagal diputar. Periksa file MP3.";
      audioStatus.textContent =
        "Periksa assets/lagu-kenangan.mp3";
    }
  } else {
    audioPlayer.pause();
  }

  updateAudioButtons();
}

musicToggle.addEventListener("click", () => {
  musicPanel.classList.toggle("open");
});

musicPlayButton.addEventListener("click", toggleAudio);
musicPagePlayButton.addEventListener("click", toggleAudio);

audioPlayer.addEventListener("play", updateAudioButtons);
audioPlayer.addEventListener("pause", updateAudioButtons);
audioPlayer.addEventListener("ended", updateAudioButtons);

audioPlayer.addEventListener("error", () => {
  musicSubtitle.textContent = "File MP3 tidak ditemukan";
  audioStatus.textContent =
    "Periksa nama dan lokasi file MP3.";
});

/* =========================
   MODAL DAN KIBOR
========================= */

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

document.addEventListener("keydown", event => {
  if (photoModal.open && event.key === "ArrowLeft") {
    document.getElementById("previousPhoto").click();
  }

  if (photoModal.open && event.key === "ArrowRight") {
    document.getElementById("nextPhoto").click();
  }

  if (event.key === "Escape") {
    musicPanel.classList.remove("open");
  }
});

/* =========================
   MULAI WEBSITE
========================= */

renderMessages();
renderGallery();
updateAudioButtons();
