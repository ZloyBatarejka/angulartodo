import { Component, OnInit } from '@angular/core';
import { TodoServices, ITodo } from 'src/app/services/todo.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup

  constructor(public todosService: TodoServices) {

  }
  ngOnInit(){
    this.form = new FormGroup({
      title:  new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    this.todosService.fetchTodos()
  }
  addPost(){
    const todo:ITodo = {
      title: this.form.value.title,
      complted: false,
      date: new Date()
    }
    this.todosService.addTodo(todo)
    this.form.reset()
  }
}
