import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FamousPersonSchema } from "@mindguess/entity-schema";
import {
  answerCurrentQuestion,
  createGameSession,
  finalizeGameSession,
  getRecommendedGuess,
  type GameSession,
  type PlayerAnswer,
  type Question,
} from "@mindguess/game-engine";
import peopleData from "../data/people.v1.json";
import questionsData from "../data/questions.v1.json";

const COLORS = {
  background: "#07111F",
  surface: "#101E31",
  surfaceLight: "#172A42",
  primary: "#6C63FF",
  cyan: "#49D8E8",
  text: "#F7F9FC",
  muted: "#9BABBE",
  line: "rgba(255,255,255,0.09)",
  success: "#35D19A",
  danger: "#FF6B7A",
};

const ANSWERS: Array<{
  value: PlayerAnswer;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}> = [
  { value: "yes", label: "Sim", icon: "checkmark", color: COLORS.success },
  { value: "no", label: "Não", icon: "close", color: COLORS.danger },
  { value: "maybe", label: "Talvez", icon: "swap-horizontal", color: "#F5B84B" },
  { value: "unknown", label: "Não sei", icon: "help", color: COLORS.cyan },
];

type Phase = "welcome" | "playing" | "guess" | "result";

export default function HomeScreen() {
  const people = useMemo(
    () => peopleData.map((person) => FamousPersonSchema.parse(person)),
    [],
  );
  const questions = questionsData as Question[];
  const [phase, setPhase] = useState<Phase>("welcome");
  const [session, setSession] = useState<GameSession | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  function startGame() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSession(createGameSession(people, questions));
    setWasCorrect(null);
    setPhase("playing");
  }

  function answerQuestion(answer: PlayerAnswer) {
    if (!session || session.status !== "active") return;
    void Haptics.selectionAsync();
    const updated = answerCurrentQuestion(session, answer);
    setSession(updated);
    if (updated.status === "ready_to_guess") setPhase("guess");
  }

  function confirmGuess(correct: boolean) {
    if (!session || session.status !== "ready_to_guess") return;
    void Haptics.notificationAsync(
      correct
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    );
    setSession(finalizeGameSession(session));
    setWasCorrect(correct);
    setPhase("result");
  }

  const recommendation = session ? getRecommendedGuess(session) : null;
  const progress = session ? Math.min(session.turn / session.maxTurns, 1) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundOrb} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View style={styles.brandMark}><Text style={styles.brandLetter}>M</Text></View>
          <Text style={styles.brand}>MindGuess</Text>
          <View style={styles.localBadge}>
            <View style={styles.localDot} />
            <Text style={styles.localText}>Motor local</Text>
          </View>
        </View>

        {phase === "welcome" && (
          <View style={styles.hero}>
            <View style={styles.brainWrap}>
              <View style={styles.brainGlow} />
              <Ionicons name="sparkles" size={66} color={COLORS.cyan} />
            </View>
            <Text style={styles.eyebrow}>JOGO DE DEDUÇÃO</Text>
            <Text style={styles.title}>Pensa numa pessoa famosa.</Text>
            <Text style={styles.subtitle}>
              Responde a algumas perguntas. O motor probabilístico tenta descobrir em quem estás a pensar.
            </Text>
            <View style={styles.featureRow}>
              <Feature icon="flash-outline" label="Perguntas adaptativas" />
              <Feature icon="shield-checkmark-outline" label="Sem conta necessária" />
            </View>
            <PrimaryButton label="Começar jogo" icon="arrow-forward" onPress={startGame} />
            <Text style={styles.hint}>Protótipo inicial · 5 pessoas no dataset</Text>
          </View>
        )}

        {phase === "playing" && session?.currentQuestion && (
          <View style={styles.gameArea}>
            <View style={styles.progressHeader}>
              <Text style={styles.stepText}>PERGUNTA {session.turn + 1}</Text>
              <Text style={styles.stepText}>{Math.round(progress * 100)}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.max(progress * 100, 5)}%` }]} />
            </View>

            <View style={styles.questionCard}>
              <View style={styles.questionIcon}>
                <Ionicons name="help" size={25} color={COLORS.cyan} />
              </View>
              <Text style={styles.questionLabel}>A minha pergunta é...</Text>
              <Text style={styles.question}>{session.currentQuestion.canonicalText}</Text>
            </View>

            <Text style={styles.answerPrompt}>Escolhe a resposta mais próxima</Text>
            <View style={styles.answerGrid}>
              {ANSWERS.map((answer) => (
                <Pressable
                  key={answer.value}
                  onPress={() => answerQuestion(answer.value)}
                  style={({ pressed }) => [styles.answerButton, pressed && styles.pressed]}
                >
                  <View style={[styles.answerIcon, { backgroundColor: `${answer.color}1F` }]}>
                    <Ionicons name={answer.icon} size={23} color={answer.color} />
                  </View>
                  <Text style={styles.answerLabel}>{answer.label}</Text>
                </Pressable>
              ))}
            </View>
            <CandidatePreview session={session} />
          </View>
        )}

        {phase === "guess" && session && recommendation && (
          <View style={styles.centerStage}>
            <View style={styles.guessHalo}>
              <Ionicons name="person" size={58} color={COLORS.text} />
            </View>
            <Text style={styles.eyebrow}>TENHO UMA SUSPEITA</Text>
            <Text style={styles.guessLead}>Estás a pensar em</Text>
            <Text style={styles.guessName}>{recommendation.person.name}?</Text>
            <View style={styles.confidencePill}>
              <Ionicons name="analytics" size={17} color={COLORS.cyan} />
              <Text style={styles.confidenceText}>
                {(recommendation.probability * 100).toFixed(1)}% de confiança
              </Text>
            </View>
            <View style={styles.guessActions}>
              <PrimaryButton label="Sim, acertaste" icon="checkmark" onPress={() => confirmGuess(true)} />
              <SecondaryButton label="Não é essa pessoa" onPress={() => confirmGuess(false)} />
            </View>
          </View>
        )}

        {phase === "result" && session?.finalGuess && (
          <View style={styles.centerStage}>
            <View style={[styles.resultIcon, { backgroundColor: wasCorrect ? `${COLORS.success}22` : `${COLORS.danger}22` }]}>
              <Ionicons
                name={wasCorrect ? "trophy" : "refresh"}
                size={58}
                color={wasCorrect ? COLORS.success : COLORS.danger}
              />
            </View>
            <Text style={styles.eyebrow}>{wasCorrect ? "DEDUÇÃO CONCLUÍDA" : "AINDA ESTOU A APRENDER"}</Text>
            <Text style={styles.title}>{wasCorrect ? "Acertei!" : "Não foi desta."}</Text>
            <Text style={styles.subtitle}>
              {wasCorrect
                ? `Descobri ${session.finalGuess.person.name} em ${session.turn} perguntas.`
                : `A minha tentativa foi ${session.finalGuess.person.name}. O feedback ajudará a melhorar o dataset.`}
            </Text>
            <View style={styles.summaryCard}>
              <SummaryItem label="Perguntas" value={String(session.turn)} />
              <View style={styles.summaryDivider} />
              <SummaryItem label="Confiança" value={`${(session.finalGuess.probability * 100).toFixed(1)}%`} />
            </View>
            <PrimaryButton label="Jogar novamente" icon="refresh" onPress={startGame} />
            <SecondaryButton label="Voltar ao início" onPress={() => setPhase("welcome")} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function CandidatePreview({ session }: { session: GameSession }) {
  const top = getRecommendedGuess(session);
  return (
    <View style={styles.previewRow}>
      <Ionicons name="analytics-outline" size={18} color={COLORS.muted} />
      <Text style={styles.previewText}>Hipótese atual</Text>
      <Text style={styles.previewValue}>{(top.probability * 100).toFixed(0)}%</Text>
    </View>
  );
}

function Feature({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.feature}>
      <Ionicons name={icon} size={18} color={COLORS.cyan} />
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

function PrimaryButton({ label, icon, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
      <Text style={styles.primaryButtonText}>{label}</Text>
      <Ionicons name={icon} size={20} color="#FFFFFF" />
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return <View style={styles.summaryItem}><Text style={styles.summaryValue}>{value}</Text><Text style={styles.summaryLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  backgroundOrb: { position: "absolute", width: 320, height: 320, borderRadius: 160, backgroundColor: "#322F78", opacity: 0.28, top: -130, right: -130 },
  scrollContent: { flexGrow: 1, padding: 22, paddingBottom: 42 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 26 },
  brandMark: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary },
  brandLetter: { color: "white", fontSize: 18, fontWeight: "900" },
  brand: { color: COLORS.text, fontSize: 19, fontWeight: "800", flex: 1 },
  localBadge: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: COLORS.line, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 6 },
  localDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
  localText: { color: COLORS.muted, fontSize: 10, fontWeight: "700" },
  hero: { flex: 1, justifyContent: "center", minHeight: 620 },
  brainWrap: { width: 126, height: 126, borderRadius: 63, alignSelf: "center", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(73,216,232,.28)", marginBottom: 30 },
  brainGlow: { position: "absolute", width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.primary, opacity: 0.3 },
  eyebrow: { color: COLORS.cyan, fontSize: 11, letterSpacing: 2.2, fontWeight: "800", textAlign: "center", marginBottom: 12 },
  title: { color: COLORS.text, fontSize: 38, lineHeight: 43, fontWeight: "900", letterSpacing: -1.3, textAlign: "center" },
  subtitle: { color: COLORS.muted, fontSize: 16, lineHeight: 24, textAlign: "center", marginTop: 16, marginHorizontal: 6 },
  featureRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, marginVertical: 28 },
  feature: { flexDirection: "row", alignItems: "center", gap: 7, borderWidth: 1, borderColor: COLORS.line, backgroundColor: "rgba(255,255,255,.025)", borderRadius: 99, paddingHorizontal: 12, paddingVertical: 8 },
  featureText: { color: COLORS.muted, fontSize: 12, fontWeight: "600" },
  primaryButton: { minHeight: 58, borderRadius: 18, paddingHorizontal: 22, backgroundColor: COLORS.primary, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, shadowColor: COLORS.primary, shadowOpacity: .35, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  primaryButtonText: { color: "white", fontSize: 16, fontWeight: "800" },
  secondaryButton: { minHeight: 54, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.line, marginTop: 12 },
  secondaryButtonText: { color: COLORS.text, fontSize: 15, fontWeight: "700" },
  pressed: { opacity: .72, transform: [{ scale: .985 }] },
  hint: { textAlign: "center", color: COLORS.muted, fontSize: 11, marginTop: 18 },
  gameArea: { flex: 1 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  stepText: { color: COLORS.muted, fontSize: 10, letterSpacing: 1.4, fontWeight: "800" },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: COLORS.surfaceLight, overflow: "hidden", marginTop: 10, marginBottom: 36 },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: COLORS.cyan },
  questionCard: { minHeight: 290, borderWidth: 1, borderColor: COLORS.line, borderRadius: 28, backgroundColor: COLORS.surface, padding: 26, alignItems: "center", justifyContent: "center" },
  questionIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: "rgba(73,216,232,.10)", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  questionLabel: { color: COLORS.muted, fontSize: 12, fontWeight: "700", marginBottom: 12 },
  question: { color: COLORS.text, fontSize: 27, lineHeight: 35, fontWeight: "800", textAlign: "center", letterSpacing: -.5 },
  answerPrompt: { color: COLORS.muted, fontSize: 12, fontWeight: "700", textAlign: "center", marginVertical: 18 },
  answerGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  answerButton: { width: "48.4%", minHeight: 72, borderRadius: 18, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.surface, flexDirection: "row", alignItems: "center", padding: 13, gap: 10 },
  answerIcon: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  answerLabel: { color: COLORS.text, fontSize: 14, fontWeight: "800" },
  previewRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 20, paddingTop: 17, borderTopWidth: 1, borderTopColor: COLORS.line },
  previewText: { color: COLORS.muted, fontSize: 12, flex: 1 },
  previewValue: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  centerStage: { flex: 1, minHeight: 650, justifyContent: "center", alignItems: "stretch" },
  guessHalo: { width: 116, height: 116, borderRadius: 58, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary, marginBottom: 28, shadowColor: COLORS.primary, shadowOpacity: .45, shadowRadius: 30 },
  guessLead: { color: COLORS.muted, textAlign: "center", fontSize: 16 },
  guessName: { color: COLORS.text, fontSize: 38, lineHeight: 44, fontWeight: "900", textAlign: "center", marginTop: 6 },
  confidencePill: { alignSelf: "center", flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: COLORS.surface, borderRadius: 99, paddingHorizontal: 14, paddingVertical: 9, marginTop: 20, borderWidth: 1, borderColor: COLORS.line },
  confidenceText: { color: COLORS.cyan, fontSize: 12, fontWeight: "800" },
  guessActions: { marginTop: 34 },
  resultIcon: { width: 116, height: 116, borderRadius: 58, alignSelf: "center", alignItems: "center", justifyContent: "center", marginBottom: 28 },
  summaryCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line, padding: 18, marginVertical: 28 },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryValue: { color: COLORS.text, fontSize: 23, fontWeight: "900" },
  summaryLabel: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
  summaryDivider: { height: 38, width: 1, backgroundColor: COLORS.line },
});
