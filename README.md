# Teste do Maycon - [Delivery Much Challenge](https://github.com/delivery-much/challenge)

Muito bem vindo ao meu desafio ;)

Me esforcei ao máximo para atender a todos os requisitos. Espero que gostem do resultado. Caso tenha alguma dúvida, sugestão ou crítica ficarei feliz em recebê-las.

As tecnologias usadas foram:
- [NodeJS](https://nodejs.org/en/);
- [Dotenv](https://www.npmjs.com/package/dotenv);
- [Express](https://www.npmjs.com/package/express);
- [Axios](https://www.npmjs.com/package/axios);
- [Jest](https://jestjs.io/);
- [Docker](https://www.docker.com/).

O projeto também utiliza os seguintes serviços externos:
- [Giphy](https://developers.giphy.com/);
- [Recipe Puppy](http://www.recipepuppy.com/about/api/).


Você precisa apenas ter o Docker instalado para conseguir rodar a aplicação. Para conferir o resultado final, basta seguir as próximas instruições.


## Passo a passo para execução da aplicação

### Fazendo clone do projeto 

Antes de mais nada, é preciso fazer o clone deste repositório para o seu diretório local. Para isto, basta usar o seguinte comando:

```
$ git clone https://github.com/mayconb2/delivery-much-challenge.git
```

#### Criando uma conta no Giphy

Um requisito importante para poder rodar este projeto é ter uma conta no [Giphy](https://developers.giphy.com/) para ter acesso a um token. Caso você ainda não o possua, deverá criar uma conta gratuita. Depois da conta criada, basta clicar em "Creat an App", selecionar a opção API e em seguida escolher um nome e descrição para seu app. Logo após você terá acesso ao seu token, conforme imagem abaixo:

![giphy](https://user-images.githubusercontent.com/40521982/85246452-0dffa680-b421-11ea-8016-615f4ccae91d.jpeg)

#### Alterando o Dockerfile

Agora, com o token do Giphy em mãos, é preciso alterar o arquivo Dockerfile, instruindo o Docker a usá-lo como variável de ambiente. Substitua "SeuTokenAqui" pelo token da Giphy, conforme imagem abaixo.

```

# código anterior ...

ENV GIPHY_TOKEN=SeuTokenAqui

# código posterior...
```

Agora o Dockerfile está configurado e pronto para instruir corretamente a criação de uma imagem.

#### Criando uma imagem

Para criar a imagem, primeiramente, você deve acessar o diretório onde o projeto está localizado e, na pasta raiz, onde também se encontra o arquivo Dockerfile, e executar a seguinte instruição:

```
$ docker build -t delivery-much-challenge-node-docker/node:latest .
```

### Criando um Contêiner

O passo seguinte é pegar nossa imagem criada e construir um containêr dela. Ele nada mais é do que uma peça isolada que executa a aplicação. Para isto, basta executar o comando:

```
$ docker run -p 8000:3000 delivery-much-challenge-node-docker/node
```

No nosso arquivo Dockerfile nós definimos uma porta interna da aplicação, e neste comando que acabamos de executar estamos dizendo qual será a porta externa. Portanto, você pode trocar a porta externa 8000 por outra porta que desejar.


### Utilizando a aplicação

Agora com o container sendo executado, basta utilizar a aplicação.

Ela consiste numa API que possui apenas um endpoint: uma requisição do tipo GET. Ela deve obedecer a seguinte chamada:

```
http://{HOST}/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}
```
A query string deve receber até 3 ingredientes separados por vírgulas. Caso tenha mais ingredientes, a API irá retornar um erro. Caso a requisição seja feita corretamente, a resposta será a lista dos ingredientes (em ordem alfabética) e uma lista de receitas contendo o seu nome, os ingredientes, um link para acessá-la e um gif. Um exemplo de requisição bem sucedida:

```
{
    "keywords": 
    [
        "bacon",
        "cheese",
        "pasta"
    ],
    "recipes": [
        {
            "title": "American Spaghetti",
            "ingredients": "bacon, tomato soup, cheese, pasta",
            "link": "http://www.recipezaar.com/American-Spaghetti-254028",
            "gif": "https://media0.giphy.com/media/11uoNyauChZR16/giphy.gif?cid=19af954d63459b0ad2012ab7c208732fef5603796c42c9ae&rid=giphy.gif"
        },
        {
            "title": "Tomato Soup Pasta Bake",
            "ingredients": "tomato soup, pasta, bacon, cheese, milk, onions, cheese",
            "link": "http://www.bestrecipes.com.au/recipe/Tomato-Soup-Pasta-Bake-L3813.html",
            "gif": "https://media1.giphy.com/media/6Bdx9wl8sIh4A/giphy.gif?cid=19af954d68e9b37fe652dc6d3a96b10935f3a88e82797e4f&rid=giphy.gif"
        },
        {
            "title": "Carbonara Pasta Recipe",
            "ingredients": "bacon, black pepper, eggs, onions, cheese, romano cheese, salt, pasta, white wine",
            "link": "http://www.grouprecipes.com/50898/carbonara-pasta.html",
            "gif": "https://media3.giphy.com/media/UoEjs90HKfhC/giphy.gif?cid=19af954dda3ab21bda37064b5a65dbdaf87026c154da3031&rid=giphy.gif"
        }
    ]
}
```

### Executando os testes

A aplicação possui dois testes unitários. A ideia é verificar se os serviços externos ([Giphy](https://developers.giphy.com/) e [Recipe Puppy](http://www.recipepuppy.com/about/api/)) estão funcionando. Caso um deles esteja fora, ao fazer a requisição para API ela deve retornar um erro infornado que o serviço externo está com problemas.

Foi utilizado o framewrok de testes [Jest](https://jestjs.io/). Para executar os testes unitários, basta executar o comanddo:

```
$ npm run test
```
