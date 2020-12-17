import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashProfilePage } from './dash-profile.page';

describe('DashProfilePage', () => {
  let component: DashProfilePage;
  let fixture: ComponentFixture<DashProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
