let works =
JSON.parse(localStorage.getItem("works")) || [];

function saveWork() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (!title || !content) return;

  works.unshift({ title, content });
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  localStorage.setItem("works",
  JSON.stringify(works));

  render();
}

function deleteWork(i) {
  works.splice(i, 1);
  localStorage.setItem("works", JSON.stringify(works));
  render ();
}

function toggleDark() {
  document.body.classList.toggle("dark");

  const mode = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", mode);
}

// load mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

function render() {
  const list =
    document.getElementById('list');
  list.innerHTML = '';

  const keyword =
    document.getElementById('search').value.toLowerCase();

  works
    .filter(w => w.title.toLowerCase().includes(keyword))
    .forEach((w, i) => {
      const div = document.createElement('div');
      div.className = 'card';

      div.innerHTML = `
      <h3>${w.title}</h3>
      <p>${w.content.substring(0, 100)}...</p>
      <button onclick="editWork(${i})">Edit</button>
<button onclick="deleteWork(${i})">Hapus</button>
    `;

      div.onclick = (e) => {
        if (e.target.tagName !== "BUTTON") openReader(i);
      };

      list.appendChild(div);
    });
}

function editWork(i) {
  document.getElementById('title').value = works[i].title;
  document.getElementById('content').value = works[i].content;

  works.splice(i, 1);
  localStorage.setItem("works", JSON.stringify(works));
  render();
}

function openReader(i) {
  document.querySelector('.form').style.display = 'none';
  document.getElementById('list').style.display = 'none';
  document.getElementById('reader').style.display = 'block';

  document.getElementById('readTitle').innerText = works[i].title;
  document.getElementById('readContent').innerText = works[i].content;
  window.scrollTo(0, 0);
}

function back() {
  document.querySelector('.form').style.display = 'block';
  document.getElementById('list').style.display = 'block';
  document.getElementById('reader').style.display = 'none';
}

render();