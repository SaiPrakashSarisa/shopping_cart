import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { RetailerRoutingModule } from './retailer-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RetailerRoutingModule],
})
export class RetailerModule {}
