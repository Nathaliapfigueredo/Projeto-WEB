# Web Application Document - Projeto Individual - Módulo 2 - Inteli


## OrientaJovem

#### Nathália Pires de Figueredo

## Sumário

1. [Introdução](#c1)  
2. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução 

O sistema de orientação nasce como uma resposta concreta a um dos maiores desafios enfrentados pela PSEducation, organização sem fins lucrativos que fundei com o propósito de democratizar o acesso à ciência e à tecnologia para jovens brasileiros, especialmente aqueles de regiões sem acesso a oportunidades ou com pouca representatividade nos espaços acadêmicos.<br>

O sistema de mentorias surge como resposta ao desafio central da organização: garantir que estudantes da organização tenham acesso a orientação qualificada para desenvolverem suas próprias pesquisas. Para isso, criamos uma plataforma que conecta orientadores — jovens cientistas, especialistas ou profissionais com experiência em pesquisa — a estudantes que desejam transformar ideias em artigos. Com recursos como criação de perfis, classificação por tópicos de interesse e agendamento de sessões, o sistema oferece um programa estruturado de orientação científica, acessível, organizado e colaborativo. Mais do que uma ferramenta, representa um passo essencial para tornar a ciência um espaço de pertencimento e realização para todos.

## <a name="c2"></a>2. Projeto da Aplicação Web

### 2.1. Modelagem do banco de dados 

Ao projetar um banco de dados eficiente e funcional, é essencial compreender os modelos lógico e físico de banco de dados. O modelo lógico descreve como os dados são organizados e relacionados entre si, utilizando estruturas como tabelas, chaves e relacionamentos. Já o modelo físico representa como esses dados são efetivamente salvos no sistema de armazenamento, considerando aspectos como desempenho, índices e alocação de espaço. Nesta sessão, vamos explor o processo para a criação desses modelos.

#### Entidades relacionadas: 
- Accounts;
- Orientador;
- Aluno;
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
Para o modelo físico foi traduda a linguagem desenvolvida no Mermaid para o modelo lógico para SQL, o qual adicionamos no arquivo SQL da pasta migrations.
[Aqui está o código SQL que cria a estrutura de um banco de dados.](migrations/202505091120_init.sql)




