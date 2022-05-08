import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
    CatalogPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
