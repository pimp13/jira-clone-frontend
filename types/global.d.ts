export declare global {
  export type ApiResponse<T = any> = {
    ok: boolean;
    message?: string;
    data: T;
  };

  export type ErrorResponse = {
    message: string;
    error?: string;
    statusCode?: number;
  };
}
