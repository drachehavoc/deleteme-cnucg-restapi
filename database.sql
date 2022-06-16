DROP DATABASE IF EXISTS caes_guia;
CREATE DATABASE caes_guia;
USE caes_guia;

CREATE TABLE pessoas (
    id                      INT                                 NOT NULL   AUTO_INCREMENT   ,
    nome                    VARCHAR(40)                         NOT NULL                    ,
    cpf                     VARCHAR(11)                         NOT NULL                    ,
    sexo                    ENUM('masc', 'fem', 'não binário')                              ,
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
    -- ----------------------------------------------------------------------------------- --
    PRIMARY KEY (id)
)
