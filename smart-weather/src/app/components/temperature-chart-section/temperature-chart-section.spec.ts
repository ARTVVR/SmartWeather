import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartSection } from './temperature-chart-section';

describe('TemperatureChartSection', () => {
  let component: TemperatureChartSection;
  let fixture: ComponentFixture<TemperatureChartSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureChartSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
