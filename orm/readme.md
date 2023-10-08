# Integração MySQL + NodeJs


Anotações
-> ao integrar o handlebars ao express, é necessário instanciar como handlwbars.engine() após realizar o require do módulo.
-> é necessário estabelecer a conexão com o banco de dados a cada operação.
-> tive que usar a lib mysql2 para realizar a conexão já que a mysql não estava suportando a conexão com o servidor de banco de dados local
