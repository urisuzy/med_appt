# StayHealthy — Medical Appointment Booking (Front End)

StayHealthy is the front-end of a fictitious non-profit healthcare platform that helps
patients in remote and underserved areas book appointments with doctors online.

This repository contains the complete capstone project for the **IBM Front-End Development
Professional Certificate**:

- responsive marketing site and application shell
- Figma-style design references in `screenshots/`
- React components for sign up, login, appointment booking, reviews and profile
- SEO meta tags, production build output, and the cURL transcripts of the
  registration and login API calls

## Tech stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| UI         | React 18 + Vite                          |
| Routing    | React Router (HashRouter for Pages)      |
| HTTP       | axios                                    |
| Styling    | plain CSS with a small design-token layer |
| Deployment | GitHub Pages (`docs/` branch folder)     |

## Project structure

```
stayhealthy/
├── index.html                  # shell + SEO meta tags (description, keywords, Open Graph)
├── src/
│   ├── App.jsx                 # routes + application-wide <Notification />
│   ├── api.js                  # axios instance and session helpers
│   ├── App.css                 # design tokens, layout and components
│   ├── data/doctors.js         # demo doctor catalogue and time slots
│   └── components/
│       ├── Navbar.jsx          # navigation + logout
│       ├── LandingPage.jsx     # hero, tagline and feature grid
│       ├── Sign_Up.jsx         # registration form -> POST /api/auth/register
│       ├── Login.jsx           # login form -> POST /api/auth/login
│       ├── FindDoctorSearch.jsx# speciality / location search
│       ├── AppointmentForm.jsx # Name, Phone, Date, Time
│       ├── AppointmentFormIC.jsx # instant consultation: Name + Phone only
│       ├── DoctorCard.jsx      # doctor summary + cancel appointment
│       ├── GiveReviews.jsx     # review form, disabled after submitting
│       ├── ProfileCard.jsx     # profile card + edit form
│       ├── Notification.jsx    # appointment reminder on every page
│       └── Profile.jsx / NotFound.jsx
├── screenshots/                # design and product screenshots (.png)
├── docs/                       # production build served by GitHub Pages
└── artefacts/
    ├── build                   # terminal output of `npm run build`
    ├── register                # cURL request/response for POST /api/auth/register
    └── login                   # cURL request/response for POST /api/auth/login
```

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

Set the API endpoint if you run your own backend:

```bash
VITE_API_BASE_URL=http://localhost:5000 npm run dev
```

The demo build falls back to browser storage when the API cannot be reached, so the
sign up, login, booking and review flows are all exercisable offline.

## Production build

```bash
npm run build        # writes the bundle to ./server/build
npm run deploy       # copies server/build to ./docs (served by GitHub Pages)
npm run preview      # serves the last build locally
```

The build transcript is stored in `artefacts/build`. The production bundle is
committed twice: `server/build/` (the build folder required by the capstone
checklist) and `docs/` (the folder GitHub Pages publishes).

## Deployment

The site is published with GitHub Pages from the `docs/` folder of the `main`
branch:

**https://urisuzy.github.io/med_appt/**

Routing uses `HashRouter`, so deep links such as `/#/appointments` work without
any server-side rewrite rules.

## API contract

```http
POST /api/auth/register
{ "role": "patient", "name": "Reza Maulana", "email": "reza@example.com",
  "phone": "9876543210", "password": "secret123" }

200 OK
{ "message": "User registered successfully", "token": "..." }
```

```http
POST /api/auth/login
{ "email": "reza@example.com", "password": "secret123" }

200 OK
{ "message": "Login successful", "token": "..." }
```

Both transcripts, including the request headers and the JSON response, live in
`artefacts/register` and `artefacts/login`.

## Accessibility and responsive design

- semantic landmarks (`header`, `main`, `footer`, `nav`), labelled form fields
- visible focus rings and a 4.5:1 minimum text contrast
- layouts reflow at 900 px and 640 px, with a single-column booking grid on phones
- the notification bar uses `role="status"` so it is announced without stealing focus

## License

Educational project created for the IBM Front-End Development Capstone.
