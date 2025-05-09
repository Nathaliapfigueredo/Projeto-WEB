CREATE TABLE accounts (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    user_type VARCHAR(100)
);

CREATE TABLE mentor (
    id INT PRIMARY KEY,
    expertise VARCHAR(255),
    disponibilidade INT,
    bio TEXT,
    lattes_link VARCHAR(255),
    accounts_id INT,
    FOREIGN KEY (accounts_id) REFERENCES accounts(id)
);

CREATE TABLE mentee (
    id INT PRIMARY KEY,
    objetivo VARCHAR(255),
    interesses VARCHAR(255),
    bio TEXT,
    lattes_link VARCHAR(255),
    accounts_id INT,
    FOREIGN KEY (accounts_id) REFERENCES accounts(id)
);

CREATE TABLE topico (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    descriacao TEXT
);

CREATE TABLE sessao (
    id INT PRIMARY KEY,
    proposta_agendamento VARCHAR(255),
    status VARCHAR(100),
    external_link VARCHAR(255),
    mentor_id INT,
    mentee_id INT,
    topico_id INT,
    FOREIGN KEY (mentor_id) REFERENCES mentor(id),
    FOREIGN KEY (mentee_id) REFERENCES mentee(id),
    FOREIGN KEY (topico_id) REFERENCES topico(id)
);
