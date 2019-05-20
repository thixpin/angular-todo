import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private firestore: AngularFirestore
  ) { 
    console.log("Todo service initializeed ...");
    //Now you are able to call the load function here with this.
    //this.load();
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

  
  getTodos() {
    return this.firestore.collection('todos').snapshotChanges();
  }

  createTodo(todo){
    return this.firestore.collection("todos").add(todo).then(
      res => {
        //console.log(res._key.path.segments[1])
      }, 
      err => console.log(err));;
  }
  // addTodo(todo: Todo) {
  //   console.log(todo);
  //   //return this.firestore.collection('todos').add(todo);
  // }

  deleteItem(todoID: string) {
    this.firestore.doc('todos/' + todoID).delete();
  }

  update(todo: Todo) {
    //delete todo.id;
    this.firestore.doc('todos/' + todo.id).update(todo);
  }

}
