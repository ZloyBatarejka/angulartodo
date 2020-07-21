import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Observable} from 'rxjs'
export interface ITodo {
  title: string,
  id?: string,
  complted: boolean,
  date: Date
}
@Injectable({providedIn: 'root'})
export class TodoServices {
  constructor(private http: HttpClient) { }
  posts:ITodo[] = []

  addTodo(todo:ITodo):void{
    this.http.post('https://angulartodo-bbe89.firebaseio.com/posts.json',todo).
    subscribe((response: {name:string})=>{
      todo.id = response.name;
      this.posts.push(todo)
      this.http.put<ITodo>(`https://angulartodo-bbe89.firebaseio.com/posts/${response.name}.json`, {
      id: response.name,
      ...todo
    }).subscribe()
    })
  }
  fetchTodos():void{
    this.http.get('https://angulartodo-bbe89.firebaseio.com/posts.json')
    .subscribe((response)=>{
      this.posts = response ? Object.values(response) : [];
    })
  }
  deleteTodo(id:string){
    this.http.delete(`https://angulartodo-bbe89.firebaseio.com/posts/${id}.json`)
    .subscribe(()=>{
      this.posts = this.posts.filter(post=>post.id!==id)
    })
  }
  completePost(id:string){
    this.http.patch(`https://angulartodo-bbe89.firebaseio.com/posts/${id}.json`,{complted: true})
    .subscribe(()=>{
      this.posts.find(todo=>todo.id===id).complted = true;
    })
  }
}
