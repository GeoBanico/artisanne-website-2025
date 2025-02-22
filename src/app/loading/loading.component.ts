import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { InSiteStorageService } from '../service/in-site-storage.service';

@Component({
  selector: 'app-loading',
  standalone: false,
  
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})

export class LoadingComponent implements OnInit {
  private localStorageKey = 'artisanneInfo';
  sheetInfo: any = {};
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private inSiteStorage: InSiteStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const artisanneInfo = localStorage.getItem(this.localStorageKey);

      if(artisanneInfo) {
        const sheetInfoLs = JSON.parse(artisanneInfo);
        const latestSheetLastUpdate = await this.loadSheetsLastUpdate();

        if(latestSheetLastUpdate == sheetInfoLs.lastUpdate) {
          this.sheetInfo = sheetInfoLs;
        } else {
          await this.fetchAllSheetData();
        }
      } else {
        await this.fetchAllSheetData();
      }

      this.router.navigate(['/home'])
    } catch {
      await this.fetchAllSheetData();
      this.inSiteStorage.artisanneData = this.sheetInfo;
      
      this.router.navigate(['/home']);
    }
  }

  // CHECK SHEET LastUpdate
  async loadSheetsLastUpdate(): Promise<any> {
    const lastUpdateUrl = 'https://docs.google.com/spreadsheets/d/1bcxsIdmHSPR4bJ56wuFTHQ8N8u7rQ350sJI9ON9Hsjc/gviz/tq?tqx=out:csv&sheet=Info'
    const data = await firstValueFrom(this.http.get(lastUpdateUrl, { responseType: 'text' }));
    const sheet = this.filterText(data);
    return sheet.split(',')[1];
  }

  // FETCH ALL SHEET DATA
  async fetchAllSheetData(): Promise<void> {
    this.sheetInfo = {
      lastUpdate: await this.loadSheetsLastUpdate(),
      services: await this.loadSheetsServices()
    };

    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.sheetInfo));
    } catch {}
  }

  // FETCH SERVICES
  async loadSheetsServices(): Promise<any> {
    const sheetPageNames = ['SPMU', 'Hair_Removal', 'Facial', 'Acne_Treatment', 'Anti_Aging', 'Scar_Removal', 'Nails', 'Warts_Removal', 'LTR', 'IV_Gluta', 'Skin_Whitening', 'Massage', 'Slimming'];
    let sheetData: any[] = [];

    for(const name of sheetPageNames) {
      sheetData.push(await this.fetchSheetServiceData(`https://docs.google.com/spreadsheets/d/1bcxsIdmHSPR4bJ56wuFTHQ8N8u7rQ350sJI9ON9Hsjc/gviz/tq?tqx=out:csv&sheet=${name}`));
    }
    
    if(sheetData.length != sheetPageNames.length) {
      console.error('Sheet Page Mismatch: There is a missing page');
    }

    return sheetData;
  }

  async fetchSheetServiceData(url: string): Promise<any> {
    try {
      const data = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      const sheet = this.csvServiceToArray(this.filterText(data));
      return sheet;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  csvServiceToArray(csv: string): any {
    const rows = csv.split('\n');
    const headers = (rows[0].split(',')).join();
    const url = (rows[1].split(',')).join();
    const shortDescription = (rows[2].split(',')).join();
    const description = (rows[3].split(',')).join();

    const offers = rows.slice(4).map(row => {
      return (row.split(',')).join();
    });

    return {
      category: headers,
      url: url,
      shortDescription: shortDescription,
      description: description,
      offers: offers
    }
  }

  filterText(textVal: string): string {
    return textVal.replaceAll('"', '');
  }
}
