export type APIResponse<T> = {
  status: string;
  data: T;
  message: string;
};
