import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DeadlineService } from '../deadline.service';
import { Observable, Subscription, interval } from 'rxjs';
import { switchMap, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-deadline-timer',
  templateUrl: './deadline-timer.component.html',
  styleUrls: ['./deadline-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineTimerComponent implements OnInit, OnDestroy {

  secondsLeft: number = 0;
  timerStatus: boolean = false;
  private sub = new Subscription();


  constructor(
    private deadlineService: DeadlineService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.timerStatus = true;
    const fetchSub = this.deadlineService.getDeadline().pipe(
      tap(response => this.secondsLeft = response.secondsLeft),
      switchMap(() =>
        interval(1000).pipe(
          tap(() => {
            this.secondsLeft--;
            if(this.secondsLeft <=0){
              this.timerStatus = false;
            }
            this.cdr.markForCheck();
          }),
          takeWhile(() => this.secondsLeft > 0)
          
        )
      )
    ).subscribe();

    this.sub.add(fetchSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();;
  }
}
