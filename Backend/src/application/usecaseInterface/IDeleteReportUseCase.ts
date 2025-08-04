export interface IDeleteReportUseCase {
  execute(reportId: string): Promise<string>;
}