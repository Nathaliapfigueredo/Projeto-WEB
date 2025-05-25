const express = require('express');
const pool = require('./config/db'); 
const cors = require('cors');

// Importar os arquivos de rota
const accountsRoutes = require('./Routes/accountsRoute.js');
const alunoRoutes = require('./Routes/alunoRoute.js');
const orientadorRoutes = require('./Routes/orientadorRoute.js');
const sessaoRoutes = require('./Routes/sessaoRoute.js');


const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar as rotas com prefixos diferentes
app.use('/api/accounts', accountsRoutes);  
app.use('/api/aluno', alunoRoutes);        
app.use('/api/orientador', orientadorRoutes);
app.use('/api/sessao', sessaoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hora atual no banco: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar com o banco.');
  }
});