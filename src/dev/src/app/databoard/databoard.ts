/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

import { ClrDatagridStateInterface } from '@clr/angular';
import { FetchResult, Inventory } from '../datagrid/inventory/inventory';
import { User } from '../datagrid/inventory/user';
import { PokemonComparator } from '../datagrid/utils/pokemon-comparator';
import { PokemonFilter } from '../datagrid/utils/pokemon-filter';

@Component({
  selector: 'clr-databoard',
  styleUrls: ['./databoard.demo.scss'],
  providers: [Inventory],
  templateUrl: './databoard.demo.html',
})
export class Databoard {
  options = {
    totalUsers: 103,
    pageSize: '15',
    selectable: true,
    loremIpsum: true,

    server: false,
    latency: '500',
  };

  resetting = true;
  currentPageSize: number;
  users: User[];
  selected: User[];
  loremIpsumColumn: boolean;
  // Server-driven specific
  isServerDriven = false;
  loading = true;
  total: number;

  nameFilter = 'd';

  pokemonComparator = new PokemonComparator();
  pokemonFilter = new PokemonFilter();

  constructor(private inventory: Inventory) {
    this.reset();
  }

  reset() {
    this.resetting = true;
    this.loading = true;

    // Timeout hack to make sure we completely reset the datagrid
    setTimeout(() => {
      this.inventory.size = this.options.totalUsers;
      this.currentPageSize = Number.parseInt(this.options.pageSize, 10);
      this.selected = this.options.selectable ? [] : null;
      this.loremIpsumColumn = this.options.loremIpsum;
      this.isServerDriven = this.options.server;
      this.inventory.latency = Number.parseInt(this.options.latency, 10);

      this.inventory.reset();
      if (this.isServerDriven) {
        this.users = [];
      } else {
        this.users = this.inventory.all;
      }
      this.resetting = false;
    });
  }

  refresh(state: ClrDatagridStateInterface) {
    if (!this.isServerDriven) {
      return;
    }
    this.loading = true;
    const filters: { [key: string]: any[] } = {};
    if (state.filters) {
      for (const filter of state.filters) {
        const { property, value } = <{ property: string; value: string }>filter;
        filters[property] = [value];
      }
    }
    this.inventory
      .filter(filters)
      .sort(<{ by: string; reverse: boolean }>state.sort)
      .fetch(state.page && state.page.from, state.page && state.page.size)
      .then((result: FetchResult) => {
        this.users = result.users;
        this.total = result.length;
        this.loading = false;
      });
  }

  trackById(idx, item) {
    return item.id;
  }
}
