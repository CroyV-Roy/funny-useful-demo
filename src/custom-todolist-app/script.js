/* eslint-disable prettier/prettier */
const taskInput = document.querySelector('.task-input input');
const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-btn');
const taskBox = document.querySelector('.task-box');

let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem('todo-list'));

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('span.active').classList.remove('active');
    btn.classList.add('active');
    showTodo(btn.id);
  })
})

function showTodo(filter) {
  let liTag = '';
  if (!todos) return;

  todos.forEach((todo, id) => {
    let completed = todo.status == 'completed' ? 'checked' : '';
    if (filter == todo.status || filter == 'all') {
      liTag += `
        <li class="task">
          <label for="${id}">
            <input type="checkbox" id="${id}" onclick="updateStatus(this)" ${completed}>
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
              <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
              <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
    }
  });
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelector('.task');
  // 判断todo列表有无内容来决定clear按钮是否可用
  !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
  // 判断内容是否超出规定容器高度
  taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo('all');

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add('show');
  document.addEventListener('click', e => {
    if (e.target.nodeName != 'I' || e.target != selectedTask) {
      menuDiv.classList.remove('show');
    }
  })
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
}

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo()
});

taskInput.addEventListener('keyup', e => {
  let userTask = taskInput.value.trim();
  if (e.key == 'Enter' && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = {name: userTask, status: "pending"};
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});