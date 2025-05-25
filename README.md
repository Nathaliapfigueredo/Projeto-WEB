# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width="50%"></a>
</p>


# OrientaJovem


*Desenvolvedora: Nathália Pires de Figueredo*


## 📝 Descrição

Plataforma que conecta mentores na ciência — jovens cientístas,especialistas ou profissionais — a jovens que desejam transformar suas ideias em pesquisas e artigos. Através de funcionalidades como criação de perfis, categorização por áreas temáticas e agendamento de sessões, o sistema viabiliza um programa estruturado de orientação científica, acessível, organizado e colaborativo. Mais do que uma ferramenta, trata-se de um passo essencial para tornar a ciência um espaço de pertencimento e realização para todos.

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a elementos não-estruturados deste repositório, como imagens.

- <b>document</b>: aqui estão todos os documentos do projeto, como o Web Application  Document (WAD) bem como documentos complementares, na pasta "other".

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto de aplicação web.

- <b>README.md</b>: arquivo que serve como guia introdutório e explicação geral sobre o projeto e a aplicação (o mesmo arquivo que você está lendo agora).

## 💻 Configuração para desenvolvimento e execução do código

### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- Node.js (versão 14 ou superior)
- PostgreSQL
- Um gerenciador de pacotes: npm (já vem com o Node.js)

### Instalação
- Clone o repositório:
`git clone https://github.com/seu-usuario/Projeto-WEB.git`
`cd Projeto-WEB`
- Instale as dependências:
`npm install`
- Configure o banco de dados:
Crie um banco de dados PostgreSQL e uma tabela para cada entidade.

- Crie o arquivo de configuração do banco:
No diretório config/, crie o arquivo db.js com a conexão com o PostgreSQL. 

```js
// config/db.js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});
module.exports = pool;
```

- Executando a aplicação
`npm start`




## 🗃 Histórico de versões

* 0.3.0 - 09/05/2025
    * Desenvolvimento do modelo físico
    * Implementação do modelo físico e migrações
    *  Atualização do WAD: introdução e seção 2
* 0.2.0 - 08/05/2025
    * Estruturação do modelo lógico
* 0.1.0 - 9/05/2025
    * Estruturação das pastas
