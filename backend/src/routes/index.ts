import { Router } from 'express';

const router = Router();

// Exemplo de rota GET
router.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
});

// Exemplo de rota para entregadores
router.get('/entregadores', (req, res) => {
  // Aqui você pode chamar um service, acessar o banco, etc.
  res.json({ message: 'Lista de entregadores' });
});

export default router;