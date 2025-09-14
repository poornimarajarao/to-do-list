const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");
        window.onload = function () {
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            savedTasks.forEach(task => renderTask(task.text, task.completed));
        };

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === "") return;
            renderTask(taskText, false);
            saveTasks();
            taskInput.value = "";
        }

        function renderTask(text, completed) {
            const li = document.createElement("li");
            if (completed) li.classList.add("completed");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = completed;
            checkbox.onchange = function () {

                li.classList.toggle("completed");
                saveTasks();
            };
            const span = document.createElement("span");
            span.textContent = text;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.onclick = function () {
                li.remove();
                saveTasks();
            };
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }
        function saveTasks() {
            const tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                tasks.push({
                    text: li.querySelector("span").textContent,
                    completed: li.classList.contains("completed")
                });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }