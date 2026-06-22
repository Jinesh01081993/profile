import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4002;

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Profile Service</title>
    <style>body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:2rem 3rem;text-align:center}.badge{display:inline-block;background:#22c55e22;color:#4ade80;border:1px solid #4ade8044;border-radius:20px;padding:4px 16px;font-size:.85rem;margin:.5rem 0 1.5rem}a{color:#818cf8}</style>
    </head>
    <body><div class="card">
      <h1>👤 Profile Service</h1>
      <div class="badge">● UP</div>
      <p>Port <strong>${PORT}</strong></p>
      <p><a href="/health">/health</a> — Health check (JSON)</p>
    </div></body></html>
  `);
});

app.get('/health', (_req, res) => {
  res.json({ service: 'profile-service', status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/profile/me', (_req, res) => {
  res.json({ id: 'demo-user', name: 'Demo User', role: 'USER' });
});

app.listen(PORT, () => {
  console.log(`Profile service running on port ${PORT}`);
});
