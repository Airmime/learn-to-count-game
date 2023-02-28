import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent {

  @Input() textButton: string = 'Button';
  @Input() classButton: string[] = [...'ms-btn'];
  @Input() styleButton: string = '';
  @Input() iconButton: any = null;
}
