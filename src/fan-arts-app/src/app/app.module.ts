import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './auth-pages/login-page/login-page.component';
import { HomeHeroComponent } from './home-page/home-hero/home-hero.component';
import { ListOfFanArtsComponent } from './list-of-fan-arts/list-of-fan-arts.component';
import { FanArtComponent } from './list-of-fan-arts/fan-art/fan-art.component';
import { RegisterPageComponent } from './auth-pages/register-page/register-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailsEditPageComponent } from './details-edit-page/details-edit-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { MyPostsPageComponent } from './my-posts-page/my-posts-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileEditPageComponent } from './profile-edit-page/profile-edit-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    HomeHeroComponent,
    ListOfFanArtsComponent,
    FanArtComponent,
    RegisterPageComponent,
    AboutPageComponent,
    CatalogPageComponent,
    CreatePageComponent,
    DetailsEditPageComponent,
    DetailsPageComponent,
    MyPostsPageComponent,
    ProfilePageComponent,
    ProfileEditPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
