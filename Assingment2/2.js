 document.addEventListener('DOMContentLoaded', function () {
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            const clearAllBtn = document.getElementById('clearAllBtn');
            const prioritySelect = document.getElementById('prioritySelect');

            let tasks = JSON.parse(localStorage.getItem('ironmanTasks')) || [];

            function saveTasks() {
                localStorage.setItem('ironmanTasks', JSON.stringify(tasks));
            }

            function renderTasks() {
                taskList.innerHTML = '';

                if (tasks.length === 0) {
                    taskList.innerHTML = '<p style="text-align: center; color: #aaa;">No missions assigned yet</p>';
                } else {
                    tasks.forEach(task => {
                        const taskItem = document.createElement('li');
                        taskItem.className = `task-item ${task.priority}`;
                        taskItem.dataset.id = task.id;

                        taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                <div class="task-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
                <div class="arc-reactor"></div>
            `;

                        taskList.appendChild(taskItem);
                    });
                }
            }

            function addTask() {
                const taskText = taskInput.value.trim();
                if (taskText === '') return;

                const newTask = {
                    id: Date.now(),
                    text: taskText,
                    priority: prioritySelect.value,
                    completed: false
                };

                tasks.unshift(newTask);
                saveTasks();
                taskInput.value = '';
                taskInput.focus();
                renderTasks();
            }

            addTaskBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addTask();
            });

            taskList.addEventListener('click', (e) => {
                const taskItem = e.target.closest('li');
                const taskId = Number(taskItem.dataset.id);

                if (e.target.classList.contains('task-checkbox')) {
                    const task = tasks.find(t => t.id === taskId);
                    task.completed = e.target.checked;
                    saveTasks();
                    renderTasks();
                }

                if (e.target.closest('.delete-btn')) {
                    tasks = tasks.filter(t => t.id !== taskId);
                    saveTasks();
                    renderTasks();
                }

                if (e.target.closest('.edit-btn')) {
                    const task = tasks.find(t => t.id === taskId);
                    const newText = prompt('Edit mission:', task.text);
                    if (newText !== null) {
                        task.text = newText.trim();
                        saveTasks();
                        renderTasks();
                    }
                }
            });

            clearAllBtn.addEventListener('click', () => {
                if (confirm('Clear all missions?')) {
                    tasks = [];
                    saveTasks();
                    renderTasks();
                }
            });

            renderTasks();

        });