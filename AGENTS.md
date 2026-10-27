# AI coding instructions

- Keep the frontend in `apps/web` using Next.js App Router, React and TypeScript.
- Keep API/business data endpoints in `apps/api` using NestJS and TypeScript.
- Do not duplicate the source of truth for plan data in the frontend; fetch it from NestJS.
- Preserve all values and semantics from the challenge. In particular, `-1` means unlimited and `null` means the benefit is not included.
- Keep the comparison accessible, responsive, and clear to non-technical users.
- Derive best-value labels from data wherever practical. The recommendation must be described as qualitative unless a transparent value-for-money formula is implemented.
- Do not claim that deployment, tests, or builds succeeded unless they were actually run and verified.
