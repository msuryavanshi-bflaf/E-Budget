import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureLoginTestingComponent } from './azure-login-testing.component';

describe('AzureLoginTestingComponent', () => {
  let component: AzureLoginTestingComponent;
  let fixture: ComponentFixture<AzureLoginTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzureLoginTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureLoginTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
