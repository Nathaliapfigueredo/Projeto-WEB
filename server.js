// server.js
const express = require('express');
const pool = require('./config/db'); 
const cors = require('cors');
const routes = require('./Routes/accountsRoute.js');



const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usando as rotas definidas
app.use('/api', routes);


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



