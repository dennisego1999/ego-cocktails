export default interface IHttpClient {
  get<T>(path: string): Promise<T>;
}
