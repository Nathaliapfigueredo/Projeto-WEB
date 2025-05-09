CREATE TABLE accounts (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    user_type VARCHAR(100),
    entidade_tipo VARCHAR(100)
);

CREATE TABLE orientador (
    id INT PRIMARY KEY,
    expertise VARCHAR(255),
    disponibilidade_data DATE,
    disponibilidade_time TIME,
    bio TEXT,
    lattes_link VARCHAR(255),
    retorno_agendamento VARCHAR(255),
    
    FOREIGN KEY (id) REFERENCES accounts(id)
);

CREATE TABLE aluno (
    id INT PRIMARY KEY,
    objetivo VARCHAR(255),
    interesses VARCHAR(255),
    bio TEXT,
    lattes_link VARCHAR(255),
    FOREIGN KEY (id) REFERENCES accounts(id)
);

CREATE TABLE sessao (
    id INT PRIMARY KEY,
    agendamento_data DATE,
    agendamento_hora VARCHAR(50),
    status VARCHAR(100),
    external_link VARCHAR(255),
    topico VARCHAR(255),
    mentor_id INT,
    mentee_id INT,
    FOREIGN KEY (mentor_id) REFERENCES orientador(id),
    FOREIGN KEY (mentee_id) REFERENCES aluno(id)
);
