import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const username = process.env.GITHUB_USERNAME || "satya00089";
const query = `query { user(login: "${username}") { contributionsCollection { contributionCalendar(includePrivateContributions: true) { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;
const payload = JSON.parse(execFileSync("gh", ["api", "graphql", "-f", `query=${query}`], { encoding: "utf8" }));
if (payload.errors?.length) throw new Error(payload.errors.map((error) => error.message).join("; "));

const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar?.weeks?.length) throw new Error(`No contribution calendar found for ${username}`);

const levelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};
const days = calendar.weeks.flatMap((week) => week.contributionDays);
const snapshot = {
  username,
  total: calendar.totalContributions,
  start: days[0].date,
  counts: days.map((day) => day.contributionCount),
  levels: days.map((day) => {
    const level = levelMap[day.contributionLevel];
    if (level === undefined) throw new Error(`Unknown contribution level: ${day.contributionLevel}`);
    return level;
  }).join(""),
};

await mkdir(new URL("../data/", import.meta.url), { recursive: true });
await writeFile(new URL("../data/github.json", import.meta.url), `${JSON.stringify(snapshot)}\n`);
console.log(`Saved ${days.length} contribution days for ${username} (${calendar.totalContributions} total).`);
