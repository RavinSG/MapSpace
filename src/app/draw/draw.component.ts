import {Component} from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent {

  center: any = {
    lat: 33.5362475,
    lng: -111.9267386,
    zoom: 20
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
