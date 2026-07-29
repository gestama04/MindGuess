import assert from "node:assert/strict";
import test from "node:test";
import { questions } from "@mindguess/game-data";
import { isQuestionAvailable } from "../dist/index.js";

function loadQuestions() {
  return questions;
}

test("as áreas públicas principais partilham um grupo exclusivo", async () => {
  const questions = loadQuestions();
  const areaQuestions = questions.filter((question) =>
    question.id.startsWith("public-area-"),
  );

  assert.deepEqual(
    areaQuestions.map((question) => question.id).sort(),
    ["public-area-literature", "public-area-music", "public-area-sports"],
  );
  assert.ok(
    areaQuestions.every(
      (question) => question.exclusiveGroup === "primaryPublicArea",
    ),
  );
});

test("desporto afirmativo bloqueia música e literatura", async () => {
  const questions = loadQuestions();
  const sports = questions.find((question) => question.id === "public-area-sports");
  const music = questions.find((question) => question.id === "public-area-music");
  const literature = questions.find((question) => question.id === "public-area-literature");
  const resolved = new Set(["primaryPublicArea"]);
  const asked = new Set([sports.id]);

  assert.equal(isQuestionAvailable(music, asked, resolved), false);
  assert.equal(isQuestionAvailable(literature, asked, resolved), false);
});

test("literatura afirmativa bloqueia música e desporto", async () => {
  const questions = loadQuestions();
  const literature = questions.find((question) => question.id === "public-area-literature");
  const music = questions.find((question) => question.id === "public-area-music");
  const sports = questions.find((question) => question.id === "public-area-sports");
  const resolved = new Set(["primaryPublicArea"]);
  const asked = new Set([literature.id]);

  assert.equal(isQuestionAvailable(music, asked, resolved), false);
  assert.equal(isQuestionAvailable(sports, asked, resolved), false);
});

test("uma resposta negativa mantém outras áreas disponíveis", async () => {
  const questions = loadQuestions();
  const sports = questions.find((question) => question.id === "public-area-sports");
  const music = questions.find((question) => question.id === "public-area-music");

  assert.equal(isQuestionAvailable(music, new Set([sports.id]), new Set()), true);
});
