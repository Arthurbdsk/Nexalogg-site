# Website languages

Portuguese is the default. The header selector stores `pt`, `en` or `es` in the
`nexallog-locale` cookie for one year. The server action validates the choice and
Next.js refreshes the current route while preserving client state. `next-intl`
provides the same request locale and messages to server and client components.
No external translation service or browser extension is required.

Components use `useCopy()` (or `await getCopy()` in async server components).
The source text remains Portuguese; matching entries in `messages/pt.json`,
`en.json` and `es.json` share a stable key. Use `{name}` placeholders with a
values object for dynamic text. Do not concatenate already-interpolated text.
`Copy` supports rich legal content declared outside a component.

When adding or changing copy, update all three catalogs. Run `npm run check:i18n`,
`npm run typecheck` and `npm run build`. Dates follow the selected locale.
Original logos, product screenshots and the approved 12-page D90 document remain
unchanged in Portuguese, including all figures. Page URLs also remain unchanged.

Verify the selector, navigation, form errors and carousel at 320px and desktop
widths when adding longer translations. Ensure images remain fully visible and
controls remain usable with keyboard and touch.
