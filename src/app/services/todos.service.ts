import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { 
    console.log("Todo service initializeed ...");
    //Now you are able to call the load function here with this.
    this.load();
  }

  //Bunch of data to be display
  load() {
    if (localStorage.getItem('todos') == null || localStorage.getItem('todos') == undefined) {
      console.log("No todos found todos ... Creating!");
      var todos = [
        {
          id: 1,
          text: "ဟို FA ကောင် ဒံပေါက်ကို ဆော်ရှာပေးရန်",
          finished: true
        },
        {
          id: 2,
          text: "၂၀၂၀ မှာ ကွီးထွန်းကို မဲထည့်ရန်",
          finished: false
        },
        {
          id: 3,
          text: "စိန်ပန်းစေ့တွေ အပင်ပျိုးရန်",
          finished: true
        },
        {
          id: 4,
          text: "စီးတော်ယာဉ်လေးကို စကပ်နဲ့ စပွိုင်လာတပ်ရန်",
          finished: false
        },
        {
          id: 5,
          text: "မအေးသောင်းကို အဆက်အသွယ်ဖြတ်ရန်",
          finished: false
        },
        {
          id: 6,
          text: "ဧရာဝတီကို ကယ်တင်ဖို့ မြစ်ဆုံသွားပြီး ဘီယာသောက်ရန်",
          finished: false
        },
        {
          id: 7,
          text: "ကမ္ဘာကြီးငြိမ်းချမ်းဖို့ အိမ်နောက်ဖေးမှာ ဆေးခြောက်စိုက်ရန်",
          finished: false

      }];

      localStorage.setItem('todos', JSON.stringify(todos));
    }
    else {
      console.log("todos already exist");
    }

  }

  //Gets the data from the localStorage
  getTodos() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  }

  addTodo(newTodo) {
    var id = 1;
    var todos = JSON.parse(localStorage.getItem('todos'));
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id >= id) {
        id = todos[i].id + 1;
      }
    }
    newTodo.id = id;
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteItem(id) {
    var todos = JSON.parse(localStorage.getItem('todos'));
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
      }
    }
    //Set new iteem
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  update(todo) {
    var todos = JSON.parse(localStorage.getItem('todos'));

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == todo.id ) {
          todos[i] = todo;
      }
    }
    //Set new iteem
    localStorage.setItem('todos', JSON.stringify(todos));
  }

}
