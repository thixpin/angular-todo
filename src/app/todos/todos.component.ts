import { Component, OnInit } from '@angular/core';
import {TodosService } from "../services/todos.service";
import { Todo } from 'src/app/model/todo.model';

import { Virama } from "virama-js";
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  public text;

  oldTodo: Todo;
  newID = 1;
  appState = 'default';
  response: string;

  constructor(
    private todoService: TodosService
  ) { }

  ngOnInit() {

    this.loadTodos();
 
  }

  loadTodos(){
    this.todoService.getTodos().subscribe(data => {
      const todos = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Todo;
      });
      this.todos = todos.sort(function(a, b){return b.timeStamp - a.timeStamp});
      //console.log(this.todos);
    });
  }


  addTodo(){

    var todo = {
      text: Virama.textToWrite(this.text),
      finished: false,
      timeStamp: Date.now()
    }
    
    this.todoService.createTodo(todo);
    this.text = '';

  }


  deleteTodo(id: string) {
    this.todoService.deleteItem(id);
  }

  editTodo(todo) {
    this.oldTodo = { 
      id: todo.id, 
      text: Virama.textToRead(todo.text) , 
      finished: todo.finished,
      timeStamp: todo.timeStamp
    };
    this.oldTodo.text = this.oldTodo.text;
    this.appState = 'edit';
  }

  updateTodo(todo) {
    todo.text = Virama.textToWrite(todo.text);
    this.todoService.update(todo);
    this.oldTodo = new Todo;
    this.appState = 'default';
  }

  checkboxOnChanged(todo) {
    this.todoService.update(todo);
  }


}
