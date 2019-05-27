export interface LandDetail {
  Land_Area: string;
  ID: number;
  Price: number;
  City: string;
  description: string;
  src: string;
}

export interface SavedLand {
  id: number;
  city: string;
  area: number;
  estimated: number;
}
