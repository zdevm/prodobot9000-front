import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoginService } from '@modules/login/services/login.service';
import { UserService } from '@modules/user/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements AfterViewInit {
  @ViewChild('content') modalContent: any;
  @Output() closed = new EventEmitter<void>();
  private modalRef?: NgbModalRef

  constructor(private readonly modalService: NgbModal,
              private readonly loginService: LoginService,
              private readonly userService: UserService) {
    this.userService.user.subscribe(user => this.close())
  }

  ngAfterViewInit(): void {
    this.loginService.loginModalComponentListener$.subscribe(command => { 
      if (command in this && typeof this[command] === 'function') {
        this[command]();
      }
    }); 
  }

  show() {
    if (!this.modalContent) {
      throw new Error('Could not find modal content in template.');
    }
    this.modalRef = this.modalService.open(this.modalContent);
    const closeEmitFn = () => this.closed.emit();
    this.modalRef.closed.subscribe(closeEmitFn)
    this.modalRef.dismissed.subscribe(closeEmitFn);
  }

  close() {
    this.modalRef?.dismiss();
  }

}
