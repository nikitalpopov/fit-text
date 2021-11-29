/* eslint-disable no-undef */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DataService } from '../data.service'
import { PresentationAreaComponent } from './presentation-area.component'

describe('PresentationAreaComponent', () => {
  let component: PresentationAreaComponent
  let fixture: ComponentFixture<PresentationAreaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresentationAreaComponent],
      providers: [{ provide: DataService, use: DataService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
