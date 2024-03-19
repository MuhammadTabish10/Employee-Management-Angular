import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Attendance } from '../../../core/models/attendance.model';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrl: './attendance-view.component.css',
  providers: [MessageService]
})
export class AttendanceViewComponent {
  attendance!: Attendance;
  id: any; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private attendanceService: AttendanceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      let id = res.get("id");
      this.id = id;
      this.getAttendance(id);
    });
  }

  getAttendance(id: any) {
    this.attendanceService.getAttendanceById(id).subscribe((res: any) => {   
      this.attendance = res;
    });
  }
}
