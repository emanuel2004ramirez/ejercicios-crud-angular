import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoComponentComponent } from './producto-component.component';
import { provideRouter } from '@angular/router';
import { LoginComponentComponent } from '../login-component/login-component.component';

describe('ProductoComponentComponent', () => {
  let component: ProductoComponentComponent;
  let fixture: ComponentFixture<ProductoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoComponentComponent],
      providers: [provideRouter([{ path: 'login', component: LoginComponentComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoComponentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
