export type CreateMovieRequestData = {
  title: string;
  // Duration of a movie in minutes.
  duration: number;
};

export type UpdateMovieRequest = {
  title: string;
  duration: number;
};
