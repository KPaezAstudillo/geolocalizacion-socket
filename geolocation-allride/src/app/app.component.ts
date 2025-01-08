import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [GoogleMapsModule, FormsModule, CommonModule],
})
export class AppComponent implements OnInit {
  socket: any;
  markers: { lat: number; lng: number }[] = [];
  githubUsername: string = 'KPaezAstudillo';

  santiagoLat: number = -33.4489;
  santiagoLng: number = -70.6693;
  address: string = '';

  constructor() {
    // Conexión al socket
    this.socket = io('https://stage.allrideapp.com/tech_interview?room=' + this.githubUsername, {
      transports: ['websocket'],
    });
  }

  ngOnInit(): void {

    this.socket.on('newLocation', (location: { lat: number; lng: number }) => {
      this.markers.push(location);

    });
  }

  // enviar coordenadas de la dirección ingresada al socket
  sendLocation(address: string): void {
    console.log('Enviando dirección:', address);
    this.getCoordinatesFromAddress(address).then((coords) => {
      if (coords) {
        this.socket.emit('newLocation', coords);
      }
    });
  }

  // transformar dirección ingresada en coordenadas 
  async getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          if (results && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            resolve({ lat, lng });
          } else {
            console.error('Error: Geocoding falló');
            reject('Geocoding failed');
            resolve(null);
          }
        } else {
          console.error('Error: Geocoding falló:', status);
          reject('Geocoding failed');
          resolve(null);
        }
      });
    });
  }
}
