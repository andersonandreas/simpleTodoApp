// Remove todo
const removeTodoBtn = id => {
  const removeTodo = todos.findIndex(todos => {
    return todos.id === id;
  });
  if (removeTodo > -1) {
    todos.splice(removeTodo, 1);
  }
};

// Toogle the completed value
const toogleTodo = id => {
  const todo = todos.find(todo => {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

// Fetch existing todos from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save to localStorage
const saveTodos = function (todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector('#todos').innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function (todo) {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
  const divCreate = document.createElement('div');
  const someNote = document.createElement('input');
  const spancreate = document.createElement('span');
  const todoBtn = document.createElement('button');

  // checkbox
  someNote.setAttribute('type', 'checkbox');
  someNote.checked = todo.completed;

  someNote.addEventListener('change', () => {
    toogleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  spancreate.textContent = todo.text;
  divCreate.appendChild(someNote);
  divCreate.appendChild(spancreate);

  todoBtn.textContent = 'x';
  divCreate.appendChild(todoBtn);
  todoBtn.addEventListener('click', () => {
    removeTodoBtn(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  return divCreate;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
