import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-view', 
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
  providers:[MessageService]
})
export class UserViewComponent {
  user!: User;
  id: any; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      let id = res.get("id");
      this.id = id;
      this.getUser(id);
    });
  }

  getUser(id: any) {
    this.userService.getUserById(id).subscribe((res: any) => {   
      this.user = res;
    });
  }
}
