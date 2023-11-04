import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid'


type Task = {
  id: string,
  name: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'todo-app-angular';
  faTrash = faTrash;
  taskList: Task[] = []

  taskListForm = this.formBuilder.group({
    name: ''
  })

  constructor(
    private formBuilder: FormBuilder
  ) {
    const tasksFromStorage = JSON.parse(localStorage.getItem('taskList') || '[]')
    this.taskList = tasksFromStorage
  }

  addTask() {
    this.taskList.push({
      id: v4(),
      name: this.taskListForm.value.name || ''
    })
    this.taskListForm.reset()
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }

  deleteTask(id: string) {
    const newTasks = this.taskList.filter(task => task.id !== id)
    this.taskList = newTasks
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }

  clearTasks() {
    this.taskList = []
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }

}
