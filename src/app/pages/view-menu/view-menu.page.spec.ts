import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMenuPage } from './view-menu.page';

describe('ViewMenuPage', () => {
  let component: ViewMenuPage;
  let fixture: ComponentFixture<ViewMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
