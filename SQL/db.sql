CREATE TABLE "Teams" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "local" bool
);

CREATE TABLE "Players" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "number" int,
  "name" varchar,
  "titular" bool,
  "idTeam" int
);

CREATE TABLE "PlayerTarget" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "idPlayer" int,
  "idTarget" int,
  "idMatch" int
);

CREATE TABLE "Targets" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "Matchs" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "date" datetime,
  "location" varchar,
  "minutes" int
);

CREATE TABLE "MatchTeams" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "score" int,
  "idTeam" int,
  "idMatch" int
);

ALTER TABLE "Players" ADD FOREIGN KEY ("idTeam") REFERENCES "Teams" ("id");

ALTER TABLE "PlayerTarget" ADD FOREIGN KEY ("idPlayer") REFERENCES "Players" ("id");

ALTER TABLE "PlayerTarget" ADD FOREIGN KEY ("idTarget") REFERENCES "Targets" ("id");

ALTER TABLE "PlayerTarget" ADD FOREIGN KEY ("idMatch") REFERENCES "Matchs" ("id");

ALTER TABLE "MatchTeams" ADD FOREIGN KEY ("idTeam") REFERENCES "Teams" ("id");

ALTER TABLE "MatchTeams" ADD FOREIGN KEY ("idMatch") REFERENCES "Matchs" ("id");
