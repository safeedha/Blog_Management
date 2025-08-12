export interface IDeleteBlogUseCase {
  execute(reportId: string): Promise<string>;
}