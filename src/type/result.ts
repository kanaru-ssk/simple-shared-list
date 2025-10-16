export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      status: number;
      errorMessage: string;
    };
