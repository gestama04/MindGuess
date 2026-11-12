import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  Share,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
  rankCandidates,
  type GameSession,
  type PlayerAnswer,
  type Question,
} from "@mindguess/game-engine";
import { people, questions as gameQuestions } from "@mindguess/game-data";

const COLORS = {
  background: "#07111F",
  card: "#101E31",
  cardRaised: "#172A42",
  purple: "#6C63FF",
  cyan: "#49D8E8",
  text: "#F7F9FC",
  muted: "#9BABBE",
  line: "rgba(255,255,255,.09)",
  yes: "#35D19A",
  no: "#FF6B7A",
  maybe: "#F5B84B",
} as const;

type Phase = "welcome" | "playing" | "guess" | "result";
type GameMode = "classic" | "deception";

const ANSWERS: readonly {
  value: PlayerAnswer;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  { value: "yes", label: "Sim", icon: "checkmark", color: COLORS.yes },
  { value: "no", label: "Não", icon: "close", color: COLORS.no },
  {
    value: "maybe",
    label: "Provavelmente",
    icon: "swap-horizontal",
    color: COLORS.maybe,
  },
  { value: "unknown", label: "Não sei", icon: "help", color: COLORS.cyan },
];

const AREAS = ["Desporto", "Música", "Cinema", "Ciência", "Literatura"];

export default function HomeScreen() {
  const questions = gameQuestions as unknown as Question[];
  const [phase, setPhase] = useState<Phase>("welcome");
  const [session, setSession] = useState<GameSession | null>(null);
  const [guessIndex, setGuessIndex] = useState(0);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>("classic");
  const [answersGiven, setAnswersGiven] = useState(0);

  const ranked = session ? rankCandidates(session.candidates) : [];
  const guess = ranked[guessIndex] ?? ranked[0] ?? null;
  const progress = session
    ? Math.min(session.turn / session.maxTurns, 1)
    : 0;

  function start(mode: GameMode = gameMode) {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSession(
      createGameSession(people, questions, {
        nearBestRatio: 0.95,
        questionSelectionSeed: Date.now(),
        maxTurns: 18,
        guessThreshold: 0.85,
      }),
    );
    setGuessIndex(0);
    setWasCorrect(null);
    setGameMode(mode);
    setAnswersGiven(0);
    setPhase("playing");
  }

  function answer(value: PlayerAnswer) {
    if (!session || session.status !== "active") {
      return;
    }

    void Haptics.selectionAsync();
    const next = answerCurrentQuestion(session, value);
    setSession(next);
    setAnswersGiven((current) => current + 1);
    if (next.status === "ready_to_guess") {
      setPhase("guess");
    }
  }

  function confirm(correct: boolean) {
    if (!session || session.status !== "ready_to_guess" || !guess) {
      return;
    }

    if (!correct && guessIndex < Math.min(2, ranked.length - 1)) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setGuessIndex((current) => current + 1);
      return;
    }

    const finished = finalizeGameSession(session);
    setSession({ ...finished, finalGuess: guess });
    setWasCorrect(correct);
    setPhase("result");
  }

  async function shareResult() {
    if (!session?.finalGuess || wasCorrect === null) {
      return;
    }

    await Share.share({
      message: wasCorrect
        ? `O MindGuess descobriu ${session.finalGuess.person.name} em ${session.turn} perguntas. Consegues enganá-lo?`
        : `Consegui escapar ao MindGuess depois de ${session.turn} perguntas. Tenta descobrir a minha pessoa!`,
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View pointerEvents="none" style={styles.orb} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.brandText}>MindGuess</Text>
          <View style={styles.datasetBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.datasetText}>{people.length} pessoas</Text>
          </View>
        </View>

        {phase === "welcome" && (
          <View style={styles.center}>
            <View style={styles.heroIcon}>
              <Ionicons name="sparkles" size={62} color={COLORS.cyan} />
            </View>
            <Text style={styles.kicker}>JOGO DE DEDUÇÃO</Text>
            <Text style={styles.title}>Pensa em alguém conhecido.</Text>
            <Text style={styles.subtitle}>
              Escolhe uma pessoa do mundo. Eu faço as perguntas e tento
              descobrir quem é.
            </Text>
            <View style={styles.areaList}>
              {AREAS.map((area) => (
                <View key={area} style={styles.areaPill}>
                  <Text style={styles.areaText}>{area}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.modeHeading}>Escolhe como queres jogar</Text>
            <View style={styles.modeList}>
              <ModeCard
                icon="sparkles"
                title="Clássico"
                description="Eu tento descobrir a pessoa."
                selected={gameMode === "classic"}
                onPress={() => setGameMode("classic")}
              />
              <ModeCard
                icon="flame"
                title="Engana-me"
                description="Responde de forma ambígua e tenta escapar."
                selected={gameMode === "deception"}
                onPress={() => setGameMode("deception")}
              />
            </View>
            <PrimaryButton
              label={gameMode === "deception" ? "Tentar enganar" : "Começar a jogar"}
              icon="arrow-forward"
              onPress={start}
            />
            <Text style={styles.tip}>
              Sem conta · Motor local · {questions.length} perguntas possíveis
            </Text>
          </View>
        )}

        {phase === "playing" && session?.currentQuestion && (
          <View>
            <View style={styles.progressHeader}>
              <Text style={styles.smallLabel}>PERGUNTA {session.turn + 1}</Text>
              <Text style={styles.smallLabel}>MÁX. {session.maxTurns}</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${Math.max(progress * 100, 5)}%` },
                ]}
              />
            </View>
            <View style={styles.questionCard}>
              <View style={styles.questionIcon}>
                <Ionicons name="help" size={25} color={COLORS.cyan} />
              </View>
              <Text style={styles.questionLabel}>A minha pergunta é...</Text>
              <Text style={styles.question}>
                {session.currentQuestion.canonicalText}
              </Text>
            </View>
            {gameMode === "deception" && (
              <View style={styles.challengeBanner}>
                <Ionicons name="flame" size={18} color={COLORS.maybe} />
                <Text style={styles.challengeText}>
                  Modo Engana-me: responde sem tornares tudo demasiado óbvio.
                </Text>
              </View>
            )}
            <Text style={styles.prompt}>Escolhe a resposta mais próxima</Text>
            <View style={styles.answerGrid}>
              {ANSWERS.map((answerOption) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={answerOption.label}
                  key={answerOption.value}
                  onPress={() => answer(answerOption.value)}
                  style={({ pressed }) => [
                    styles.answer,
                    pressed && styles.pressed,
                  ]}
                >
                  <View
                    style={[
                      styles.answerIcon,
                      { backgroundColor: `${answerOption.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={answerOption.icon}
                      size={22}
                      color={answerOption.color}
                    />
                  </View>
                  <Text style={styles.answerText}>{answerOption.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {phase === "guess" && guess && (
          <View style={styles.center}>
            <View style={styles.avatar}>
              <Text style={styles.initials}>
                {guess.person.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </Text>
            </View>
            <Text style={styles.kicker}>
              {guessIndex === 0 ? "TENHO UMA SUSPEITA" : "NOVA TENTATIVA"}
            </Text>
            <Text style={styles.guessLead}>Estás a pensar em</Text>
            <Text style={styles.guessName}>{guess.person.name}?</Text>
            <View style={styles.confidencePill}>
              <Ionicons name="analytics" size={16} color={COLORS.cyan} />
              <Text style={styles.confidenceText}>
                {Math.round(guess.probability * 100)}% de confiança
              </Text>
            </View>
            <Text style={styles.attempt}>
              Tentativa {guessIndex + 1} de {Math.min(3, ranked.length)} ·{" "}
              {answersGiven} respostas analisadas
            </Text>
            <PrimaryButton
              label="Sim, acertaste"
              icon="checkmark"
              onPress={() => confirm(true)}
            />
            <SecondaryButton
              label={guessIndex < 2 ? "Não, tenta outra pessoa" : "Também não"}
              onPress={() => confirm(false)}
            />
          </View>
        )}

        {phase === "result" && session?.finalGuess && (
          <View style={styles.center}>
            <View
              style={[
                styles.resultIcon,
                {
                  backgroundColor: wasCorrect
                    ? `${COLORS.yes}22`
                    : `${COLORS.no}22`,
                },
              ]}
            >
              <Ionicons
                name={wasCorrect ? "trophy" : "bulb-outline"}
                size={56}
                color={wasCorrect ? COLORS.yes : COLORS.no}
              />
            </View>
            <Text style={styles.kicker}>
              {wasCorrect ? "DEDUÇÃO CONCLUÍDA" : "AINDA ESTOU A APRENDER"}
            </Text>
            <Text style={styles.title}>
              {wasCorrect ? "Acertei!" : "Não foi desta."}
            </Text>
            <Text style={styles.subtitle}>
              {wasCorrect
                ? `Descobri ${session.finalGuess.person.name} em ${session.turn} perguntas.`
                : "Esta pessoa pode ainda não estar na base de dados. Vamos tentar novamente."}
            </Text>
            <View style={styles.resultCard}>
              <Text style={styles.resultCardLabel}>
                {gameMode === "deception" ? "DESAFIO DE CAMUFLAGEM" : "RESULTADO DA PARTIDA"}
              </Text>
              <Text style={styles.resultCardTitle}>
                {wasCorrect
                  ? `${session.turn} perguntas para te descobrir`
                  : `Escapaste durante ${session.turn} perguntas`}
              </Text>
              <Text style={styles.resultCardText}>
                {wasCorrect
                  ? "O motor encontrou um padrão consistente nas tuas respostas."
                  : "A tua escolha ainda não está suficientemente representada na base de dados."}
              </Text>
            </View>
            <PrimaryButton
              label="Partilhar resultado"
              icon="share-social"
              onPress={() => void shareResult()}
            />
            <SecondaryButton
              label="Jogar novamente"
              onPress={() => start(gameMode)}
            />
            <SecondaryButton
              label="Voltar ao início"
              onPress={() => setPhase("welcome")}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function PrimaryButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
    >
      <Text style={styles.primaryText}>{label}</Text>
      <Ionicons name={icon} size={20} color="white" />
    </Pressable>
  );
}

function ModeCard({
  icon,
  title,
  description,
  selected,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}: ${description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.modeCard,
        selected && styles.modeCardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.modeIcon, selected && styles.modeIconSelected]}>
        <Ionicons
          name={icon}
          size={19}
          color={selected ? COLORS.cyan : COLORS.muted}
        />
      </View>
      <Text style={styles.modeTitle}>{title}</Text>
      <Text style={styles.modeDescription}>{description}</Text>
    </Pressable>
  );
}

function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
    >
      <Text style={styles.secondaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  orb: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: "#322F78",
    opacity: 0.3,
    top: -140,
    right: -140,
  },
  scroll: { flexGrow: 1, padding: 22, paddingBottom: 42 },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: "white", fontSize: 19, fontWeight: "900" },
  brandText: { color: COLORS.text, fontSize: 20, fontWeight: "900", flex: 1 },
  datasetBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 99,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.yes,
  },
  datasetText: { color: COLORS.cyan, fontSize: 11, fontWeight: "800" },
  center: { flex: 1, minHeight: 650, justifyContent: "center" },
  heroIcon: {
    width: 126,
    height: 126,
    borderRadius: 63,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(108,99,255,.18)",
    borderWidth: 1,
    borderColor: "rgba(73,216,232,.28)",
    marginBottom: 30,
  },
  kicker: {
    color: COLORS.cyan,
    fontSize: 11,
    letterSpacing: 2.1,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -1.2,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  areaList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    marginBottom: 28,
  },
  areaPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 99,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  areaText: { color: COLORS.muted, fontSize: 11, fontWeight: "700" },
  modeHeading: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 10,
  },
  modeList: { gap: 10, marginBottom: 18 },
  modeCard: {
    minHeight: 76,
    borderRadius: 18,
    padding: 13,
    paddingLeft: 60,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    justifyContent: "center",
  },
  modeCardSelected: {
    borderColor: `${COLORS.cyan}88`,
    backgroundColor: `${COLORS.cyan}10`,
  },
  modeIcon: {
    position: "absolute",
    left: 14,
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardRaised,
  },
  modeIconSelected: { backgroundColor: `${COLORS.cyan}20` },
  modeTitle: { color: COLORS.text, fontSize: 14, fontWeight: "900" },
  modeDescription: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 3,
  },
  tip: { color: COLORS.muted, fontSize: 11, textAlign: "center", marginTop: 18 },
  primary: {
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: 22,
    backgroundColor: COLORS.purple,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryText: { color: "white", fontSize: 16, fontWeight: "900" },
  secondary: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.line,
    marginTop: 12,
  },
  secondaryText: { color: COLORS.text, fontSize: 15, fontWeight: "800" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  smallLabel: {
    color: COLORS.muted,
    fontSize: 10,
    letterSpacing: 1.3,
    fontWeight: "900",
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.cardRaised,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 26,
  },
  fill: { height: "100%", borderRadius: 3, backgroundColor: COLORS.cyan },
  questionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 26,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  questionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${COLORS.cyan}18`,
    marginBottom: 22,
  },
  questionLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 10,
  },
  question: {
    color: COLORS.text,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  challengeBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: `${COLORS.maybe}12`,
    marginTop: 12,
  },
  challengeText: {
    color: COLORS.maybe,
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  prompt: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 26,
    marginBottom: 12,
  },
  answerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  answer: {
    width: "48%",
    minHeight: 112,
    flexGrow: 1,
    flexBasis: "45%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    justifyContent: "space-between",
  },
  answerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: { color: COLORS.text, fontSize: 14, fontWeight: "900" },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.purple,
    borderWidth: 5,
    borderColor: "rgba(73,216,232,.35)",
    marginBottom: 30,
  },
  initials: { color: "white", fontSize: 42, fontWeight: "900" },
  guessLead: {
    color: COLORS.muted,
    fontSize: 17,
    textAlign: "center",
    marginBottom: 5,
  },
  guessName: {
    color: COLORS.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },
  confidencePill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: `${COLORS.cyan}15`,
    marginBottom: 8,
  },
  confidenceText: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  attempt: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 26,
  },
  resultIcon: {
    width: 126,
    height: 126,
    borderRadius: 63,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  resultCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 18,
  },
  resultCardLabel: {
    color: COLORS.cyan,
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: "900",
    marginBottom: 8,
  },
  resultCardTitle: {
    color: COLORS.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },
  resultCardText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
});
