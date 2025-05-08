export type NewTrip = {
  startLocation: string;
  endLocation: string;
  miles: number;
  date: string;
  weather?: {
    temp: number;
    description: string;
  };
  userId?: string;
};

export type SavedTrip = NewTrip & {
  _id: string;
};
