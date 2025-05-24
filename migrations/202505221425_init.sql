CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),   
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    user_type VARCHAR(100),
    entidade_tipo VARCHAR(100)
);

CREATE TABLE orientador (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),   
    expertise VARCHAR(255),
    disponibilidade_data DATE,
    disponibilidade_time TIME,
    bio TEXT,
    lattes_link VARCHAR(255),
    retorno_agendamento VARCHAR(255),
    id_account UUID  NOT NULL,
    FOREIGN KEY (id_account) REFERENCES accounts(id)
);

CREATE TABLE aluno (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),   
    objetivo VARCHAR(255),
    interesses VARCHAR(255),
    bio TEXT,
    lattes_link VARCHAR(255),
    id_account UUID  NOT NULL,
    FOREIGN KEY (id_account) REFERENCES accounts(id)
);

CREATE TABLE sessao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),   
    agendamento_data DATE,
    agendamento_hora VARCHAR(50),
    status VARCHAR(100),
    external_link VARCHAR(255),
    topico VARCHAR(255),
    id_orientador UUID NOT NULL,
    id_aluno UUID NOT NULL,
    FOREIGN KEY (id_orientador) REFERENCES orientador(id),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id)
);
