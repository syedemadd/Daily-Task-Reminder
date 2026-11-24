// Get saved information from the browser
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var currentUser = localStorage.getItem("currentUser") || "";
        var editIndex = -1;

        // Show login page or dashboard
        if (currentUser === "") {
            document.getElementById("loginBox").style.display = "block";
        } else {
            openDashboard();
        }

        function login() {
            var name = document.getElementById("userName").value.trim();

            if (name === "") {
                alert("Please enter your name.");
                return;
            }

            currentUser = name;
            localStorage.setItem("currentUser", currentUser);
            openDashboard();
        }

        function openDashboard() {
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("app").style.display = "block";
            document.getElementById("displayName").innerText = currentUser;
            showTasks();
        }

        function logout() {
            localStorage.removeItem("currentUser");
            currentUser = "";
            document.getElementById("app").style.display = "none";
            document.getElementById("loginBox").style.display = "block";
        }

        // Add a new task or update an existing task
        function saveTask() {
            var title = document.getElementById("taskTitle").value.trim();
            var date = document.getElementById("taskDate").value;
            var category = document.getElementById("taskCategory").value;
            var priority = document.getElementById("taskPriority").value;
            var status = document.getElementById("taskStatus").value;

            if (title === "" || date === "") {
                alert("Please enter a task name and due date.");
                return;
            }

            var task = {
                title: title,
                date: date,
                category: category,
                priority: priority,
                status: status
            };

            if (editIndex === -1) {
                tasks.push(task);
            } else {
                tasks[editIndex] = task;
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
            clearForm();
            showTasks();
        }

        // Display tasks on the page
        function showTasks() {
            var list = document.getElementById("taskList");
            var search = document.getElementById("searchBox").value.toLowerCase();
            var filter = document.getElementById("filterStatus").value;
            var sort = document.getElementById("sortTasks").value;

            list.innerHTML = "";

            var visibleTasks = [];

            for (var i = 0; i < tasks.length; i++) {
                var matchesSearch = tasks[i].title.toLowerCase().includes(search);
                var matchesStatus = filter === "All" || tasks[i].status === filter;

                if (matchesSearch && matchesStatus) {
                    visibleTasks.push({ task: tasks[i], index: i });
                }
            }

            // Sort the tasks
            visibleTasks.sort(function(a, b) {
                if (sort === "name") {
                    return a.task.title.localeCompare(b.task.title);
                }

                if (sort === "priority") {
                    var order = { "High": 1, "Medium": 2, "Low": 3 };
                    return order[a.task.priority] - order[b.task.priority];
                }

                return a.task.date.localeCompare(b.task.date);
            });

            if (visibleTasks.length === 0) {
                list.innerHTML = "<p>No tasks found. Add a task to get started!</p>";
            }

            for (var j = 0; j < visibleTasks.length; j++) {
                var task = visibleTasks[j].task;
                var index = visibleTasks[j].index;

                var taskDiv = document.createElement("div");
                taskDiv.className = "task";

                if (task.status === "Completed") {
                    taskDiv.className += " completed";
                }

                taskDiv.innerHTML =
                    "<h3>" + task.title + "</h3>" +
                    "<p><b>Due date:</b> " + task.date + "</p>" +
                    "<p><b>Category:</b> " + task.category + "</p>" +
                    "<p><b>Priority:</b> " + task.priority + "</p>" +
                    "<p><b>Status:</b> " + task.status + "</p>" +
                    "<div class='task-actions'>" +
                    "<button onclick='editTask(" + index + ")'>Edit</button>" +
                    "<button onclick='deleteTask(" + index + ")' class='delete-button'>Delete</button>" +
                    "</div>";

                list.appendChild(taskDiv);
            }

            updateDashboard();
            checkReminders();
        }

        function editTask(index) {
            var task = tasks[index];

            document.getElementById("taskTitle").value = task.title;
            document.getElementById("taskDate").value = task.date;
            document.getElementById("taskCategory").value = task.category;
            document.getElementById("taskPriority").value = task.priority;
            document.getElementById("taskStatus").value = task.status;

            editIndex = index;
            document.getElementById("formHeading").innerText = "Edit Task";
            document.getElementById("saveButton").innerText = "Update Task";
            document.getElementById("cancelButton").style.display = "inline-block";

            window.scrollTo(0, 0);
        }

        function deleteTask(index) {
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            }
        }

        function clearForm() {
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskDate").value = "";
            document.getElementById("taskCategory").value = "Study";
            document.getElementById("taskPriority").value = "Low";
            document.getElementById("taskStatus").value = "Pending";

            editIndex = -1;
            document.getElementById("formHeading").innerText = "Add a New Task";
            document.getElementById("saveButton").innerText = "Add Task";
            document.getElementById("cancelButton").style.display = "none";
        }

        // Update dashboard numbers and progress bar
        function updateDashboard() {
            var total = tasks.length;
            var pending = 0;
            var inProgress = 0;
            var completed = 0;

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].status === "Pending") pending++;
                if (tasks[i].status === "In Progress") inProgress++;
                if (tasks[i].status === "Completed") completed++;
            }

            var percentage = 0;
            if (total > 0) {
                percentage = Math.round((completed / total) * 100);
            }

            document.getElementById("totalCount").innerText = total;
            document.getElementById("pendingCount").innerText = pending;
            document.getElementById("progressCount").innerText = inProgress;
            document.getElementById("completedCount").innerText = completed;
            document.getElementById("progressBar").style.width = percentage + "%";
            document.getElementById("progressText").innerText = percentage + "% completed";
        }

        // Show an alert for tasks due today or earlier
        function checkReminders() {
            var today = new Date();
            var todayString = today.getFullYear() + "-" +
                String(today.getMonth() + 1).padStart(2, "0") + "-" +
                String(today.getDate()).padStart(2, "0");

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].date <= todayString && tasks[i].status !== "Completed") {
                    // Prevent repeated alerts during the same page visit
                    if (!sessionStorage.getItem("reminder-" + i)) {
                        alert("Reminder: " + tasks[i].title + " is due today or overdue!");
                        sessionStorage.setItem("reminder-" + i, "shown");
                    }
                }
            }
        }
