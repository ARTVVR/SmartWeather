import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureGraphSection } from './temperature-graph-section';

describe('TemperatureGraphSection', () => {
  let component: TemperatureGraphSection;
  let fixture: ComponentFixture<TemperatureGraphSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureGraphSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureGraphSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
