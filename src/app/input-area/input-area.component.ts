import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { add } from 'date-fns'
import { DataService } from '../data.service'
import { whitespaceValidator } from '../whitespace.validator'

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAreaComponent {
  public tomorrow: Date = add(new Date(), {
    days: 1,
  })

  public formGroup: FormGroup

  public get title() {
    return this.formGroup.controls.title
  }

  constructor(private dataService: DataService) {
    const savedEvent = this.dataService.event

    this.formGroup = new FormGroup({
      title: new FormControl(savedEvent?.title ?? '', [
        Validators.required,
        whitespaceValidator, // we don't want title to be whitespace-only string
      ]),
      date: new FormControl(savedEvent?.date ?? this.tomorrow, [
        Validators.required,
      ]),
    })
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.dataService.event = this.formGroup.value
    }
  }
}
