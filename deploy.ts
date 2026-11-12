// Zet de site online zonder GitHub Actions: bouwt dist/ en zet die als branch gh-pages op GitHub.
// GitHub Pages staat op "Deploy from a branch: gh-pages / (root)".
import { $ } from 'bun';

await $`bun run build`;
const remote = (await $`git remote get-url origin`.text()).trim();
const commit = (await $`git rev-parse --short HEAD`.text()).trim();

await $`rm -f dist/artifact.html && touch dist/.nojekyll`;
await $`git init -q -b gh-pages && git add -A && git commit -q -m ${`Site gebouwd uit ${commit}`}`.cwd('dist');
await $`git push -qf ${remote} gh-pages`.cwd('dist');
await $`rm -rf dist/.git`;
console.log(`Online: gh-pages bijgewerkt naar ${commit}`);
