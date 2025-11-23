import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureTable } from './temperature-table';

describe('TemperatureTable', () => {
  let component: TemperatureTable;
  let fixture: ComponentFixture<TemperatureTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
