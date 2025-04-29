interface PaginationOptions {
  page?: number | string;
  limit?: number | string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

const calculatePagination = (options: PaginationOptions): PaginationResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 100;
  const skip = (page - 1) * limit;

  const sort_by = options.sort_by || 'created_at';
  const sort_order = options.sort_order || 'desc';

  return {
    page,
    limit,
    skip,
    sort_by,
    sort_order,
  };
};

export { calculatePagination, PaginationOptions, PaginationResult };
