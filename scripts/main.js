/** @format */

//səhifə yükləndikdə listlərin əlavə olunması və list yoxdursa clear buttonun gizlənməsi
uploadList();
checkClearButton();

//form təsdiqlənəndə listin əlavə olunmağı
form.addEventListener("submit", e => {
  e.preventDefault();
  input.value !== "" ? createList(input.value) : alert("Boş bir şey göndərmək olmaz");
});

//bütün listlərin silinməsi
clearButton.addEventListener("click", () => {
  localStorage.removeItem("todoList");
  input.value = "";
  uploadList();
  checkClearButton();
});

//listi silmək və ya bitirdiyini bildirmək
todoContainer.addEventListener("click", el => {
  const elementId = el.target.closest("li").getAttribute("data-id");
  if (el.target.classList.contains("remove")) {
    removeListElement(Number(elementId));
    checkClearButton();
  }
  if (el.target.classList.contains("done")) {
    doneListElement(Number(elementId));
  }
  uploadList();
});
