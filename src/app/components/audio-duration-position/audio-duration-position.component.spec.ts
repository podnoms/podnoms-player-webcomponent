import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioDurationPositionComponent } from './audio-duration-position.component';

describe('AudioDurationPositionComponent', () => {
  let component: AudioDurationPositionComponent;
  let fixture: ComponentFixture<AudioDurationPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioDurationPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioDurationPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
