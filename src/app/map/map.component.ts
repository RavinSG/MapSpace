import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MapsAPILoader, MouseEvent, PolyMouseEvent} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {MapDataService} from '../services/map-data.service';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  geocoder: any;
  circleRadius = 5000;
  circleVisible = false;
  linePoints = [];
  public location: Location = {
    lat: 7.021521,
    lng: 79.899476,
    marker: {
      lat: 7.021521,
      lng: 79.899476,
      draggable: true
    },
    zoom: 20
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private mapData: MapDataService) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.location.marker.draggable = true;
  }

  updateOnMap() {
    let full_address: string = this.location.address_level_1 || '';
    if (this.location.address_level_2) {
      full_address = full_address + ' ' + this.location.address_level_2;
    }
    if (this.location.address_state) {
      full_address = full_address + ' ' + this.location.address_state;
    }
    if (this.location.address_country) {
      full_address = full_address + ' ' + this.location.address_country;
    }

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status === google.maps.GeocoderStatus.OK) {
        for (let i = 0; i < results[0].address_components.length; i++) {
          const types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.location.address_country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.location.address_zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.location.address_state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert('Sorry, this search produced no results.');
      }
    });
  }

  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  lineDragged($event: MouseEvent) {
    console.log($event);
  }


  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    });
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length === 0) {
      return false;
    }
    const address = addressArray[0].address_components;

    for (const element of address) {
      if (element.length === 0 && !element['types']) {
        continue;
      }

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
      }
    }
  }

  milesToRadius(value) {
    this.circleRadius = value / 0.00062137;
  }

  circleRadiusInMiles() {
    return this.circleRadius * 0.00062137;
  }

  hideCircle() {
    this.circleVisible = false;
  }

  showCircle() {
    this.circleVisible = true;
  }

  logEvent($event: MouseEvent) {
    console.log($event);
    this.linePoints.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  hideLine($event: PolyMouseEvent) {
    console.log($event.edge);
    console.log($event.vertex);
    console.log($event.path);

  }

  dbLine($event: PolyMouseEvent) {
    console.log($event.edge);

  }

  addCords() {
    this.linePoints.push({lat: 7.021521, lng: 79.899476});
  }

  sendCords() {
    this.mapData.sendCords(this.linePoints).subscribe(data => {
        console.log(data);
      }
    );
  }
}
