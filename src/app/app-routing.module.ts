import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logo',
    pathMatch: 'full'
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  {
    path: 'add-restaurant',
    loadChildren: () => import('./pages/add-restaurant/add-restaurant.module').then( m => m.AddRestaurantPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'add-menu',
    loadChildren: () => import('./pages/add-menu/add-menu.module').then( m => m.AddMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  // {
  //   path: 'view-bookings',
  //   loadChildren: () => import('./pages/view-bookings/view-bookings.module').then( m => m.ViewBookingsPageModule)
  // },
  {
    path: 'edit-restaurant/:id',
    loadChildren: () => import('./pages/edit-restaurant/edit-restaurant.module').then( m => m.EditRestaurantPageModule)
  },
  {
    path: 'view-menu/:id',
    loadChildren: () => import('./pages/view-menu/view-menu.module').then( m => m.ViewMenuPageModule)
  },
  {
    path: 'logo',
    loadChildren: () => import('./pages/logo/logo.module').then( m => m.LogoPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: 'dash-profile',
  //   loadChildren: () => import('./pages/dash-profile/dash-profile.module').then( m => m.DashProfilePageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
