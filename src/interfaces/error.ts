export interface ApiError {
  error?: string;
  data?: {
    message?: string;
  };
  status?: number;
}
