export declare global {
  export type ApiResponse<T = any> = {
    ok: boolean;
    statusCode: number;
    message?: string;
    data?: T;
  };

  export type ErrorResponse = {
    message: string;
    error?: string;
    statusCode?: number;
  };
}
