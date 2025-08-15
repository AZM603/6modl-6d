const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const body = document.getElementById('main');

let isDark = false;

let notes = [
  { text: "NOTE #1", done: false },
  { text: "NOTE #2", done: true },
  { text: "NOTE #3", done: false },
];

function renderNotes(filter = "") {
  todoList.innerHTML = "";

  notes.forEach((note, index) => {
    if (!note.text.toLowerCase().includes(filter.toLowerCase())) return;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center px-3 py-2 border rounded " +
                   (isDark ? "border-gray-700" : "border-gray-300");

    const left = document.createElement("div");
    left.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = note.done;
    checkbox.className = "accent-indigo-500 w-5 h-5";

    const span = document.createElement("span");
    span.textContent = note.text;
    if (note.done) {
      span.classList.add("line-through", isDark ? "text-gray-500" : "text-gray-400");
    }

    checkbox.addEventListener("change", () => {
      notes[index].done = checkbox.checked;
      renderNotes(searchInput.value);
    });

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement("div");
    right.className = "flex items-center gap-2";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.className = "hover:text-indigo-500";
    editBtn.onclick = () => {
      const newText = prompt("Edit note:", notes[index].text);
      if (newText) {
        notes[index].text = newText;
        renderNotes(searchInput.value);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "hover:text-red-500";
    deleteBtn.onclick = () => {
      notes.splice(index, 1);
      renderNotes(searchInput.value);
    };

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);
    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = searchInput.value.trim();
  if (text) {
    notes.push({ text, done: false });
    searchInput.value = "";
    renderNotes();
  }
});

searchInput.addEventListener("input", () => {
  renderNotes(searchInput.value);
});

// 🌙 ↔ ☀️ Light/Dark Toggle
themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  document.body.classList.toggle("bg-white", !isDark);
  document.body.classList.toggle("bg-black", isDark);
  document.body.classList.toggle("text-white", isDark);
  document.body.classList.toggle("text-black", !isDark);

  themeToggle.textContent = isDark ? "☀️" : "🌙";

  renderNotes(searchInput.value);
});

renderNotes();