import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule }    from '@angular/common/http';
import { JwtInterceptor } from './shared/jwt.interceptor'
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule, } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    NgxSmartLoaderModule,
   ToastNoAnimationModule,
     ToastrModule.forRoot({
        toastComponent: ToastNoAnimation,
        progressBar:true
     }), // ToastrModule added
  ],
  exports:[SharedModule],
  providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    NgxSmartLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
