import { renderTodoList } from "./domActions.js";
import { setCurrentFilterState } from "../entry.js";
import {
  filterButtonWrapper,
  filterAllButton,
  filterCompleteButton,
  filterIncompleteButton,
} from "./domElements.js";
import { ALL, COMPLETED, INCOMPLETE } from "../utilities/const.js";

const filterButtons = filterButtonWrapper.getElementsByClassName("button");

function selectedClass(clicked) {
  for (let button of filterButtons) {
    button.classList.remove("active");
  }
  clicked.classList.add("active");
}

export function filterAll() {
  setCurrentFilterState(ALL);
  selectedClass(filterAllButton);
  renderTodoList();
}

export function filterComplete() {
  setCurrentFilterState(COMPLETED);
  selectedClass(filterCompleteButton);
  renderTodoList();
}

export function filterIncomplete() {
  setCurrentFilterState(INCOMPLETE);
  selectedClass(filterIncompleteButton);
  renderTodoList();
}
