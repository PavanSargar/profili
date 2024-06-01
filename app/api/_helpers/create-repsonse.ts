interface Meta {
  [key: string]: any;
}

interface Pagination {
  total: number;
  page: number;
  perPage: number;
}

interface SuccessResponse<T> {
  status: "success";
  data: T;
  meta?: Meta;
}

interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
  meta?: Meta;
}

interface PaginationResponse<T> {
  status: "success";
  data: T[];
  pagination: Pagination;
  meta?: Meta;
}

const createResponse = {
  success<T>(data: T, meta?: Meta): SuccessResponse<T> {
    return {
      status: "success",
      data,
      ...(meta && { meta }),
    };
  },

  error(message: string, code: number, meta?: Meta): ErrorResponse {
    return {
      status: "error",
      message,
      code,
      ...(meta && { meta }),
    };
  },

  pagination<T>(
    data: T[],
    total: number,
    page: number,
    perPage: number,
    meta?: Meta
  ): PaginationResponse<T> {
    return {
      status: "success",
      data,
      pagination: {
        total,
        page,
        perPage,
      },
      ...(meta && { meta }),
    };
  },
};

export default createResponse;
