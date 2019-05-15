import {Component, EventEmitter, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatButtonToggleChange} from '@angular/material/typings/esm5/button-toggle';

declare const google: any;

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent {

  mapType = 'hybrid';

  details = {
    'lng': 0,
    'lat': 0
  };

  center: any = {
    lat: 6.796867,
    lng: 79.900196,
    zoom: 16
  };

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['lng']) {
      const result1 = this.route.params.pipe(
        switchMap((params: Params) => this.details['lng'] = params['lng'])
      ).subscribe();
      const result2 = this.route.params.pipe(
        switchMap((params: Params) => this.details['lat'] = params['lat'])
      ).subscribe();
      this.center.lat = Number(this.details.lat);
      this.center.lng = Number(this.details.lng);
      console.log(typeof (Number(this.details.lat)));
    }
  }

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
      function createPath(pathShape) {
        const coordinates = [];
        const len = pathShape.getPath().getLength();
        const path = pathShape.getPath();
        for (let i = 0; i < len; i++) {
          const vertex = path.getAt(i);
          coordinates.push(vertex.lat(), vertex.lng());
        }
        return coordinates;
      }

      if (shape.type === 'polygon') {
        const newShape = shape.overlay;
        newShape.type = shape.type;
        console.log(newShape);
        let coordinates = createPath(newShape);
        console.log(coordinates);

        google.maps.event.addListener(newShape.getPath(), 'dragend', function () {
          console.log('testing');
        });
        newShape.getPaths().forEach(function (path, index) {

          google.maps.event.addListener(path, 'set_at', function () {
            coordinates = createPath(newShape);
            console.log(coordinates);
          });
          google.maps.event.addListener(path, 'insert_at', function () {
            coordinates = createPath(newShape);
            console.log(coordinates);
          });

        });
      }
    });
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', function (e) {
      console.log('drawing mode changed:' + drawingManager.getDrawingMode());
    });
  }

  mapChange(event: MatButtonToggleChange) {
    this.mapType = event.value;
    console.log(event.value);
  }


}
