import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDetail } from './drop-detail';

describe('DropDetail', () => {
  let component: DropDetail;
  let fixture: ComponentFixture<DropDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DropDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
