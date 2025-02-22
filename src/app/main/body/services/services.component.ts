import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.artisanneInfo = JSON.parse(localStorage.getItem(this.localStorageKey)!).services;
  }

  openModal(index: number): void {
    this.showServiceInfo = this.artisanneInfo[index];
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

}
