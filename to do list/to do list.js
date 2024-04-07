const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Função para carregar as tarefas do armazenamento local
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    createTaskElement(task);
  });
}

// Função para adicionar uma nova tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = { id: Date.now(), text: taskText };
    createTaskElement(task);
    saveTasks();
    taskInput.value = '';
  }
}

// Função para criar um elemento de tarefa
function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id; // Armazenar o ID da tarefa como um atributo de dados
  li.innerHTML = `<span>${task.text}</span>` + 
    '<button onclick="editTask(this)">Editar</button>' +
    '<button onclick="removeTask(this)">Remover</button>';
  taskList.appendChild(li);
}

// Função para editar uma tarefa
function editTask(button) {
  const li = button.parentElement;
  const newText = prompt('Editar tarefa:', li.querySelector('span').textContent);
  if (newText !== null && newText.trim() !== '') {
    li.querySelector('span').textContent = newText.trim();
    saveTasks();
  }
}

// Função para remover uma tarefa
function removeTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

// Função para salvar as tarefas no armazenamento local
function saveTasks() {
  const tasks = [];
  const taskElements = taskList.getElementsByTagName('li');
  for (let i = 0; i < taskElements.length; i++) {
    const taskText = taskElements[i].querySelector('span').textContent.trim();
    const taskId = taskElements[i].dataset.id;
    tasks.push({ id: taskId, text: taskText });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona um listener de evento para marcar tarefas como completas
taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'SPAN') {
    event.target.parentElement.classList.toggle('completed');
    saveTasks();
  }
});

// Carrega as tarefas ao carregar a página
loadTasks();
