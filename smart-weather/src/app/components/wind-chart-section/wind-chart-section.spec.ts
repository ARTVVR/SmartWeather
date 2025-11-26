import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindChartSection } from './wind-chart-section';

describe('WindChartSection', () => {
  let component: WindChartSection;
  let fixture: ComponentFixture<WindChartSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindChartSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindChartSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
