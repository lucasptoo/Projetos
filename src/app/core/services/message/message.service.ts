import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private message: NzMessageService) {}

    public successMessage(message: string) {
        this.message.create('success', message); 
    }

    public errorMessage(message: string) {
        this.message.create('error', message); 
    }

    public warningMessage(message: string) {
        this.message.create('warning', message); 
    }
}