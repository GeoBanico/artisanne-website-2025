import { Component, OnInit } from '@angular/core';
import { InSiteStorageService } from '../../../service/in-site-storage.service';

@Component({
  selector: 'app-services',
  standalone: false,
  
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  private localStorageKey = 'artisanneInfo';
  artisanneInfo: any = [];
  showModal: boolean = false;
  showServiceInfo: any = {};

  constructor(
    private inSiteStorage: InSiteStorageService
  ) {}

  ngOnInit(): void {
    try {
      this.artisanneInfo = JSON.parse(localStorage.getItem(this.localStorageKey)!).services;
    } catch {
      this.artisanneInfo = this.inSiteStorage.artisanneData.services;
    }
  }

  openModal(index: number): void {
    this.showServiceInfo = this.artisanneInfo[index];
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

}
