# MindGuess

MindGuess e um jogo de deducao que tenta identificar uma pessoa famosa pensada pelo jogador.

O produto utiliza um motor matematico proprio para selecionar perguntas, atualizar probabilidades e calcular confianca.

A inteligencia artificial e utilizada apenas para personalidade e apresentacao.

## Estado

Projeto em desenvolvimento.

Fase atual:

- arquitetura;
- esquema de entidades;
- Game Engine;
- Simulator.

A aplicacao mobile sera criada depois de o Game Engine funcionar e ser testado no terminal.

## Principios principais

- o Game Engine controla o jogo;
- o LLM nao toma decisoes;
- a confianca e real;
- o jogo funciona sem IA;
- os dados seguem um esquema versionado;
- o MVP mantem um ambito reduzido.

## Estrutura

A pasta data contem os dados iniciais do jogo.

A pasta docs contem a arquitetura e as decisoes do projeto.

O package entity-schema contem o esquema e a validacao das entidades.

O package game-engine contem o motor de decisao.

O package personality contem os templates locais e a futura integracao com o LLM.

O package shared-types contem os tipos partilhados.

O package simulator contem as simulacoes automaticas.

## MVP

- Pessoas Famosas;
- aproximadamente 100 entidades;
- aproximadamente 30 atributos;
- respostas Sim, Nao, Talvez e Nao sei;
- Game Engine em TypeScript;
- Simulator;
- personalidade sarcastica;
- aplicacao React Native com Expo;
- Supabase;
- partilha do resultado.

Consultar docs/ARCHITECTURE.md antes de alterar a arquitetura.
