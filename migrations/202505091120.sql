CREATE EXTENSION IF NOT EXISTS "uuid-assp"

CREATE TABLE  IF NOT EXISTS  user (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    user_type VARCHAR(100)
);

CREATE TABLE  IF NOT EXISTS  mentor (
    id INT PRIMARY KEY,
    expertise VARCHAR(255),
    disponibilidade INT,
    bio TEXT,
    lattes_link VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE  IF NOT EXISTS  mentee (
    id INT PRIMARY KEY,
    objetivo VARCHAR(255),
    interesses VARCHAR(255),
    bio TEXT,
    lattes_link VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
    FOREIGN KEY (mentee_id) REFERENCES mentee(id)
);

CREATE TABLE  IF NOT EXISTS  topico (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    descriacao TEXT
);

CREATE TABLE  IF NOT EXISTS sessao (
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
