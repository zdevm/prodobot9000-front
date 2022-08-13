import { Component, OnInit } from '@angular/core';
import { UserService } from '@modules/user/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  userImage: string | null = null;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
  }

}
