export default class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
  ) {
    super(`${status} | Failed fetching data from ${url}`);

    this.name = "HttpError";
  }
}
