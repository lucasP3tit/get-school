<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>

# Sistema GetSchool

![Logo](https://github.com/cswisni/SistemaGetSchool/blob/main/LogoGetSchoolII.png)

Sistema GetSchool é uma aplicação de gestão escolar em desenvolvimento para o Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário Senac.

A aplicação visa simplificar a administração de escolas e melhorar a comunicação entre professores, alunos e pais. 

## Protótipo

Protótipo desenvolvido na ferramenta [Miro](https://miro.com/app/board/uXjVPMKhMEk=/?utm_source=notification&utm_medium=email&utm_campaign=daily-updates&utm_content=go-to-board/)

## Tecnologias

- [Miro](https://miro.com/app/board/uXjVPMKhMEk=/?utm_source=notification&utm_medium=email&utm_campaign=daily-updates&utm_content=go-to-board/)
- Node.js

## Requisitos
Ter as seguintes aplicações instaladas na máquina:

- Node JS
- NPM
- SQLServer e criar o banco de dados "getschool" (o projeto utiliza a porta 1433 para comunicação com o serviço de banco de dados, usuario="sa", senha="abcd=1234", conforme configuração contida dentro do arquivo ./database/database.js, podendo ser ajustadas de acordo a necessidade. As tabelas serão geradas pelo Sequelize.)

Na raiz do projeto executar:
* npm install (instalação das dependências)
* node index.js (vai iniciar a aplicação na porta 8081 como localhost)

Usuário para acesso ao sistema:

* Ao executar pela primeira vez o projeto, será criado o usuário com login "admin@admin.com" e senha ="admin123", utilize ele para logar e acessar o sistema.

## Desenvolvedores

Grupo 16 - 2023:
- Camila Santana Wisnieski
- Gabriela Carvalho de Souza
- Guilherme Martins Pereira
- Lucas Petit de Aragão
- Pâmela Gomes Mojolla
