export type TripProps = {
  startLocation: string;
  endLocation: string;
  miles: number;
  date: string;
  weather?: {
    temp: number;
    description: string;
  };
  userId?: string;
  _id?: string;
};
