# Angular Signal Forms Demo

This shows Angular v21's new signal-based forms.

## About

This app shows how to use Angular signals for forms. It has validation, error messages, and user feedback all with signals, no reactive forms needed.

## What it does

It uses only signal forms, no reactive forms. It shows validation errors as flyouts next to inputs. It shows success modals. It uses Angular v21 features.

## How to run

```bash
# Get dependencies
pnpm install

# Start dev server
pnpm start

# Build for production
pnpm build

# Run tests
pnpm test
```

## Tech

- Angular v21.0.0-next.5 (experimental)
- Signal Forms API
- Tailwind CSS v4 (because I never learned CSS/SCSS, and never will)
- Jest for tests
- Vite build
