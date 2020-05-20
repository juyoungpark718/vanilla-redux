import { createStore } from "redux";

const list = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("input");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const delteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((e) => e.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const paintToDos = () => {
  const toDos = store.getState();
  list.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo);
    btn.innerText = "삭제";
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    list.appendChild(li);
  });
};

store.subscribe(paintToDos);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(delteToDo(id));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  dispatchAddToDo(text);
};

form.addEventListener("submit", handleSubmit);
