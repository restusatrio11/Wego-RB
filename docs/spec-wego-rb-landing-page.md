## Problem Statement

Insan Badan Pusat Statistik (BPS) se-Sumatera Utara (baik di tingkat provinsi maupun 33 kabupaten/kota) memiliki banyak inovasi dan inisiatif Reformasi Birokrasi (RB), namun selama ini tersebar secara terfragmentasi dan belum memiliki wadah terpusat untuk membagikan praktik baik, rekaman seminar, serta template kerja terstandar. Di sisi lain, website dan portal publikasi internal pemerintah seringkali memiliki desain birokratis yang kaku, padat teks tanpa kurasi editorial, atau sebaliknya terjebak dalam gaya tren yang tidak ramah pengguna (seperti neo-brutalisme kasar atau tipografi generik). Selain itu, tim inovasi membutuhkan sistem pengelolaan konten publikasi yang mudah diisi oleh admin non-developer tanpa perlu menyewa database berbayar, mengelola backend kompleks, atau memasang API key yang rentan bocor.

## Solution

Membangun landing page resmi program **Wego** (Wadah Edukasi dan Gagasan Optimal) BPS Provinsi Sumatera Utara berbasis React + Vite + Tailwind CSS yang mengadopsi estetika editorial modern 1:1 dengan standar visual acuan *ilovecreatives.com*. Landing page ini memiliki tipografi high-contrast Didone (`Bodoni Moda`) untuk wordmark brand raksasa *all-lowercase* `wegoberbagi`, perpaduan hybrid serif kondensed (`Instrument Serif`) dan sans-serif netral (`Inter`), tata letak kartu berproporsi luas (*expansive full-width*), ketiadaan elemen grafis *AI-slop*/emotikon berwarna, dan integrasi CMS zero-backend langsung membaca Google Sheets publik melalui format JSON GViz serta konverter link Google Drive otomatis.

## User Stories

1. As an insan statistik BPS, I want to view a large, immersive hero cover with the official wordmark "wegoberbagi", so that I immediately recognize the prestigious and modern editorial identity of the Wego program.
2. As a visitor from a kabupaten/kota satker, I want to see the official full program title "Wadah Edukasi dan Gagasan Optimal • BPS Sumatera Utara", so that I understand the institutional mission and authority behind the initiative.
3. As a reader browsing the homepage, I want to read an expansive statement headline mixing modern grotesque sans-serif with delicate photo stickers and pill badges, so that I grasp the ethos of collaborative knowledge-sharing in an engaging visual rhythm.
4. As a user reading the headline, I want the second half of the statement to smoothly transition into elegant display serif typography, so that the reading experience feels refined and high-fashion rather than corporate.
5. As an insan statistik, I want to click an inline micro-link next to the statement headline, so that I am navigated smoothly down to the seminar catalog.
6. As a participant looking for role models, I want to see a 4-column portrait grid of Wegoers (narasumber profiles), so that I can learn who is leading innovation sessions and from which satker they originate.
7. As a mobile user, I want the speaker portrait grid to collapse gracefully into 2 columns with touch-friendly spacing, so that browsing on smartphones remains effortless.
8. As a website visitor, I want speaker photos to display in subtle monochrome and transition smoothly to full color on hover, so that the interface feels interactive and premium.
9. As an pegawai BPS seeking knowledge, I want to browse wide, generous seminar catalog cards (2 per row), so that I can view episode titles, comprehensive summaries, and video thumbnails clearly.
10. As a learner who missed a live session, I want a dedicated pill button on each seminar card to watch the video recording, so that I can access past sessions on-demand.
11. As a presenter preparing a report, I want a pill button on each seminar card to download the original slide presentation, so that I can study the data methodology offline.
12. As a visitor browsing midway down the page, I want to encounter a vibrant gradient feature banner, so that I feel inspired to participate in reforming bureaucracy through digital transformation.
13. As an innovator with a new idea, I want to click the call-to-action button on the banner, so that the submission modal opens immediately.
14. As an operational officer, I want to access a 3-column grid of downloadable templates (Pojok Unduhan), so that I can download slide decks, automation Python scripts, and ZI evaluation spreadsheets.
15. As a developer or data scientist in a satker, I want each template card to show its format tag (e.g., PPTX, Python, Excel) and availability status, so that I can immediately identify applicable tools.
16. As an active community member, I want to view the Community Board (Papan Gagasan Bersama) containing index cards from different kabupaten/kota, so that I can see what collaborative topics colleagues are discussing.
17. As an aspirational speaker, I want to submit a session proposal through the "Pasang Usulan Anda" button, so that the Innovation Team can consider scheduling my topic.
18. As an pegawai from a remote satker, I want to see regional innovation showcases (Inspirasi & Rujukan), so that regional digital products like Satu Data Sumut and Inflation Dashboards gain statewide visibility.
19. As a visual browser, I want to see a smooth scrolling marquee ticker displaying program milestones, so that the site conveys an active, living ecosystem.
20. As a social media follower, I want to see an 8-column documentation grid linking to @bpsprovsumut, so that I can see real photos of BPS activities across Sumatera Utara.
21. As a subscriber, I want to enter my email into the dark-themed footer newsletter form, so that I receive weekly updates on upcoming Wego sessions.
22. As an administrator managing content, I want all speaker profiles, seminar episodes, and downloadable assets to be populated directly from a Google Sheet, so that I do not need to edit code to update the website.
23. As a content manager, I want to paste raw Google Drive sharing URLs for image thumbnails, so that the website automatically transforms them into high-speed CDN thumbnails without manual export.
24. As a site operator, I want the landing page to fall back seamlessly to bundled local data if the Google Sheet is unreachable or network is offline, so that visitors never encounter a broken or blank page.
25. As an applicant, I want the submission modal to provide quick category selection (Topic Suggestion, Speaker Registration, RB Corner), so that my submission is properly classified.
26. As a user submitting a form, I want clear visual confirmation after submitting, so that I know my idea has been recorded.
27. As a mobile visitor, I want a sticky top navigation bar with quick links to section anchors, so that I can jump to any part of the page in one tap.
28. As a performance-conscious visitor, I want the entire web application to load in under 2 seconds, so that data bandwidth on cellular networks is conserved.
29. As a screen reader user, I want semantic HTML landmarks and ARIA navigation labels across all interactive cards, so that the page is accessible.

## Implementation Decisions

1. **Architecture & Bundling**:
   - Built as a single-page application using React 18, Vite 6, and Tailwind CSS 3.
   - Output configured with relative asset URLs (`base: './'`) to enable zero-configuration hosting on GitHub Pages.
   - Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) on push to `main`.

2. **Typography System (ADR 0001 & ADR 0002)**:
   - **Hero Wordmark & Social Title**: *Bodoni Moda* (Google Fonts) with optical size `opsz: 96`, weight `wght: 800`, letter-spacing `-0.05em`, all-lowercase (`wegoberbagi` and `@bpsprovsumut`).
   - **Hybrid Editorial Display**: *Instrument Serif* (Google Fonts) with tight negative tracking (`-0.04em`) for category kickers, second-half statement transitions, and editorial subtitles.
   - **Body & UI Controls**: *Inter* (Google Fonts) for high-clarity neo-grotesk text across labels, metadata, buttons, forms, and cards.
   - **Absolute ban on generic emojis / AI-slop**: Exclusively monochrome SVG symbols (`✹`, `↗`, `•`) and refined typography.

3. **Hybrid Section Title Pattern**:
   - Every major content section follows a strict two-line structure:
     - Top line: Category kicker in small italic serif (`font-display italic text-sm text-neutral-500 mb-1`).
     - Bottom line: Mixed headline featuring primary words in sans/serif, key phrases enclosed in rounded border pills (`small-pill font-sans font-bold`), and inline monochrome SVGs.

4. **Zero-Backend CMS via Google Sheets GViz**:
   - Consumes public Google Sheets using the endpoint:
     `https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:json`
   - Bypasses API key requirements, OAuth scopes, and quotas.
   - Encapsulated within the custom hook `useWegoData(sheetId)` in `src/services/dataService.js`.

5. **Google Drive Asset URL Normalizer**:
   - Regex-based URL transformer that extracts file IDs from various Google Drive sharing links (`/file/d/{id}`, `id={id}`, `/d/{id}`) and outputs direct CDN thumbnails:
     `https://drive.google.com/thumbnail?id={id}&sz=w1200`
   - Eliminates 403 Forbidden hotlinking blocks and rate limits.

6. **Component Modularity**:
   - Root application in `src/App.jsx`.
   - Distinct, decoupled components in `src/components/`: `Navbar`, `HeroCover`, `HeadlineStatement`, `SpeakerProfiles`, `SeminarCatalog`, `MidBanner`, `DownloadableTemplates`, `CommunityBoard`, `RegionalInnovations`, `SocialGallery`, `Footer`, `SubmissionModal`.

## Testing Decisions

A good test verifies observable external behavior and contracts rather than internal implementation details or CSS utility class strings.

1. **Testing Seam: Highest Component Boundary (`<App />`)**:
   - Tests execute against the top-level application root using React Testing Library and Vitest/Jest.
   - Verifies that all 10 core sections render with correct semantic landmarks (`nav`, `main`, `section`, `footer`).
   - Verifies fallback rendering when no external Google Sheet ID is supplied.

2. **Testing Seam: Data Transformation Contract (`convertDriveUrl`)**:
   - Unit tests against `src/services/dataService.js` testing input variations (standard sharing link, export link, thumbnail link, null/undefined, non-Drive URL) against expected CDN URL output.

3. **Testing Seam: User Interaction Flows**:
   - Modal lifecycle: Clicking CTA buttons opens the modal; filling inputs and clicking submit displays success feedback and closes smoothly.
   - Anchor links: Navigation links correspond to valid section `id` attributes.

## Out of Scope

- User authentication / login (all content is openly accessible to BPS staff without credentials).
- E-commerce payment gateways (all templates and materials are distributed freely for internal civil servant enablement).
- Video hosting infrastructure (videos are hosted externally on YouTube or Google Drive; Wego-RB only links to them).
- Complex database migrations or relational ORMs (content management relies entirely on Google Sheets).

## Further Notes

- The project repository is located at `https://github.com/restusatrio11/Wego-RB.git`.
- CSV seed templates for the Google Sheets CMS are maintained under `docs/sheets-template/` (`Seminars.csv`, `Speakers.csv`, `SiteSettings.csv`, and `SETUP-GUIDE.md`).
- A single-file portable prototype is maintained in `prototype.html` for offline previewing.
