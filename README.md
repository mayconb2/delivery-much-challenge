# Teste do Maycon - Delivery Much Challenge

Muito bem vindo ao meu desafio ;)

Me esforcei ao máximo para atender a todos os requisitos. Espero que tenham gostado do resultado. Seria um prazer avançar para as próximas etapas e conversar um pouco mais com vocês.

Para conferir o resultado final, basta seguir as próximas instruições.


## Passo a passo para execução da aplicação

### Fazendo clone do projeto 

Antes de mais nada, é preciso fazer o clone deste repositório para o seu diretório local. Para isto, basta usar o seguinte comando:

```
$ git clone https://github.com/mayconb2/delivery-much-challenge.git
```

#### Criando uma conta no Giphy

Um requisito importante para poder rodar o projeto é ter uma conta no [Giphy](https://developers.giphy.com/) para ter acesso a um token. Caso você ainda não o possua, deverá criar uma conta gratuita. Depois da conta criada, basta clicar em "Creat an App", selecionar a opção API e em seguida escolher um nome e descrição para seu app. Logo após você terá acesso ao seu token, conforme imagem abaixo:

![giphy](https://user-images.githubusercontent.com/40521982/85246452-0dffa680-b421-11ea-8016-615f4ccae91d.jpeg)

#### Alterando o Dockerfile

Agora, com o token do Giphy em mãos, é preciso alterar o arquivo Dockerfile, instruindo o Docker a usá-lo como variável de ambiente.

```

# código anterior ...

ENV GIPHY_TOKEN=SeuTokenAqui

# código posterior...
```

Este arquivo servirá de base para criação da imagem Docker.

#### Criando uma imagem

Para criar a imagem, primeiramente, você deve acessar o diretório onde o projeto está localizado e, na pasta raiz, onde também se encontra o arquivo do Dockerfile, executar a seguinte instruição:

```
$ docker build -t delivery-much-challenge-node-docker/node:latest .
```

### Criando um Contêiner

O passo seguinte é pegar nossa imagem criada e construir um containêr dela. Ele nada mais é do que uma peça isolada que executa a aplicação. Para isto, basta executar o comando:

```
$ docker run -p 8000:3000 delivery-much-challenge-node-docker/node
```

No nosso arquivo Dockerfile nós definimos uma porta interna da aplicação, e neste comando que acabamos de executar estamos dizendo qual será a porta externa. Portanto, você pode trocar o 8000 por outra porta que assim deseja.


