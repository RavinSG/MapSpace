import {Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatButtonToggleChange, MatSnackBar} from '@angular/material';
import {MapDataService} from '../services/map-data.service';
import {MatSelectChange} from '@angular/material/typings/esm5/select';
import {and} from '@angular/router/src/utils/collection';
import {not} from 'rxjs/internal-compatibility';


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
  public area = 0;
  public area_p = 0;
  public unitType = 'sq.kms';

  details = {
    lng: 0,
    lat: 0,
    city: '',
  };

  center: any = {
    lat: 6.796867,
    lng: 79.900196,
    zoom: 16,
    city: 'colombo',
    value: 0
  };


  constructor(private route: ActivatedRoute,
              private differs: KeyValueDiffers,
              private snackBar: MatSnackBar,
              private mapData: MapDataService) {

  }

  ngOnInit() {
    this.mapData.reset();
    this.pathDiffer = this.differs.find(this.coordinates).create();
    console.log('params', this.route.snapshot.params);
    if (this.route.snapshot.params['lng']) {
      this.route.params.pipe(
        switchMap((params: Params) => this.details['lng'] = params['lng'])
      ).subscribe();
      this.route.params.pipe(
        switchMap((params: Params) => this.details['lat'] = params['lat'])
      ).subscribe();
      this.route.params.pipe(
        switchMap((params: Params) => this.details['city'] = params['city'])
      ).subscribe();
      this.center.lat = Number(this.details.lat);
      this.center.lng = Number(this.details.lng);
      this.center.city = this.details.city;
      this.getLandValue(this.center.city);
      console.log(this.center);
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
    this.mapData.sendCords(coordinates, sphere, this.unitType).subscribe(data => {
        this.area = data.area;
        this.area_p = data.area_p;
        console.log('data', data);
        console.log(this.area_p, this.center.value);
        if (data.area_p > 5000 && !this.enableGeo) {
          this.snackBar.open('For more accurate results enable Sphere Geometry', 'OK', {
            duration: 4000
          });
        }
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

  convertUnits(event: MatSelectChange) {
    console.log(event);
    const new_unit = event.value;
    this.mapData.convertUnits(this.unitType, new_unit, this.area)
      .subscribe(data => {
        this.area = data;
        this.unitType = new_unit;
      });
  }

  saveArea() {
    console.log(this.area, this.coordinates, this.center, this.unitType);
    this.mapData.saveArea(this.area, this.coordinates, this.center, this.unitType)
      .subscribe(data => console.log(data));
  }

  getLandValue(city: string) {
    this.mapData.landValue(city)
      .subscribe(data => this.center.value = data);
  }

}
