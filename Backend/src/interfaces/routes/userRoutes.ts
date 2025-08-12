import express from 'express';
import { Request} from 'express';
import { AuthController } from '../controller/authController';
import { ReportController } from '../controller/reportController';
import { UserRepository } from '../../infrastructure/database/repositories/UserRepository';
import { BlogRepository } from '../../infrastructure/database/repositories/ReportRepository';
import { CreateUser } from '../../application/usecase/createUser';
import { LoginUser } from '../../application/usecase/loginUser';
import { CreateReportUseCase } from '../../application/usecase/CreateReportUseCase';
import { GetAllBlogsUseCase } from '../../application/usecase/GetAllReportsUseCase';
import { GetBlogsByUserIdUseCase } from '../../application/usecase/GetReportsByUserIdUseCase';
import { GetBlogByIdUseCase } from '../../application/usecase/GetReportByIdUseCase';
import { DeleteBlogUseCase } from '../../application/usecase/DeleteReportUseCase';
import { UpdateBlogUseCase } from '../../application/usecase/UpdateReportUseCase';
import {ChangePasswordUseCase} from '../../application/usecase/ChangePassword';
import{UpdateUserUseCase} from '../../application/usecase/UpdateUserUseCase';
import {GetUser} from '../../application/usecase/GetUser';
import {verifyToken} from '../Middleware/verifytoken'

interface IRequest extends Request {
  userId: string;
}
// Repositories
const userRepository = new UserRepository();
const reportRepository = new BlogRepository();

// Auth UseCases & Controller
const createUser = new CreateUser(userRepository);
const loginUser = new LoginUser(userRepository);
const changePasswordUseCase=new ChangePasswordUseCase(userRepository)
const updateUserUseCase=new UpdateUserUseCase(userRepository)
const getUser=new GetUser(userRepository)
const auth = new AuthController(createUser, loginUser,changePasswordUseCase,updateUserUseCase,getUser);

// Report UseCases & Controller
const createReport = new CreateReportUseCase(reportRepository);
const getAllReports = new GetAllBlogsUseCase(reportRepository);
const getReportsByUserId = new GetBlogsByUserIdUseCase(reportRepository);
const getReportById = new GetBlogByIdUseCase(reportRepository);
const deleteReport = new DeleteBlogUseCase(reportRepository);
const updateReport = new UpdateBlogUseCase(reportRepository);

const report = new ReportController(
  createReport,
  getAllReports,
  getReportsByUserId,
  getReportById,
  deleteReport,
  updateReport
);

// Router setup
const router = express.Router();

// Auth routes
router.post('/register', (req, res) => auth.register(req, res));
router.post('/login', (req, res) => auth.login(req, res));
router.get('/',verifyToken, (req, res) => auth.getDetails(req as IRequest, res))
router.put('/',verifyToken, (req, res) => auth.updateUserProfile(req as IRequest, res));
router.post('/',verifyToken, (req, res) => auth.changeUserPassword(req as IRequest, res));

// Report routes
router.post('/reports',verifyToken,(req, res) => report.create(req as IRequest, res));
router.get('/reports',verifyToken,(req, res) => report.getAll(req as IRequest, res));
router.get('/reports/user',verifyToken,(req, res) => report.getByUserId(req as IRequest, res));
router.get('/reports/:id',verifyToken,(req, res) => report.getById(req as IRequest, res));
router.delete('/reports/:id',verifyToken,(req, res) => report.delete(req as IRequest, res));
router.put('/reports/:id',verifyToken,(req, res) => report.update(req as IRequest, res));

// Export
export { router as userRouter };
