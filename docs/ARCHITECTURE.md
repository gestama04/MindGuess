# MindGuess Architecture

## 1. Definicao do produto

O MindGuess e um jogo de deducao que tenta identificar uma pessoa famosa pensada pelo jogador atraves de perguntas curtas e respostas estruturadas.

A experiencia deve parecer um jogo e nao uma conversa tradicional com um chatbot.

## 2. Principios nao negociaveis

1. O Game Engine escolhe sempre a proxima acao.
2. O LLM nunca escolhe candidatos, perguntas ou palpites.
3. O LLM nunca altera probabilidades ou confianca.
4. A confianca apresentada ao jogador vem exclusivamente do Game Engine.
5. O jogo deve funcionar completamente sem acesso a um LLM.
6. O Game Engine deve ser deterministico para os mesmos dados e respostas.
7. O Game Engine nao pode depender de React Native, Expo, Supabase ou APIs externas.
8. As entidades utilizam um esquema fixo, validado e versionado.
9. Nenhuma entidade sugerida entra diretamente em producao.
10. A interface apresenta apenas informacao consistente com o estado real do jogo.

## 3. Ambito do MVP

O MVP inclui apenas:

- uma categoria chamada Pessoas Famosas;
- aproximadamente 100 entidades validadas;
- aproximadamente 30 atributos objetivos;
- respostas yes, no, maybe e unknown;
- Game Engine em TypeScript;
- selecao de perguntas por ganho de informacao;
- atualizacao probabilistica apos cada resposta;
- calculo real de confianca;
- palpite final;
- simulador automatico;
- personalidade sarcastica;
- aplicacao React Native com Expo;
- persistencia futura atraves do Supabase;
- cartao final com partilha simples.

## 4. Fora do ambito do MVP

O MVP nao inclui:

- leaderboard;
- amigos;
- chat entre jogadores;
- perfis complexos;
- multiplas categorias;
- desafios diarios;
- personalidades premium;
- notificacoes;
- subscricoes;
- moderacao colaborativa avancada;
- probabilidades iniciais baseadas em popularidade;
- painel administrativo completo;
- sistema complexo de reputacao.

As ideias futuras devem ser registadas em docs/FUTURE.md e nao implementadas durante o MVP.

## 5. Camadas do sistema

### 5.1 Entity Schema

Responsavel por:

- tipos das entidades;
- atributos permitidos;
- valores permitidos;
- validacao dos dados;
- versao do esquema;
- ciclo de vida das entidades.

Estados permitidos no MVP:

- pending;
- production;
- rejected.

### 5.2 Game Engine

Responsavel por:

- criar uma sessao;
- manter o estado do jogo;
- calcular probabilidades;
- aplicar respostas;
- selecionar a proxima pergunta;
- calcular ganho de informacao;
- calcular confianca;
- decidir quando apresentar um palpite.

O Game Engine nao pode importar codigo da interface, do Supabase ou do LLM.

### 5.3 Simulator

Responsavel por:

- executar partidas automaticamente;
- testar todas as entidades;
- medir a taxa de acerto;
- medir o numero medio de perguntas;
- identificar perguntas pouco uteis;
- identificar entidades dificeis de distinguir;
- executar simulacoes perfeitas, realistas e ruidosas;
- produzir resultados reproduziveis atraves de uma seed.

O Simulator deve utilizar exatamente o mesmo Game Engine da aplicacao real.

### 5.4 Personality

Responsavel apenas por:

- reformular perguntas canonicas;
- gerar frases curtas;
- aplicar personalidade;
- produzir variacoes de tom;
- reagir a eventos reais do Game Engine.

A camada Personality recebe apenas factos permitidos e nunca cria logica de jogo.

Deve existir sempre um fallback local quando o LLM falhar, demorar demasiado ou devolver conteudo invalido.

### 5.5 Mobile App

Responsavel por:

- apresentar a experiencia do jogo;
- recolher respostas;
- mostrar progresso;
- apresentar animacoes;
- mostrar o palpite;
- gerar o cartao final;
- permitir a partilha.

A interface nao calcula probabilidades nem escolhe perguntas.

### 5.6 Persistence

O Supabase podera guardar:

- entidades;
- perguntas;
- sessoes;
- respostas;
- sugestoes de novas entidades;
- autenticacao opcional;
- analytics essenciais.

O Game Engine deve funcionar com dados locais sem ligacao ao Supabase.

## 6. Modelo inicial de dados

Para o MVP, as entidades podem ser armazenadas com atributos em JSONB.

A utilizacao de JSONB nao elimina a necessidade de um esquema rigoroso.

Todos os dados devem ser validados por TypeScript e por um validador de runtime antes de entrarem em producao.

Cada entidade deve incluir:

- identificador;
- nome;
- slug;
- categoria;
- estado;
- versao do esquema;
- aliases;
- atributos;
- data de criacao;
- data de atualizacao.

## 7. Separacao entre atributo e pergunta

Um atributo representa um facto estruturado.

Exemplo de atributo:

primaryProfession igual a actor.

Uma pergunta representa a forma apresentada ao jogador.

Exemplo de pergunta:

Esta pessoa e conhecida principalmente por representar?

Varias formulacoes podem apontar para o mesmo atributo e valor.

O Game Engine escolhe o atributo a testar. A camada Personality pode reformular apenas a pergunta canonica autorizada.

## 8. Respostas

O MVP aceita:

- yes;
- no;
- maybe;
- unknown.

As respostas nao devem eliminar candidatos de forma irreversivel.

Uma resposta representa evidencia com uma forca definida pelo Game Engine.

A resposta unknown nao deve favorecer nem prejudicar candidatos.

## 9. Confianca

A confianca e calculada pelo Game Engine com base na distribuicao real dos candidatos.

A confianca nunca pode ser:

- inventada pela interface;
- gerada pelo LLM;
- escolhida aleatoriamente;
- utilizada apenas como elemento decorativo.

## 10. Eventos do jogo

O Game Engine pode emitir eventos estruturados como:

- GAME_STARTED;
- QUESTION_SELECTED;
- ANSWER_APPLIED;
- THINKING;
- CONFIDENCE_INCREASED;
- CONFIDENCE_DECREASED;
- GUESS_READY;
- GUESS_PRESENTED;
- GUESS_REJECTED;
- GAME_WON;
- GAME_LOST.

A interface e a camada Personality reagem aos eventos, mas nao os inventam.

## 11. Estrategia de testes

O projeto deve incluir:

- testes unitarios;
- testes de validacao do esquema;
- testes deterministicos do Game Engine;
- testes de regressao;
- simulacoes automaticas;
- simulacoes com respostas imperfeitas.

Uma alteracao ao Game Engine nao deve ser aceite apenas porque parece melhorar uma partida manual.

## 12. Ordem de desenvolvimento

A ordem oficial e:

1. documentacao e contratos;
2. esquema de entidades;
3. primeiras 20 entidades;
4. Game Engine no terminal;
5. testes unitarios;
6. Simulator;
7. expansao gradual ate aproximadamente 100 entidades;
8. Personality;
9. aplicacao Expo;
10. Supabase;
11. partilha e analytics.

## 13. Politica de reutilizacao da VitaStreak

A VitaStreak e apenas uma fonte de referencia.

Pode ser reutilizado depois de revisao:

- tema;
- componentes genericos;
- configuracao do Supabase;
- autenticacao;
- tratamento de erros;
- padroes de navegacao;
- configuracao Expo;
- configuracao de build.

Nao pode ser reutilizado:

- logica de suplementos;
- logica de saude;
- streaks de vitaminas;
- notificacoes de suplementos;
- historicos especificos;
- prompts de saude;
- identificadores Expo ou EAS;
- credenciais;
- chaves Google;
- package Android da VitaStreak;
- bundle identifier da VitaStreak.

Os ficheiros devem ser copiados individualmente e adaptados.

## 14. Regra de alteracao arquitetural

Uma sugestao de uma IA, biblioteca ou ferramenta nao substitui estas regras.

Qualquer alteracao a um principio nao negociavel deve:

1. ser intencional;
2. ser documentada;
3. explicar o problema;
4. explicar as alternativas;
5. explicar as consequencias.

## 15. Regra de simplicidade

Durante o MVP, deve ser escolhida a solucao mais simples que respeite os principios nao negociaveis.

Funcionalidades futuras nao devem ser implementadas antes de existir evidencia de que sao necessarias.
