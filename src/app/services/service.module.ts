import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
