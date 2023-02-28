import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureLoginComponent } from './azure-login.component';

describe('AzureLoginComponent', () => {
  let component: AzureLoginComponent;
  let fixture: ComponentFixture<AzureLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzureLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
