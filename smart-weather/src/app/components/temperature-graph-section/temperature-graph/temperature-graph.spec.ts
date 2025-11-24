import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureGraph } from './temperature-graph';

describe('TemperatureGraph', () => {
  let component: TemperatureGraph;
  let fixture: ComponentFixture<TemperatureGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
