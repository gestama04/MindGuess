# Game Data

Dados versionados de entidades e perguntas utilizados durante o desenvolvimento.

## Expansão da base

As pessoas são validadas por `FamousPersonSchema` antes de serem exportadas para
o jogo. Para adicionar um lote novo:

1. recolher fontes verificáveis e registá-las em `people/SOURCES.md`;
2. preencher todos os atributos objetivos da versão atual do schema;
3. manter `status: "production"` apenas depois da revisão dos dados;
4. executar `npm run validate:data` e `npm test`;
5. confirmar que existe variedade de países, línguas e áreas públicas.

O objetivo do MVP é chegar a aproximadamente 100 pessoas de várias regiões,
sem trocar qualidade e rastreabilidade por geração automática de biografias.

A expansão seguinte deve priorizar representação fora do eixo Europa/EUA,
incluindo África, Ásia, Médio Oriente, América Latina e Oceânia. Cada lote
deve ser acompanhado por fontes específicas e por uma simulação que mostre se
as novas entidades são realmente distinguíveis pelas perguntas existentes.
