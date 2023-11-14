import { renderTodoList } from "./domActions.js";
import { setCurrentFilterState } from "../entry.js";
import {
  filterButtonWrapper,
  filterAllButton,
  filterCompleteButton,
  filterIncompleteButton,
} from "./domElements.js";

const filterButtons = filterButtonWrapper.getElementsByClassName("button");

function selectedClass(clicked) {
  for (let current of filterButtons) {
    current.classList.remove("active");
  }
  clicked.classList.add("active");
}

export function filterAll() {
  setCurrentFilterState("all");
  selectedClass(filterAllButton);
  renderTodoList();
}

export function filterComplete() {
  setCurrentFilterState("complete");
  selectedClass(filterCompleteButton);
  renderTodoList();
}

export function filterIncomplete() {
  setCurrentFilterState("incomplete");
  selectedClass(filterIncompleteButton);
  renderTodoList();
}
