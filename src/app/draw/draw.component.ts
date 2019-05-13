import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

declare const google: any;

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent {

  details = {
    'lng': 0,
    'lat': 0
  };

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    const result1 = this.route.params.pipe(
      switchMap((params: Params) => this.details['lng'] = params['lng'])
    ).subscribe();
    const result2 = this.route.params.pipe(
      switchMap((params: Params) => this.details['lat'] = params['lat'])
    ).subscribe();

    if (this.details.lat !== 0) {
      this.center.lat = Number(this.details.lat);
      this.center.lng = Number(this.details.lng);
      console.log(typeof (Number(this.details.lat)));
    }
  }

  center: any = {
    lat: 33.5362475,
    lng: -111.9267386,
    zoom: 16
  };

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle'],
        position: google.maps.ControlPosition.TOP_CENTER
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (shape) {
      if (shape.type === 'polygon') {
        console.log(shape);
        const coordinates = [];
        const len = shape.overlay.getPath().getLength();
        const path = shape.overlay.getPath();
        for (let i = 0; i < len; i++) {
          const vertex = path.getAt(i);
          console.log('lat', vertex.lat());
          console.log('lng', vertex.lng());
          coordinates.push(vertex.lat(), vertex.lng());
        }
        console.log(coordinates);
        google.maps.event.addListener(shape, 'remove_at', function (event) {
          console.log(event);
        });
      }
    });
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', function (e) {
      console.log('drawing mode changed:' + drawingManager.getDrawingMode());
    });
  }


}
