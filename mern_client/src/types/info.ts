export type Position = {
  lat: number;
  lng: number;
};

export type Info = {
  id: number;
  addressName: string;
  placeName: string;
  position: Position;
};
