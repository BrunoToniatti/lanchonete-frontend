import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retirada } from './retirada';

describe('Retirada', () => {
  let component: Retirada;
  let fixture: ComponentFixture<Retirada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retirada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Retirada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
