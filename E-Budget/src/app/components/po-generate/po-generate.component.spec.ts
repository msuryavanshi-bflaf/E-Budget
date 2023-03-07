import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGenerateComponent } from './po-generate.component';

describe('PoGenerateComponent', () => {
  let component: PoGenerateComponent;
  let fixture: ComponentFixture<PoGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
