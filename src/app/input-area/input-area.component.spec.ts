/* eslint-disable no-undef */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataService } from '../data.service'
import { InputAreaComponent } from './input-area.component'

describe('InputAreaComponent', () => {
  let component: InputAreaComponent
  let fixture: ComponentFixture<InputAreaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputAreaComponent],
      providers: [{ provide: DataService, use: DataService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
