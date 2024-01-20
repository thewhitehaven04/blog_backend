export interface IPaginationDto {
  totalCount: number
  count: number
  offset: number
}

export interface IPaginatedData<T> {
  data: T[]
  pagination: IPaginationDto
}