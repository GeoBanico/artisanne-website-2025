// auth.guard.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { InSiteStorageService } from '../service/in-site-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private localStorageKey = 'artisanneInfo';

  constructor(
    private http: HttpClient,
    private router: Router,
    private inSiteStorage: InSiteStorageService
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const artisanneInfo = localStorage.getItem(this.localStorageKey);
      if(artisanneInfo) {
        const sheetInfoLs = JSON.parse(artisanneInfo);
        const latestSheetLastUpdate = await this.loadSheetsLastUpdate();
  
        if(sheetInfoLs.lastUpdate != latestSheetLastUpdate) 
          return this.redirectToLoading();
      }
      else {
        return this.redirectToLoading();
      }

      return true;
    } catch {
      if(Object.keys(this.inSiteStorage.artisanneData).length > 0) return true;
      return this.redirectToLoading();
    }
  }

  redirectToLoading(): boolean {
    this.router.navigate(['/']);
    return false;
  }

  // CHECK SHEET LastUpdate
  async loadSheetsLastUpdate(): Promise<any> {
    const lastUpdateUrl = 'https://docs.google.com/spreadsheets/d/1bcxsIdmHSPR4bJ56wuFTHQ8N8u7rQ350sJI9ON9Hsjc/gviz/tq?tqx=out:csv&sheet=Info'
    const data = await firstValueFrom(this.http.get(lastUpdateUrl, { responseType: 'text' }));
    const sheet = this.filterText(data);
    return sheet.split(',')[1];
  }

  filterText(textVal: string): string {
    return textVal.replaceAll('"', '');
  }
}
