import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { RouteService } from '../../core/services/route.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
    data: any;

    constructor(private routeService: RouteService) {}

    toggleSidebar() {
        this.sidebarComponent.sidebarVisible = !this.sidebarComponent.sidebarVisible;
    }

    ngOnInit() {
        if (typeof window !== 'undefined') {
            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ['#2B2D42', '#FFD700', '#7FFFD4'],
                        hoverBackgroundColor: ['#1D1F2A', '#FFD700', '#00CED1']
                    }
                ]
            };
        }
    }
}