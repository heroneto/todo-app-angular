import { Component } from '@angular/core';

type Task = {
  id: string,
  name: string
}
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent {

}
