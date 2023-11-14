import { renderTodoList } from "./domActions.js";
import { setCurrentFilterState } from "../entry.js";

export function filterAll() {
  setCurrentFilterState("all");
  renderTodoList();
}

export function filterComplete() {
  setCurrentFilterState("complete");
  renderTodoList();
}

export function filterIncomplete() {
  setCurrentFilterState("incomplete");
  renderTodoList();
}
