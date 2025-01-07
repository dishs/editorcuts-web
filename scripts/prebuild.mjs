import import_articles from './import_articles.mjs'

async function prebuild() {
  await import_articles()
}

prebuild()
