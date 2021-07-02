# potential-crud

> Esse projeto foi realizado com node no backend, react no frontend e mysql como banco de dados.

## Como rodar o projeto
*Requisitos*
* MySQL
* Node

1. Instale o mysql.

2. Crie o banco de dados crud-gazin
```
CREATE SCHEMA `crud-gazin`;
```

3. Crie uma tabela com o nome "developers", com as colunas:
```
  CREATE TABLE `crud-gazin`.`developers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sexo` CHAR NOT NULL,
  `hobby` VARCHAR(45) NOT NULL,
  `datanascimento` DATE NOT NULL,
  PRIMARY KEY (`id`));
```
  
4. Clone o projeto

5. Acesse a pasta `crud-gazin-back` pelo terminal

6. Rode o comando
```
yarn
```

7. Após instalar as dependências digite:
```
yarn start
```

8. Acesse a pasta `crud-gazin-front` pelo terminal

9. Rode o comando
```
yarn
```

10. Após instalar as dependências digite:
```
yarn start
```
11. Abrirá a página do sistema (http://localhost:3000/).
