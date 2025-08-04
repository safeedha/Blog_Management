import { Request, Response } from 'express';
import { ICreateReportUseCase } from '../../application/usecaseInterface/ICreateReportUseCase';
import { IGetAllReportsUseCase } from '../../application/usecaseInterface/IGetAllReportsUseCase';
import { IGetReportsByUserIdUseCase } from '../../application/usecaseInterface/IGetReportsByUserIdUseCase';
import { IGetReportByIdUseCase } from '../../application/usecaseInterface/IGetReportByIdUseCase';
import { IDeleteReportUseCase } from '../../application/usecaseInterface/IDeleteReportUseCase';
import { IUpdateReportUseCase } from '../../application/usecaseInterface/IUpdateReportUseCase';

interface IRequest extends Request {
  userId: string;
}

export class ReportController {
  constructor(
    private createReport: ICreateReportUseCase,
    private getAllReports: IGetAllReportsUseCase,
    private getReportsByUserId: IGetReportsByUserIdUseCase,
    private getReportById: IGetReportByIdUseCase,
    private deleteReport: IDeleteReportUseCase,
    private updateReport: IUpdateReportUseCase
  ) {}

  async create(req: IRequest, res: Response): Promise<void> {
    try {
      const reportData = req.body;
      const userId = req.userId;


      const dataWithUser = { ...reportData, userId };

      const result=await this.createReport.execute(dataWithUser);

      res.status(201).json({
        message: result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }

  async getAll(req: IRequest, res: Response): Promise<void> {
    try {
      const reports = await this.getAllReports.execute();

      res.status(200).json({
        data: reports,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }

  async getByUserId(req: IRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const reports = await this.getReportsByUserId.execute(userId);

      res.status(200).json({
        data: reports,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }

  async getById(req: IRequest, res: Response): Promise<void> {
    try {
      const reportId = req.params.id;
      const report = await this.getReportById.execute(reportId);

      res.status(200).json({
        data: report,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }

  async delete(req: IRequest, res: Response): Promise<void> {
    try {
      const reportId = req.params.id;

      const result=await this.deleteReport.execute(reportId);

      res.status(200).json({
        message: result
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }

  async update(req: IRequest, res: Response): Promise<void> {
    try {
      const reportId = req.params.id;
      const updateData = req.body;

      await this.updateReport.execute(reportId, updateData);

      res.status(200).json({
        success: true,
        message: 'Report updated successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ success: false, message });
    }
  }
}
