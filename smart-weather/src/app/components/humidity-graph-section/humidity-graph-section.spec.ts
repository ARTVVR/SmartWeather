import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityGraphSection } from './humidity-graph-section';

describe('HumidityGraphSection', () => {
  let component: HumidityGraphSection;
  let fixture: ComponentFixture<HumidityGraphSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityGraphSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityGraphSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
