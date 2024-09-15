import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 // usersfromHomeComponent = input.required<any>()

  //old way of sharing data from child component to a parent component using output decorator and event emitter
  //@Output() cancelRegister =new EventEmitter();

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>()
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.cancel();
      },
      error : error => this.toastr.error(error.error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
