import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoPage } from './logo.page';

describe('LogoPage', () => {
  let component: LogoPage;
  let fixture: ComponentFixture<LogoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
