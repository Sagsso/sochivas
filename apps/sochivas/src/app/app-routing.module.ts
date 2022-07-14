import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
// import { NotAuthenticatedGuard } from './shared/guards/not-authenticated.guard';

const routes: Routes = [
  // {
  //   path:'',
  //   // canActivate: [AuthenticatedGuard],
  //   loadChildren: () => import('./inscriptions/inscriptions.module').then(m => m.InscriptionsModule)
  // },
 {
  path:'',
  component: AppComponent
 },
  // {
  //   path:'inscriptions',
  //   // canActivate: [AuthenticatedGuard],
  //   loadChildren: () => import('./inscriptions/inscriptions.module').then(m => m.InscriptionsModule)
  // },
//   {
//     path:'login',
//     // canActivate: [NotAuthenticatedGuard],
//     // loadChildren: () => import('./public/login/login.module').then( m => m.LoginModule)
//   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }