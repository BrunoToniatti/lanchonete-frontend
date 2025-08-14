import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Histoy } from './histoy';

describe('Histoy', () => {
  let component: Histoy;
  let fixture: ComponentFixture<Histoy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Histoy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Histoy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
