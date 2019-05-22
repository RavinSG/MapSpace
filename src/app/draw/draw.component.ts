import {Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatButtonToggleChange, MatSnackBar} from '@angular/material';
import {MapDataService} from '../services/map-data.service';


declare const google: any;

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit, DoCheck {

  public coordinates = {val: null};

  mapType = 'hybrid';
  private pathDiffer: KeyValueDiffer<string, any>;
  private enableGeo = false;
  private area = 0;

  details = {
    'lng': 0,
    'lat': 0
  };

  center: any = {
    lat: 6.796867,
    lng: 79.900196,
    zoom: 16
  };


  constructor(private route: ActivatedRoute,
              private differs: KeyValueDiffers,
              private snackBar: MatSnackBar,
              private mapData: MapDataService) {

  }

  ngOnInit() {
    this.pathDiffer = this.differs.find(this.coordinates).create();
    console.log('params', this.route.snapshot.params);
    if (this.route.snapshot.params['lng']) {
      this.route.params.pipe(
        switchMap((params: Params) => this.details['lng'] = params['lng'])
      ).subscribe();
      this.route.params.pipe(
        switchMap((params: Params) => this.details['lat'] = params['lat'])
      ).subscribe();
      this.center.lat = Number(this.details.lat);
      this.center.lng = Number(this.details.lng);

    }
  }

  ngDoCheck(): void {
    const changes = this.pathDiffer.diff(this.coordinates);
    if (changes) {
      console.log(this.coordinates);
      console.log(this.enableGeo);
      this.sendCords(this.coordinates, this.enableGeo);
    }
  }

  geoChange(event) {
    this.enableGeo = event.checked;
    console.log(this.enableGeo);
    if (this.enableGeo) {
      this.snackBar.open('Sphere geometry is enabled', 'OK', {
        duration: 1000
      });
    } else {
      this.snackBar.open('Sphere geometry is disabled', 'OK', {
        duration: 1000
      });
    }

    this.sendCords(this.coordinates, this.enableGeo);
  }

  sendCords(coordinates, sphere) {
    this.mapData.sendCords(coordinates, sphere).subscribe(data => {
        this.area = data;
      }
    );
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

    function eventHandler(shape, coords) {

      function createPath(pathShape) {
        const pCoordinates = [];
        const len = pathShape.getPath().getLength();
        const path = pathShape.getPath();
        for (let i = 0; i < len; i++) {
          const vertex = path.getAt(i);
          pCoordinates.push(vertex.lat(), vertex.lng());
        }
        return pCoordinates;
      }


      if (shape.type === 'polygon') {
        const newShape = shape.overlay;
        newShape.type = shape.type;
        // console.log(newShape);
        coords.val = createPath(newShape);
        // console.log(coords);
        google.maps.event.addListener(newShape, 'dragend', function () {
          coords.val = createPath(newShape);
        });
        newShape.getPaths().forEach(function (path, index) {
          google.maps.event.addListener(path, 'set_at', function () {
            coords.val = createPath(newShape);
          });

          google.maps.event.addListener(path, 'insert_at', function () {
            coords.val = createPath(newShape);
          });

          google.maps.event.addListener(path, 'remove_at', function () {
            coords.val = createPath(newShape);
          });

        });
      }
      console.log(event, 'here', coords);
    }

    google.maps.event.addListener(drawingManager, 'overlaycomplete',
      (event) => eventHandler(event, this.coordinates));

    google.maps.event.addListener(drawingManager, 'drawingmode_changed', function (e) {
      console.log('drawing mode changed:' + drawingManager.getDrawingMode());
    });
  }

  mapChange(event: MatButtonToggleChange) {
    this.mapType = event.value;
    console.log(event.value);
    console.log(this.coordinates);
  }


}
