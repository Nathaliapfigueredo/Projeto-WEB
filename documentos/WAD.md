# Web Application Document - Projeto Individual - Módulo 2 - Inteli


## OrientaJovem

#### Nathália Pires de Figueredo


## Vídeo de demonstração 

Demonstração e explicação do frontend e backend: https://www.youtube.com/watch?v=31FblITdxrk


## Sumário

1. [Introdução](#c1)  
2. [Projeto Técnico da Aplicação Web](#c3)  
3. [Desenvolvimento da Aplicação Web](#c4)  
4. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução 

O sistema de orientação nasce como uma resposta concreta a um dos maiores desafios enfrentados pela PSEducation, organização sem fins lucrativos que fundei com o propósito de democratizar o acesso à ciência e à tecnologia para jovens brasileiros, especialmente aqueles de regiões sem acesso a oportunidades ou com pouca representatividade nos espaços acadêmicos.<br>

O sistema de mentorias surge como resposta ao desafio central da organização: garantir que estudantes da organização tenham acesso a orientação qualificada para desenvolverem suas próprias pesquisas. Para isso, criamos uma plataforma que conecta orientadores — jovens cientistas, especialistas ou profissionais com experiência em pesquisa — a estudantes que desejam transformar ideias em artigos. Com recursos como criação de perfis, classificação por tópicos de interesse e agendamento de sessões, o sistema oferece um programa estruturado de orientação científica, acessível, organizado e colaborativo. Mais do que uma ferramenta, representa um passo essencial para tornar a ciência um espaço de pertencimento e realização para todos.

## <a name="c2"></a>2. Projeto da Aplicação Web

### 2.1. Modelagem do banco de dados 

Ao projetar um banco de dados eficiente e funcional, é essencial compreender os modelos lógico e físico de banco de dados. O modelo lógico descreve como os dados são organizados e relacionados entre si, utilizando estruturas como tabelas, chaves e relacionamentos. Já o modelo físico representa como esses dados são efetivamente salvos no sistema de armazenamento, considerando aspectos como desempenho, índices e alocação de espaço. Nesta sessão, vamos explor o processo para a criação desses modelos.

#### Entidades relacionadas: 
- Accounts;
- Aluno;
- Orientador;
- Sessão 

#### Funcionalidades do Sistema:

_Cadastro e Login:_ Usuário pode se registrar como mentor ou mentorado (email e senha)

_Perfil do Usuário:_
- Orientadores: área de expertise, disponibilidade, biografia, link do lattes
- Alunos: objetivos, áreas de interesse, breve apresentação

_Agendamento de Sessões:_
- Mentorado escolhe um mentor e agenda datas/horários
- Mentor pode aceitar ou recusar
- Sessões agendadas ficam listadas no painel

#### Relações entre as entidades:
- Um account pode ser cadastrado como aluno(1:1);
- Um account pode ser cadastrado como orientador(1:1);
- Város alunos podem agendar várias sessões (N:N);
    - Um aluno pode agendar várias sessões (1:N);
    - Um orientador aceitar ter várias sessões (1:N).



#### Modelo Lógico:
Dessa forma, estruturamos uma tabela  accounts com atributos essenciais de cadastros, incluindo um atributo direcionada a escolha do tipo de usuário: orientador ou aluno. A partir desse campo, o sistema se conecta com duas tabelas específicas, de orientador e aluno, cada uma com seus atributos. Essas se relacionam pela tabela de associação "Sessão", que representa a interação entre orientador e aluno. Ilustrado na imagem abaixo:

<p align="center">
<a href= ""><img src="../assets/modelo_logico.png" alt="Modelo Lógico"></a>
</p>


#### Modelo Físico:
Para o modelo físico foi traduzida a linguagem desenvolvida no Mermaid para o modelo lógico para SQL, o qual adicionamos no arquivo SQL da pasta migrations.
[Aqui está o código SQL que cria a estrutura de um banco de dados.](migrations/202505091120_init.sql)




### 2.2. Models
Nesta seção, são descritos os models (esquemas de validação) utilizados no sistema web, desenvolvidos com a biblioteca Joi para garantir a integridade e consistência dos dados recebidos pela aplicação.Cada model representa uma entidade do sistema, como usuários, alunos, orientadores e sessões,  e define as regras de validação para os  dados, como tipos, obrigatoriedade e formatos esperados.

#### Accounts
Esse modelo representa os dados básicos de um usuário do sistema, independentemente de ele ser um aluno ou orientador. 

_Campos:_ (todos obrigatórios)
- nome (string): Nome do usuário com no mínimo 3 e máximo de 50 caracteres. 
- email (string): E-mail válido do usuário. 
- senha (string) :   Senha de no mínimo 6 caracteres. 
- user_type (string): Tipo de usuário, se é um orintador ou aluno. 

#### Aluno
Model que representa um perfil de aluno, vinculado a uma conta base (id_account).

_Campos:_ (todos obrigatórios)
- objetivo(string): objetivo do aluno com a plataforma.
- interesses(string): interesses acadêmicos ou científicos.
- bio(string): biografia do aluno
- lattes_link(string): link para o currículo lattes . Deve ser uma URL válida.
- id_account(string): identificador da conta associada.

Representao perfil completo de um estudante buscando orientação.

#### Orientador
Model que representa um perfil de orientador disponível para sesões.

_Campos:_ 
- expertise (string): objetivo do aluno com a plataforma. Obrigatório!
- disponibilidade_data(string): interesses acadêmicos ou científicos. Obrigatório!
- disponibilidade_time (string): biografia do aluno. Obrigatório!
- bio (string): biografia do orientador. Opcional!
- retorno_agendamento(boolean): se a orientador retirnará ou não sobre agendamento. Obrigatório!
- lattes_link(string): link para o currículo lattes . Deve ser uma URL válida. Opcional!
- id_account(string): identificador da conta associada. Obrigatório!

Representao perfil completo de um orientador oferecendo orientação.

#### Sessão
Model que representa uma sessão de orientação entre aluno e um orientador.

_Campos:_ 
- agendamento_data(string): Data da Sessão. Obrigatório!
- agendamento_hora(string): Hora da Sessão. Obrigatório!
- Status (string): Status da sessão, se está agendada, cancelada ou realizada. Obrigatório!
- external_link(string): Link para a sessaõ com uma URL. Opcional!
- topico(string): Tópico a ser tratado na sessão. Obrigatório!
- id_orientador (string UUID): ID do orientador. Obrigatório!
- id_aluno (string UUID): ID do aluno.Obrigatório!

Essa registra e controla os encontros entre alunos e orientadores.

## <a name="c2"></a>3. Desenvolvimento da Aplicação Web

## 3.1 WebAPI e endpoints 
Esta seção expõe quatro conjuntos de endpoints REST em /api/accounts, /api/aluno, /api/orientador e /api/sessao. Todos aceitam e devolvem JSON. As APIs foram projetadas para permitir a integração e o uso eficiente do sistema por meio de requisições padronizadas, facilitando operações como criação de contas, cadastro de alunos e orientadores, agendamento de sessões e consulta de dados.

Todas as requisições são validadas utilizando os models definidos com Joi, garantindo a segurança e consistência das informações trocadas.

1. Account
- GET /api/accounts – lista todos os cadastros .
- POST /api/accounts – cria um cadastro.
- Exemplo de corpo: {"name":"Ana","email":"ana@exemplo.com"}
- GET /api/accounts/:id – lista um cadastro específico.
- PUT /api/accounts/:id – atualiza um cadastro específico.
- DELETE /api/accounts/:id – remove um cadastro específico.
- POST /api/login – acessa um novo login.
2. Aluno
- GET /api/aluno – lista todos os alunos.
- POST /api/aluno – cria perfil de aluno.
- Exemplo: {"user_id":1,"product":"Livro","price":49.90}
- GET /api/aluno/:id – lista um aluno específico.
- PUT /api/aluno/:id – atualiza perfil de um aluno.
- DELETE /api/aluno/:id – remove um aluno.
3. Orientador
- GET /api/orientador – lista todos os orientadores.
- POST /api/orientador – cria perfil de orientador.
- Exemplo: {"user_id":1,"product":"Livro","price":49.90}
- GET /api/orientador/:id – lista um orientador específico.
- PUT /api/orientador/:id – atualiza perfil de um orientador.
- DELETE /api/orientador/:id – remove um orientador.
4. Sessão
- GET /api/sessao – lista todas as sessões.
- POST /api/sessao – cria uma sessão.
- Exemplo: {"aluno_id":1,"orientador_id":2,"data":"2023-10-01"}
- GET /api/sessao/:id – lista uma sessão específica.
- PUT /api/sessao/:id – atualiza uma sessão.
- DELETE /api/sessao/:id – remove uma sessão.


Exemplos de uso via curl:

curl -X POST http://localhost:3000/api/accounts \
     -H "Content-Type: application/json" \
     -d '{"name":"Ana","email":"ana@exemplo.com"}'


### 3.2 Interface e Navegação (Semana 07)
Nesta semana, o foco esteve no desenvolvimento do front-end e na sua integração com o back-end. O primeiro passo foi definir as principais funcionalidades do MVP. Decidi priorizar a interface do aluno, contemplando recursos como a escolha do orientador, o agendamento de sessões e uma página dedicada à visualização das sessões já marcadas.

Fluxo de cadastro:
<p align="center">
<a href= ""><img src="../assets/fluxoCadastro.png" alt="Modelo Lógico"></a>
</p>

Fluxo de agendamento:

<p align="center">
<a href= ""><img src="../assets/fluxoAgendamento.png" alt="Modelo Lógico"></a>
</p>

Posteriormente, foi desenvolvido o cadastro do orientador e uma página de direcionamento:
<p align="center">
<a href= ""><img src="../assets/fluxoOrientador.png" alt="Modelo Lógico"></a>
</p>


## <a name="c1"></a>4. Entenda as decisões técnicas
O sistema adota uma arquitetura em camadas (MVC com uma Service e Repository Layer adicional) e utiliza o banco de dados PostgreSQL para a persistência de dados.

O banco de dados utilizado é o PostgreSQL, escolhido pelo seu desempenho. A conexão com o banco é realizada por meio da biblioteca pg, utilizando o recurso de pool de conexões (pg.Pool), o que garante melhor performance em ambientes com múltiplas requisições simultâneas. As configurações de conexão são gerenciadas por meio de variáveis de ambiente, armazenadas no arquivo .env, o que proporciona maior segurança. 
A estrutura de tabelas foi cuidadosamente planejada para atender as necessidades do sistema, com tabelas separadas para contas de usuário (accounts), alunos, orientadores e sessões agendadas.



O projeto segue o padrão arquitetural **MVC (Model-View-Controller)**, com uma camada de servicee repository para reforçar a separação de responsabilidades:
- Controller: Responsável por receber as requisições HTTP, processar os dados de entrada e direcionar as chamadas para os serviços correspondentes.
- Service: Contém a lógica de negócio e as validações adicionais, servindo como intermediário entre o Controller e o Repository.
- Repository: Realiza a interação direta com o banco de dados, executando operações de leitura e escrita.
- Model: Faz a validação dos dados recebidos, utilizando principalmente a biblioteca Joi para garantir que os dados estejam no formato esperado.
- View: Responsável pela renderização das páginas web, utilizando o motor de templates EJS. Foi desenvolvida uma interface utilizando EJS com Bootstrap. Essa interface permite o envio de dados diretamente para a API por meio de um HTML, proporcionando uma experiência de usuário simples e direta.

Essa estrutura facilita a manutenção, a realização de testes unitários e a escalabilidade futura do sistema.


### Tecnologias Utilizadas
As tecnologias foram escolhidas com foco na simplicidade, escalabilidade e segurança básica. Além disso, são ferramentas amplamente utilizadas no mercado, o que facilita a integração de novos desenvolvedores e futuras expansões.


PostgreSQL: Um banco de dados relacional seguro e eficiente na execução de consultas e na gestão de relacionamentos entre tabelas.


Joi: Uma biblioteca de validação de dados para Node.js, que permite definir esquemas de validação claros e reutilizáveis. Por exemplo, antes da criação de uma conta, o backend valida se o nome, email e senha seguem o formato correto, o que reduz significativamente a chance de erros e inconsistências.


EJS (Embedded JavaScript Templates): Utilizado para a renderização de páginas dinâmicas no servidor (Server Side Rendering - SSR).


Bootstrap: Adotado para facilitar a criação de um design responsivo e profissional.


express-session: Responsável pelo gerenciamento de sessões, permitindo o armazenamento de informações sobre usuários logados e possibilitando, no futuro, a implementação de controle de acesso.


### Boas Práticas Adotadas
Durante o desenvolvimento, diversas boas práticas foram seguidas para garantir a qualidade do código e a eficiência do sistema. Tivemos a separação clara de responsabilidades por camadas, validação de entrada de dados utilizando Joi e tratamento adequado de erros.

O sistema foi projetado para ser facilmente integrado com futuros frontends (como aplicativos mobile) graças à sua estrutura de rotas RESTful. O código é modular e organizado, o que facilita a inclusão de novos módulos, como feedback de usuários, relatórios gerenciais, entre outros.
Por fim, o projeto foi desenvolvido com foco em clareza, facilidade de manutenção, boas práticas REST, segurança básica e modularidade. Sua base sólida permite ampliações futuras, incluindo a implementação de autenticação avançada (como JWT), suporte a novos tipos de usuários e geração de relatórios gerenciais.

 
## <a name="c1"></a>5. Aprendizados e Desafios
Os principais aprendizados durante o desenvolvimento deste projeto envolveram tanto aspectos técnicos quanto conceituais relacionados à construção de sistemas web. Foi possível aprofundar o conhecimento em arquitetura de software, especialmente no padrão MVC  para separação de responsabilidades. 

A integração com o banco de dados PostgreSQL  foi o maior desafio que permitiu consolidar habilidades em modelagem relacional, criação de consultas SQL e rotas. O problema enfrentado com maior frequência era de não encontrar o id do paciente por ele não estar nas rotas ou não estar sendo declarado no controle. Para resolução tive um grande aprendizado com o tratamento de erros e console.log para debug e encontrar o verdadeiro problema.

De forma geral, o projeto proporcionou uma visão mais completa e prática sobre o ciclo de desenvolvimento de uma aplicação web moderna, desde o planejamento até a entrega de uma solução funcional e segura.



Futuras implementações e Upgrades:
- Dashboard do orientador para acessar os agendamentos feitos
- Avisos de erro quando a senha não for válida
- Deixar fixo na nav bar o acesso a página de agendamento para uma melhor experiência do usuário


