import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelledPage } from './cancelled.page';

describe('CancelledPage', () => {
  let component: CancelledPage;
  let fixture: ComponentFixture<CancelledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
