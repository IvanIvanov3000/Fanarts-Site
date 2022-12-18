import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { LoginPageComponent } from './auth-pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth-pages/register-page/register-page.component';

import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsEditPageComponent } from './details-edit-page/details-edit-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MyPostsPageComponent } from './my-posts-page/my-posts-page.component';
import { ProfilePageComponent } from './auth-pages/profile-page/profile-page.component';
import { ProfileEditPageComponent } from './auth-pages/profile-edit-page/profile-edit-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

import { AuthGuardGuard } from './auth-pages/auth-guard.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'catalog', component: CatalogPageComponent },

  { path: 'details/:id', component: DetailsPageComponent },
  { path: 'details/:id/edit', component: DetailsEditPageComponent, canActivate: [AuthGuardGuard] },
  { path: 'create', component: CreatePageComponent, canActivate: [AuthGuardGuard] },

  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'myposts', component: MyPostsPageComponent, canActivate: [AuthGuardGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardGuard] },
  { path: 'profile/edit', component: ProfileEditPageComponent, canActivate: [AuthGuardGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
