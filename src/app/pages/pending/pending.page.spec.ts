import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingPage } from './pending.page';

describe('PendingPage', () => {
  let component: PendingPage;
  let fixture: ComponentFixture<PendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
