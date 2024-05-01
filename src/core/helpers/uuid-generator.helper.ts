import { v5 as uuidv5 } from 'uuid';

type CinamIdData = {
  cityId: string;
  movieId: string;
};

type MovieIdData = {
  originalId: string;
};

type MovieSessionIdData = {
  movieId: string;
  cinemaId: string;
  cityId: string;
  date: string;
};

type CityIdData = {
  name: string;
  url: string;
};

export class UUIDGenerator {
  public static generateCinemaId(data: CinamIdData, namespace: string): string {
    return uuidv5(
      JSON.stringify({
        id: data.movieId,
        cityId: data.cityId,
      }),
      namespace,
    );
  }

  public static generateMovieId(data: MovieIdData, namespace: string): string {
    return uuidv5(JSON.stringify(data.originalId), namespace);
  }

  public static generateMovieSessionId(
    data: MovieSessionIdData,
    namespace: string,
  ): string {
    return uuidv5(JSON.stringify(data), namespace);
  }

  public static generateCityId(data: CityIdData, namespace: string): string {
    return uuidv5(JSON.stringify(data), namespace);
  }
}
