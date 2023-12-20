import {Component, ElementRef, inject, Input} from "@angular/core";
import {fromEvent} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  @Input() value: boolean = false

  constructor() {
    const elementRef = inject(ElementRef)
    fromEvent(elementRef.nativeElement, 'click').subscribe(() => {
      this.value = !this.value
    })
  }
}
