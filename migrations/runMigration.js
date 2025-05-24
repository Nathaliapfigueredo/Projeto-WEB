const fs = require('fs');
const path = require('path');
const db = require('../config/db.js');

// Ordena os arquivos por nome (timestamp)
const migrationsDir = path.join(__dirname); // ou o diretório correto onde estão os arquivos SQL
const files = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('202505221425_init.sql'))
  .sort();

(async () => {
  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo SQL do arquivo
      console.log(`🔄 Executando: ${file}`);
      await db.query(sql); // Executa o SQL no banco
    }
    console.log('✅ Todas as migrações foram aplicadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar migração:', error.message);
    process.exit(1);
  }
})();
