import { Component } from '@angular/core';
import { Message, MessageService } from './message.service';

@Component({
  // selector: 'wm-message',
  selector: 'wm-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.scss' ],
})
export class MessageComponent {

  // @HostBinding('class') classes = 'wmAlert';

  message?: Message;

  timeout?: number;

  constructor(private messageService: MessageService) {
    this.message = undefined;

    this.messageService.getSubject().subscribe(next => {
      this.message = next;

      if (next && next.duration) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.closeAlert();
        }, next.duration);
      }
    });
  }

  closeAlert() {
    this.message = undefined;
  }
}
