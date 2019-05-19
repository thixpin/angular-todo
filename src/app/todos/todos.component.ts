import { Component, OnInit } from '@angular/core';
import {TodosService } from "../services/todos.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  private todos;
  private text;


  oldTodo = { id: 0, text: '', finished: false }
  newID = 1;
  appState = 'default';
  response: string;

  constructor(
    private _todoService: TodosService
  ) { }

  ngOnInit() {
    this.todos = this._todoService.getTodos();

    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id >= this.newID) {
        this.newID = this.todos[i].id + 1;
      }
    }
 
  }

  addTodo() {
    var newTodo = {
      id: this.newID,
      text: this.text,
      finished: false
    }
    console.log(newTodo);
    this.todos.push(newTodo);
    this._todoService.addTodo(newTodo);
    this.newID +=1 ;
  }

  deleteTodo(id) {
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == id) {
        this.todos.splice(i, 1);
      }
    }
    // this.deleteTodoFirebase(todoText);
    this._todoService.deleteItem(id);
  }

  editTodo(todo) {
    this.oldTodo = todo;
    this.appState = 'edit';
  }

  updateTodo(oldTodo) {
  
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == oldTodo.id) {
        this.todos[i].text = oldTodo.text;
      }
    }
    this._todoService.update(oldTodo);
    this.oldTodo = { id: 0, text: '', finished: false };
    this.appState = 'default';
  }


}
