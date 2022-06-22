-- --------------------------------------------------------------------------------------- --
DROP DATABASE IF EXISTS caes_guia;
CREATE DATABASE caes_guia;
USE caes_guia;

-- --------------------------------------------------------------------------------------- --
-- TABELAS                                                                                 --
-- --------------------------------------------------------------------------------------- --

-- --------------------------------------------------------------------------------------- --
CREATE TABLE usuarios (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    nome                    VARCHAR(40)                         NOT NULL                    ,
    cpf                     VARCHAR(11)                         NOT NULL                    ,
    sexo                    ENUM('masc', 'fem', 'nao-bin')                                  ,
    data_nascimento         DATE                                NOT NULL                    ,
    endereco_logradouro     VARCHAR(50)                         NOT NULL                    ,
    endereco_numero         VARCHAR(10)                                                     ,
    endereco_complemento    VARCHAR(50)                                                     ,
    endereco_cep            VARCHAR(8)                          NOT NULL                    ,
    endereco_cidade         VARCHAR(30)                         NOT NULL                    ,
    endereco_estado         VARCHAR(2)                          NOT NULL                    ,
    endereco_bairro         VARCHAR(30)                         NOT NULL                    ,
    email                   VARCHAR(30)                         NOT NULL                    ,
    senha                   VARCHAR(40)                         NOT NULL                    ,
    ativo                   BOOLEAN                             DEFAULT(true)               ,
    rg                      VARCHAR(15)                         NOT NULL                    ,
    telefone                VARCHAR(15)                         NOT NULL                    ,
    id_instituicao          INT                                 NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)                                                                        
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE instituicoes (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    razao_social            VARCHAR(40) NOT NULL                                            ,
    cnpj                    VARCHAR(14) NOT NULL                                            ,
    endereco_logradouro     VARCHAR(50)                         NOT NULL                    ,
    endereco_numero         VARCHAR(10)                                                     ,
    endereco_complemento    VARCHAR(50)                                                     ,
    endereco_cep            VARCHAR(8)                          NOT NULL                    ,
    endereco_cidade         VARCHAR(30)                         NOT NULL                    ,
    endereco_estado         VARCHAR(2)                          NOT NULL                    ,
    endereco_bairro         VARCHAR(30)                         NOT NULL                    ,
    email                   VARCHAR(30)                         NOT NULL                    ,
    ativo                   BOOLEAN                             DEFAULT(true)               ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)                                                                        
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE caes_guia (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    sexo                    ENUM('masc', 'fem', 'nao-bin')                                  ,
    cor                     VARCHAR(15)                         NOT NULL                    ,
    nome                    VARCHAR(25)                         NOT NULL                    ,
    data_nascimento         DATE                                NOT NULL                    ,
    raca                    VARCHAR(20)                         NOT NULL                    ,
    numero_registro         INT                                 NOT NULL                    ,
    ativo                   BOOLEAN                             DEFAULT(true)               ,
    id_instituicao          INT                                 NOT NULL                    ,
    id_usuario              INT                                 NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE validacao (                                                                   
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    id_usuario              INT                                 NOT NULL                    ,
    data_contato            DATE                                NOT NULL                    , 
    meio_contato            VARCHAR(30)                         NOT NULL                    ,
    observacoes             VARCHAR(50)                         NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE documentos (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    descricao               VARCHAR(50)                         NOT NULL                    ,
    path                    VARCHAR(50)                         NOT NULL                    ,
    id_usuario              INT                                 NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE status_cao_guia (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    status_descricao        VARCHAR(50)                         NOT NULL                    ,
    status_tipo             VARCHAR(15)                         NOT NULL                    ,
    status_data             DATE                                NOT NULL                    ,
    id_cao                  INT                                 NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)
);

-- --------------------------------------------------------------------------------------- --
CREATE TABLE forma_dupla (
    id_usuario              INT                                 NOT NULL                    ,
    id_cao                  INT                                 NOT NULL                    ,
    inicio_dupla            DATE                                NOT NULL                    ,
    fim_dupla               DATE                                NOT NULL                    ,
    motivo_fim_dupla        TEXT                                NOT NULL                    ,
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id_usuario, id_cao)
);

-- --------------------------------------------------------------------------------------- --
-- RELACIONAMENTOS                                                                         --
-- --------------------------------------------------------------------------------------- --

ALTER TABLE usuarios
    ADD FOREIGN KEY (id_instituicao) REFERENCES instituicoes(id);

ALTER TABLE caes_guia
    ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    ADD FOREIGN KEY (id_instituicao) REFERENCES instituicoes(id);

ALTER TABLE validacao
    ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id);

ALTER TABLE documentos
    ADD FOREIGN KEY (id_usuario) REFERENCES validacao (id_usuario);

ALTER TABLE status_cao_guia
    ADD FOREIGN KEY (id_cao) REFERENCES caes_guia(id);

ALTER TABLE forma_dupla
    ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    ADD FOREIGN KEY (id_cao) REFERENCES caes_guia(id);