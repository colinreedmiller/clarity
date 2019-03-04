/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { Dashboard } from './dashboard';
import { DashboardsDemo } from './dashboards.demo';
import { ROUTING } from './dashboards.demo.routing';

@NgModule({
  imports: [CommonModule, ClarityModule, ROUTING],
  declarations: [DashboardsDemo, Dashboard],
  exports: [DashboardsDemo, Dashboard],
})
export class DashboardsDemoModule {}
