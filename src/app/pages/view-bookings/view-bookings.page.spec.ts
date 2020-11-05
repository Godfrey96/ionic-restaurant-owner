import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewBookingsPage } from './view-bookings.page';

describe('ViewBookingsPage', () => {
  let component: ViewBookingsPage;
  let fixture: ComponentFixture<ViewBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
