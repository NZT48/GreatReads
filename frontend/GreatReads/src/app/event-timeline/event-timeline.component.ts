import { Component, OnInit } from '@angular/core';
import { PlannerService } from '../planner.service';


@Component({
  selector: 'app-event-timeline',
  templateUrl: './event-timeline.component.html',
  styleUrls: ['./event-timeline.component.css']
})
export class EventTimelineComponent implements OnInit {

  public events;
  public loggedIn: boolean;

  constructor(
    private planr: PlannerService,
  ) { }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.planr.getEvents().subscribe(
      response => {
        this.events = response;
      }
    )
  }

}
