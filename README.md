# WW MOVIE COLLECTION — Worldwide Movie Box Office & Entertainment Tracking Platform

A modern, responsive, data-driven entertainment intelligence platform built for tracking worldwide movie box-office collections, exploring multi-industry theatrical performances, and following developments in global cinema.

---

## 🌟 Key Features

### 1. 🌐 Worldwide Box Office Tracking
- **Multi-Currency Toggle**: Instant 1-click real-time conversion between **USD ($ Millions / Billions)**, **INR (₹ Crores)**, and **EUR (€)** across all graphs, metric tables, movie profiles, and leaderboards.
- **Comprehensive Theatrical Metrics**: Worldwide Gross, Domestic Gross, Overseas Gross, Opening-Day collection, Opening-Weekend collection, and Lifetime Theatrical Multipliers.
- **Territory-Wise Breakdown**: Detailed state, circuit, and country-level collections (e.g. North America, India circuits [Hindi Belt, AP/TG, Tamil Nadu, Kerala, Karnataka], East Asia, Europe, and Gulf/Middle East).
- **Financials & Profitability Analysis**: Production budget, Marketing, Theatrical distributor share, breakeven thresholds, Net ROI %, and official trade verdicts (*All-Time Blockbuster, Blockbuster, Super Hit, Hit, Average, Flop*).

### 2. 🎬 Movie Database & Explorer
- **Deep Multi-Faceted Filtering**:
  - **Film Industry**: Hollywood, Bollywood, Tollywood, Kollywood, Mollywood, Sandalwood, Korean Cinema (Hallyu), and International.
  - **Genre**: Action, Sci-Fi, Drama, Thriller, Comedy, Horror, Animation, Adventure, Fantasy, Mythology.
  - **Release Year**: Historical to current releases.
  - **Trade Verdict**: Blockbuster classifications.
- **Dual View Modes**:
  - **Rich Poster Card Grid**: Visual cards with domestic/overseas progress bars, release year, and verdict badges.
  - **Statistical Trade Table**: High-density financial data table modeled after Box Office Mojo and Sacnilk.
- **Data Export**: 1-click download of filtered or full box-office datasets as **CSV** or **JSON**.

### 3. 🏆 Record Books & All-Time Leaderboards
- **Worldwide All-Time Top Grossers** (Avatar, Avengers: Endgame, Titanic, Inside Out 2, etc.)
- **Indian Cinema All-Time Standings** (Dangal, Baahubali 2, RRR, KGF 2, Kalki 2898 AD, Jawan, Pathaan, etc.)
- **Industry Champions**: Dedicated rankings for Hollywood, Bollywood, Tollywood, Kollywood, Mollywood, Sandalwood, and Korean Cinema.
- **Highest Opening Day Collections** All-Time.
- **Highest Opening Weekend Records**.
- **Highest ROI & Budget Multipliers** (e.g., Kantara 32.9x, Manjummel Boys 16.15x, Stree 2 546% ROI).
- **Year-wise Standings** (2024, 2023, 2022, etc.) with gold/silver/bronze podium displays.

### 4. ⚔️ The Box Office Arena (Multi-Movie Comparison Tool)
- Head-to-head comparison of **up to 4 movies simultaneously**.
- **Interactive Overlay Trajectory Curves**: Compare day-by-day or weekend-by-weekend cumulative box office growth on a single Recharts line graph.
- **Domestic vs Overseas Revenue Bar Charts**.
- **Side-by-Side Metric Matrix**: Compare opening day, weekend, budget, ROI, and verdict across selected films.

### 5. 📊 Box Office Analytics & Visual Insights
- **Market Share Donut Chart**: Worldwide market share breakdown across Hollywood, Bollywood, Tollywood, Kollywood, Mollywood, Korean, and International cinema.
- **Opening Day vs Lifetime Multiplier Matrix**: Scatter chart illustrating word-of-mouth endurance and theatrical longevity.
- **Year-over-Year (YoY) Global Trends**: Theatrical recovery metrics, global admissions, and industry growth rates.

### 6. 📰 News Desk & Theatrical Release Calendar
- **Trade Dispatches & Milestones**: Filterable reports covering box-office records, weekend analyses, and industry trends.
- **Theatrical Release Radar**: Anticipated tentpoles (Pushpa 2, Avatar 3, War 2, Kantara Prequel, Superman DCU) with target screens, budget estimates, advance booking buzz scores, and Day 1 forecasts.

### 7. 🔖 User Watchlist & Instant Search
- **Instant Search (`Ctrl + K` / `⌘K`)**: Live search across titles, directors, actors, and industries.
- **Browser-Persisted Watchlist**: Track custom portfolios of films with aggregated box office totals and average ratings.
- **1-Click Share**: Copy formatted box office dossier summaries for social sharing.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom cinema dark palette
- **Interactive Visualizations**: Recharts (Area charts, Line overlays, Bar charts, Donut charts, Scatter plots)
- **Icons**: Lucide React
- **Typography**: Cinzel (Editorial Serif), Plus Jakarta Sans (UI Sans), JetBrains Mono (Financials & Numbers)
- **Testing & Verification**: Playwright MCP

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
