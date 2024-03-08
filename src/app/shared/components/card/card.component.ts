import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Input() iconClass: string | undefined;
}
