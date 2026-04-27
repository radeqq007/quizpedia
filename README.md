# Quizpedia

[![Website](https://img.shields.io/badge/Quizpedia-Visit-blue)](https://quizpedia.pages.dev)
![License](https://img.shields.io/github/license/radeqq007/quizpedia)
![Last commit](https://img.shields.io/github/last-commit/radeqq007/quizpedia)
[![Build](https://github.com/radeqq007/quizpedia/actions/workflows/build.yml/badge.svg)](https://github.com/radeqq007/quizpedia/actions/workflows/build.yml)
[![Lint](https://github.com/radeqq007/quizpedia/actions/workflows/lint.yml/badge.svg)](https://github.com/radeqq007/quizpedia/actions/workflows/lint.yml)


Generate a quiz on any topic in seconds. Search any Wikipedia article and Quizpedia instantly creates a quiz for you.

Quiz generation is powered by the `Llama 3.1 instant` LLM model. Backend code is available at [radeqq007/quizpedia-backend](https://github.com/radeqq007/quizpedia-backend).

> [!NOTE]
> The quiz quality varies on the language.
> Quizzes in English are the most accurate.

## Tech Stack
- React
- Typescript
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query
- Motion
- Cloudflare Pages
- Cloudflare Workers ([backend](https://github.com/radeqq007/quizpedia-backend))
- Groq API ([backend](https://github.com/radeqq007/quizpedia-backend))
- Wikipedia API
- html-to-image
