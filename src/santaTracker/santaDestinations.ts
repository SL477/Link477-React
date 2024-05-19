export interface santaDestinations {
  destinations: santaDestination[];
}

export interface santaPhoto {
  attributionalHtml: string;
  lg: boolean;
  url: string;
}

export interface santaDestination {
  arrival: number;
  city: string;
  departure: number;
  details: {
    photos: santaPhoto[];
    timezone: number;
  };
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  population: number;
  presentsDelivered: number;
  region: string;
}
