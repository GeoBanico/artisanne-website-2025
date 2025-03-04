import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  
  public currentYear: string = '';

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
