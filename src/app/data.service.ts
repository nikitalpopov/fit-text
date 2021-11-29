import { Injectable } from '@angular/core'
import {
  differenceInDays,
  Duration,
  formatISO,
  intervalToDuration,
  isFuture,
  isValid,
  parseISO,
} from 'date-fns'
import { BehaviorSubject, interval, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { FutureEvent } from './types'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _event?: FutureEvent

  private eventSubject = new BehaviorSubject<FutureEvent | undefined>(
    this._event,
  )

  public readonly eventObservable = this.eventSubject.asObservable()

  private intervalHandler?: Subscription
  private intervalSubject = new BehaviorSubject<string>('')
  public readonly intervalObservable = this.intervalSubject.asObservable()

  constructor() {
    /* Useful when we have initial value in localStorage. */
    const event = this.event
    if (event === undefined) {
      /* If no value is stored, using default */
      this.event = {
        title: 'New Years Eve',
        date: new Date(`${new Date().getFullYear()}-12-31`),
      }
    } else {
      this.updateEventValue(event)
    }
  }

  /**
   * Event getter. Checks localStorage for valid values if service _event is undefined.
   * @returns {FutureEvent | undefined}
   */
  public get event(): FutureEvent | undefined {
    if (this._event === undefined) {
      const title = localStorage.getItem('event.title')
      const dateString = localStorage.getItem('event.date')

      if (
        title === null ||
        title === '' ||
        dateString === null ||
        dateString === ''
      ) {
        console.warn('Saved title or date is/are in incorrect format.')

        this.event = undefined
        return undefined
      }

      const date = parseISO(dateString)

      if (!isValid(date)) {
        console.warn('Saved date is not valid.')

        this.event = undefined
        return undefined
      }

      if (!isFuture(date)) {
        console.warn('Saved date has already happened.')

        this.event = undefined
        return undefined
      }

      this._event = {
        title,
        date,
      }
    }

    return this._event
  }

  /**
   * Event setter. Updates localStorage with new value.
   * @param {FutureEvent | undefined} value
   */
  public set event(value: FutureEvent | undefined) {
    if (value !== undefined) {
      value.title = value.title.trim()

      if (value.title === '') {
        // We do not want event without valid title
        value = undefined
      } else if (!isValid(value.date)) {
        // We do not want event without valid date
        value = undefined
      }
    }

    this.updateEventValue(value)

    if (value !== undefined) {
      localStorage.setItem('event.title', value.title)
      localStorage.setItem(
        'event.date',
        formatISO(value.date, { representation: 'date' }),
      )
    } else {
      // Clean localStorage values to avoid leftovers or manually set values.
      localStorage.removeItem('event.title')
      localStorage.removeItem('event.date')
    }
  }

  /**
   * Updates internal _event value and triggers data pushing into Subjects.
   * @param {FutureEvent | undefined} value
   */
  private updateEventValue(value: FutureEvent | undefined): void {
    this._event = value
    this.sendNewValue(value)
  }

  /**
   * Pushes new value to eventSubject.
   * Sets intervalHandler with remaining interval string. If event already happened, then pass string with all zeros.
   * @param {FutureEvent | undefined} value
   */
  private sendNewValue(value: FutureEvent | undefined): void {
    this.eventSubject?.next(value) // ? is only for karma tests

    this.intervalHandler?.unsubscribe()

    if (value !== undefined && isValid(value.date)) {
      if (isFuture(value.date)) {
        // each 0.1s to escape "freezes"
        const observable = interval(100).pipe(
          map(() => {
            const now = new Date()
            const duration: Duration = intervalToDuration({
              start: now,
              end: value.date,
            })
            const { hours, minutes, seconds } = { ...duration }
            const calendarDays = differenceInDays(value.date, now)

            const dateInterval = `${calendarDays} days, ${hours ?? 0}h, ${
              minutes ?? 0
            }m, ${seconds ?? 0}s`
            this.intervalSubject.next(dateInterval)
          }),
        )
        this.intervalHandler = observable.subscribe()
      } else {
        this.intervalSubject.next(`0 days, 0h, 0m, 0s`)
      }
    }
  }
}
