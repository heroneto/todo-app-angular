import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//external libs
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid'
import { TaskList } from '../../model/task-list';

//intefaces

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  faTrash = faTrash;
  taskList: TaskList[] = []

  taskListForm = this.formBuilder.group({
    name: ''
  })

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    const tasksFromStorage = JSON.parse(localStorage.getItem('taskList') || '[]')
    this.taskList = tasksFromStorage
  }

  addTask() {
    this.taskList.push({
      id: v4(),
      name: this.taskListForm.value.name || '',
      checked: false
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

  toggleCheckedTask(id: string) {
    const newTasks = this.taskList.reduce((acc: TaskList[], cur: TaskList) => {
      if (cur.id === id) {
        cur.checked = !!cur.checked
        acc.push(cur)
        return acc
      }
      acc.push(cur)
      return acc
    }, [])
    this.taskList = newTasks
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }
}
