const express = require('express');
const pool = require('./config/db'); 
const cors = require('cors');

console.log('Iniciando servidor...');

const accountsRoutes = require('./Routes/accountsRoute.js');
const alunoRoutes = require('./Routes/alunoRoute.js');
const orientadorRoutes = require('./Routes/orientadorRoute.js');
const sessaoRoutes = require('./Routes/sessaoRoute.js');
const sessaoController = require('./controllers/sessaoController');
const orientadorController = require('./controllers/orientadorController');




const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

const session = require('express-session');

app.use(session({
  secret: 'segredo-super-seguro',     
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }          
}));


app.use('/api/accounts', accountsRoutes);  
app.use('/api/aluno', alunoRoutes);        
app.use('/api/orientador', orientadorRoutes);
app.use('/api/sessao', sessaoRoutes);

app.get('/listaSessoes', sessaoController.listarSessoes);
app.get('/dashboard', orientadorController.mostrarDashboard);

// Rota de teste para verificar se o servidor está funcionando
//app.get('/listaSessoes', (req, res) => {
//  res.send('Rota /listaSessoes funcionando!');
//});


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




