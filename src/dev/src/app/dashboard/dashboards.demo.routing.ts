/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Dashboard } from './dashboard';
import { DashboardsDemo } from './dashboards.demo';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardsDemo,
    children: [{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }, { path: 'dashboard', component: Dashboard }],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
