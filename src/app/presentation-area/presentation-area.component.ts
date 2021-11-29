import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { DataService } from '../data.service'
import { FutureEvent } from '../types'

@Component({
  selector: 'app-presentation-area',
  templateUrl: './presentation-area.component.html',
  styleUrls: ['./presentation-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationAreaComponent {
  public eventObservable: Observable<FutureEvent | undefined>

  public intervalObservable: Observable<string>

  constructor(private dataService: DataService) {
    this.eventObservable = this.dataService.eventObservable.pipe(
      distinctUntilChanged(),
    )
    this.intervalObservable = this.dataService.intervalObservable.pipe(
      distinctUntilChanged(),
    )
  }
}
