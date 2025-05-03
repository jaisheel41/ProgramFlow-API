import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import programRoutes from './routes/programRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/programs', programRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
