const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.innerHTML = taskText + '<button onclick="editTask(this)">Editar</button>' +
                    '<button onclick="removeTask(this)">Remover</button>';
    taskList.appendChild(li);
    taskInput.value = '';
  }
}

function editTask(button) {
  const li = button.parentElement;
  const newText = prompt('Editar tarefa:', li.firstChild.textContent);
  if (newText !== null && newText.trim() !== '') {
    li.firstChild.textContent = newText.trim();
  }
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}

taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
});