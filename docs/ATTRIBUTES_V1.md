# Catálogo de Atributos do MindGuess v1

## Objetivo

Este documento define os atributos iniciais da categoria Pessoas Famosas. A versão 1 privilegia factos objetivos, fáceis de validar e úteis para distinguir candidatos.

## Regras gerais

- `null` significa que o valor é desconhecido ou não pode ser validado com consistência.
- `false` significa que o facto foi validado e é falso.
- Todos os enums usam identificadores internos estáveis em inglês.
- Texto apresentado ao jogador pode ser localizado para português.
- `primaryProfession` representa a principal razão da notoriedade pública.
- `professions` contém todas as profissões públicas relevantes e validadas.
- Não guardar booleanos que possam ser derivados sem ambiguidade de outro atributo.
- Cada pergunta aponta para um atributo, um operador e um valor esperado.

## Atributos canónicos armazenados

### Identidade e origem

1. `alive`: boolean ou null. Indica se a pessoa está viva.
2. `gender`: enum ou null. Valores: `male`, `female`, `non_binary`, `other`.
3. `birthCountry`: enum ou null. País de nascimento, usando identificadores controlados.
4. `nationalities`: array não vazio de países controlados.
5. `primaryLanguage`: enum ou null. Principal idioma associado ao trabalho público.

### Notoriedade

6. `publicArea`: enum ou null. Área pública principal.
7. `primaryProfession`: enum ou null. Profissão principal responsável pela notoriedade.
8. `professions`: array não vazio de profissões validadas.
9. `becameFamousPeriod`: enum ou null. Período em que a pessoa se tornou amplamente conhecida.
10. `primarilyKnownInternationally`: boolean ou null. Indica reconhecimento relevante fora do principal país associado.
11. `associatedCountries`: array de países com associação pública forte e verificável.

### Entretenimento e publicação

12. `hasActedInFilmOrTelevision`: boolean ou null.
13. `hasReleasedMusic`: boolean ou null.
14. `hasPresentedTelevision`: boolean ou null.
15. `createsOnlineContent`: boolean ou null.
16. `hasPublishedBooks`: boolean ou null.

### Desporto

17. `sport`: enum ou null. Principal modalidade desportiva profissional.
18. `representedNationalTeam`: boolean ou null.

### Vida pública, negócios e ciência

19. `heldPoliticalOffice`: boolean ou null.
20. `foundedOrLedMajorCompany`: boolean ou null.
21. `workedInScienceOrAcademia`: boolean ou null.

### Conquistas

22. `wonMajorInternationalAward`: boolean ou null.
23. `wonOlympicMedal`: boolean ou null.
24. `wonWorldChampionship`: boolean ou null.
25. `hasGuinnessRecognizedRecord`: boolean ou null.

## Atributos derivados

Estes valores não são guardados diretamente. São calculados a partir dos atributos canónicos.

- `birthContinent`: derivado de `birthCountry`.
- `bornInPortugal`: `birthCountry equals portugal`.
- `bornInEurope`: continente derivado igual a `europe`.
- `isActor`: `professions contains actor`.
- `isSinger`: `professions contains singer`.
- `isFootballer`: `professions contains footballer`.
- `isProfessionalAthlete`: `sport is not null` ou profissão contém `athlete`.
- `isPolitician`: `professions contains politician` ou `heldPoliticalOffice equals true`.
- `isWriter`: `professions contains writer`.
- `isScientist`: `professions contains scientist` ou `workedInScienceOrAcademia equals true`.
- `associatedWithPortugal`: `associatedCountries contains portugal`.
- `associatedWithUnitedStates`: `associatedCountries contains united_states`.
- `associatedWithUnitedKingdom`: `associatedCountries contains united_kingdom`.

## Taxonomias iniciais

### PublicArea

- `acting`
- `business`
- `comedy`
- `internet`
- `journalism`
- `literature`
- `music`
- `politics`
- `science`
- `sports`
- `television`
- `other`

### Profession

- `actor`
- `athlete`
- `businessperson`
- `comedian`
- `content_creator`
- `director`
- `footballer`
- `journalist`
- `musician`
- `politician`
- `presenter`
- `scientist`
- `singer`
- `writer`
- `other`

### BecameFamousPeriod

- `before_1900`
- `1900_1949`
- `1950_1979`
- `1980_1999`
- `2000_2009`
- `2010_2019`
- `2020_present`

### Sport

- `athletics`
- `basketball`
- `boxing`
- `cycling`
- `football`
- `formula_one`
- `golf`
- `gymnastics`
- `martial_arts`
- `motorsport`
- `rugby`
- `swimming`
- `tennis`
- `other`

### PrimaryLanguage

- `arabic`
- `chinese`
- `english`
- `french`
- `german`
- `hindi`
- `italian`
- `japanese`
- `korean`
- `portuguese`
- `russian`
- `spanish`
- `other`

### Country

A lista inicial deve incluir apenas países necessários para as primeiras 20 entidades. Deve crescer de forma controlada, sem aceitar strings livres.

Valores iniciais recomendados:

- `argentina`
- `australia`
- `brazil`
- `canada`
- `france`
- `germany`
- `india`
- `ireland`
- `italy`
- `japan`
- `portugal`
- `south_africa`
- `south_korea`
- `spain`
- `sweden`
- `united_kingdom`
- `united_states`
- `other`

## Operadores de perguntas

- `equals`: compara um valor escalar.
- `contains`: verifica se um array contém um valor.
- `is_not_null`: verifica se existe um valor conhecido.

## Perguntas canónicas

- `alive equals true`: Esta pessoa está viva?
- `birthContinent equals europe`: Esta pessoa nasceu na Europa?
- `professions contains footballer`: Esta pessoa é ou foi futebolista profissional?
- `professions contains actor`: Esta pessoa trabalha ou trabalhou como ator ou atriz?
- `publicArea equals music`: A fama desta pessoa vem principalmente da música?
- `associatedCountries contains portugal`: Esta pessoa tem uma associação pública forte a Portugal?
- `heldPoliticalOffice equals true`: Esta pessoa ocupou um cargo político?
- `wonOlympicMedal equals true`: Esta pessoa ganhou uma medalha olímpica?

## Critérios de revisão pelo simulador

Depois das primeiras simulações, rever:

- atributos quase nunca escolhidos por ganho de informação;
- atributos com demasiados valores `null`;
- perguntas redundantes;
- pares de entidades difíceis de distinguir;
- perguntas que jogadores reais respondem frequentemente com `unknown`;
- definições que produzem respostas inconsistentes.
