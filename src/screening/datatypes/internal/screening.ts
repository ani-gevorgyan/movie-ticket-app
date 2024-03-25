export type UpdateScreeningData = {
  movieId: string;
  roomId: string;
  price: number;
  start: Date;
};

export type ScreeningFilter = {
  today: boolean;
};

export type CurrentDayAndNextDay = {
  currentDay: Date;
  nextDay: Date;
};

export type CreateScreeningData = {
  start: Date;
  movieId: string;
  roomId: string;
  price: number;
};

export type ScreeningData = {
  start: Date;
  end: Date;
  movieId: string;
  roomId: string;
  price: number;
};
