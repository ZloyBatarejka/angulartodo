import { Component, OnInit } from '@angular/core';
import {TodoServices} from "../../services/todo.services"
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(public todosService: TodoServices) { }
  ngOnInit(){

  }
  deletePost(id:string){
    this.todosService.deleteTodo(id)
  }
  completePost(id:string){
    this.todosService.completePost(id);
  }
}
