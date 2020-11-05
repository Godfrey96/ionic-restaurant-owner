import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMenuPage } from './add-menu.page';

describe('AddMenuPage', () => {
  let component: AddMenuPage;
  let fixture: ComponentFixture<AddMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
