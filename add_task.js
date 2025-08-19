const titleInput = document.querySelector(".title-input");
const detailInput = document.querySelector(".detail-input");
const addButton = document.querySelector(".add-button button");

addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const detail = detailInput.value.trim();

    if (!title) {
        alert("Введите title")
        return
    };

    // получаем массив дел из localStorage (или [] если пусто)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        title,
        detail,
        done: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // очищаем поля
    titleInput.value = "";
    detailInput.value = "";

    // возвращаемся на главную
    window.location.href = "index.html";
});
