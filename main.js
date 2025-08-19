window.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".index-main");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // проверяем, на какой странице мы
    const showCompletedOnly = window.location.pathname.includes("completed.html");

    renderTasks(tasks, showCompletedOnly);

    function renderTasks(tasks, completedOnly = false) {
        main.innerHTML = ""; // очистка

        tasks.forEach((task, index) => {
            if (completedOnly && !task.done) return; // пропускаем не выполненные

            const taskDiv = document.createElement("div");
            taskDiv.className = "task-item";

            const titleEl = document.createElement("h3");
            titleEl.textContent = task.title;
            const detailEl = document.createElement("p");
            detailEl.textContent = task.detail;

            if (task.done) {
                titleEl.style.textDecoration = "line-through";
                detailEl.style.textDecoration = "line-through";
            }

            // Если мы на index.html, добавляем кнопки управления
            if (!completedOnly) {
                const buttonsDiv = document.createElement("div");
                buttonsDiv.className = "task-buttons";

                const doneBtn = document.createElement("button");
                doneBtn.textContent = "✔";
                doneBtn.addEventListener("click", () => {
                    task.done = !task.done;
                    saveAndReload(tasks);
                });

                const editBtn = document.createElement("button");
                editBtn.textContent = "✏";
                editBtn.addEventListener("click", () => {
                    const newTitle = prompt("Edit title", task.title);
                    const newDetail = prompt("Edit detail", task.detail);
                    if (newTitle !== null && newDetail !== null) {
                        task.title = newTitle;
                        task.detail = newDetail;
                        saveAndReload(tasks);
                    }
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "🗑";
                deleteBtn.addEventListener("click", () => {
                    tasks.splice(index, 1);
                    saveAndReload(tasks);
                });

                buttonsDiv.append(doneBtn, editBtn, deleteBtn);
                taskDiv.append(titleEl, detailEl, buttonsDiv);
            } else {
                // на completed.html просто отображаем текст
                taskDiv.append(titleEl, detailEl);
            }

            main.appendChild(taskDiv);
        });
    }

    function saveAndReload(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(tasks, showCompletedOnly);
    }
});
