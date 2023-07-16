/** @format */

// listləri yaratmaq və ya yeniləmək üçün HTML kodu
const listElement = ({ id, value, status = false }) => `
    <span>${id}. ${value}</span>
    <div class="icons">
        ${status ? "" : '<i class="done fa-solid fa-check"></i>'}
        <i class="remove fa-regular fa-solid fa-trash"></i>
    </div>
`;

// yeni list yaratmaq üçün funksiya
const createList = value => {
  const currentList = JSON.parse(localStorage.getItem("todoList")) || [];
  const id = currentList.length + 1;
  const li = document.createElement("li");
  li.innerHTML = listElement({ id, value });
  li.setAttribute("data-id", id);
  todoContainer.prepend(li);

  //localStoragenin yenilənməsi
  const newItem = { value, status: false, id };
  const updatedList = [...currentList, newItem];
  localStorage.setItem("todoList", JSON.stringify(updatedList));

  input.value = "";
  checkClearButton();
};


//listin yenilənməsi üçün funksiya
const uploadList = () => {
  todoContainer.innerHTML = "";
  const currentList = JSON.parse(localStorage.getItem("todoList")) || [];

  //sonuncu elementin əvvəldə gəlməsi üçün sorting funksiyası
  const sortedList = currentList.sort((a, b) => b.id - a.id);

  sortedList.forEach(item => {
    const { value, id, status } = item;
    const li = document.createElement("li");
    li.innerHTML = li.innerHTML = listElement({ id, value, status });
    li.setAttribute("data-id", id);
    
    //list bitibsə və checklənibsə classların əlavə olunması
    status && li.classList.add("line", "done-list");
    todoContainer.appendChild(li);
  });
};

//listin silinməsi üçün funksiya
const removeListElement = id => {
  const currentList = JSON.parse(localStorage.getItem("todoList")) || [];
  let updatedList = currentList.filter(item => item.id !== id);
  localStorage.setItem("todoList", JSON.stringify(updatedList));
};


//listin tamamlanmasını bildirmək üçün funksiya
const doneListElement = id => {
  const currentList = JSON.parse(localStorage.getItem("todoList")) || [];
  let updatedList = currentList.map(item => ({ ...item, status: item.id === id ? true : item.status }));
  localStorage.setItem("todoList", JSON.stringify(updatedList));
};

//listlərin hamısı silinibsə clear buttonun gizlənməsi üçün funksiya
const checkClearButton = () => {
  const currentList = JSON.parse(localStorage.getItem("todoList")) || [];
  clearButton.classList.toggle("active", currentList.length > 0);
};
