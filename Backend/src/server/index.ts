
import { App } from './app';
import { connectDB } from '../config/db';

const startServer = async () => {
  await connectDB(); 

  const appInstance = new App();

  appInstance.app.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000');
  });
};

startServer();
