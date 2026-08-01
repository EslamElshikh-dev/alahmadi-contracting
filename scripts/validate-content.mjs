import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

function loadDataModule(file) {
  const source = fs.readFileSync(path.resolve(file), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  const moduleRecord = { exports };
  const execute = new Function("exports", "module", "require", output);
  execute(exports, moduleRecord, () => ({}));
  return moduleRecord.exports;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function unique(values) {
  return new Set(values).size === values.length;
}

const { services } = loadDataModule("app/lib/services.ts");
const { articles } = loadDataModule("app/lib/articles.ts");
const { allNeighborhoods, featuredNeighborhoods } = loadDataModule("app/lib/site.ts");

assert(services.length === 11, `Expected 11 services, found ${services.length}`);
assert(unique(services.map((service) => service.slug)), "Service slugs must be unique");
for (const service of services) {
  assert([...service.description].length > 300, `${service.slug} description must exceed 300 characters`);
  assert(service.faq.length === 6, `${service.slug} must contain exactly 6 FAQs`);
  assert(service.steps.length >= 4, `${service.slug} needs at least 4 process steps`);
  assert(service.qualityPoints.length >= 5, `${service.slug} needs at least 5 quality points`);
}

assert(articles.length === 10, `Expected exactly 10 published articles, found ${articles.length}`);
assert(unique(articles.map((article) => article.slug)), "Article slugs must be unique");
for (const article of articles) {
  assert(article.sections.length >= 5, `${article.slug} needs at least 5 sections`);
  assert(article.faq.length === 6, `${article.slug} must contain exactly 6 FAQs`);
  const body = [
    ...article.intro,
    ...article.sections.flatMap((section) => [...section.paragraphs, ...(section.points ?? [])]),
    ...article.faq.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  assert([...body].length >= 2400, `${article.slug} is too short for a professional guide`);
}

assert(allNeighborhoods.length >= 60, "Riyadh coverage should contain at least 60 unique neighborhood names");
assert(featuredNeighborhoods.slice(0, 5).join("|") === "حطين|الملقا|النرجس|الياسمين|العقيق", "Featured Riyadh neighborhoods are not in the requested order");

console.log(JSON.stringify({
  services: services.length,
  minimumServiceDescriptionCharacters: Math.min(...services.map((service) => [...service.description].length)),
  publishedArticles: articles.length,
  minimumArticleCharacters: Math.min(...articles.map((article) => [
    ...article.intro,
    ...article.sections.flatMap((section) => [...section.paragraphs, ...(section.points ?? [])]),
  ].join(" ").length)),
  serviceFaqs: services.reduce((total, service) => total + service.faq.length, 0),
  articleFaqs: articles.reduce((total, article) => total + article.faq.length, 0),
  uniqueNeighborhoods: allNeighborhoods.length,
}, null, 2));
