// English content. This file defines the content schema (Dict) that ur.ts mirrors.
// All return figures are illustrative; disclaimers are part of the content itself.

export const en = {
  meta: {
    title: "MalkiatX — Halal wealth, built on real assets",
    description:
      "Shariah-compliant fractional ownership of property, gold, sukuk and screened equities for Pakistan. Start with PKR 5,000, pay with JazzCash or Easypaisa, and let Auto-Pilot grow your wealth.",
  },

  nav: {
    home: "Home",
    learn: "Why Passive",
    journey: "Your Journey",
    assets: "Assets",
    trust: "Trust Center",
    download: "Get the App",
  },

  common: {
    brand: "MalkiatX",
    startCta: "Start with PKR 5,000",
    exploreCta: "Explore the assets",
    downloadApp: "Get the App",
    learnMore: "Learn more",
    comingSoon: "Coming soon",
    appStore: "App Store",
    playStore: "Google Play",
    illustrative: "Illustrative only — profit rates are not guaranteed and values can fall as well as rise.",
    perYear: "illustrative profit / year",
    tiers: {
      cautious: {
        name: "Cautious",
        desc: "Capital protection first. Heavy in gold and sukuk, a measured slice of property, minimal equities.",
      },
      balanced: {
        name: "Balanced",
        desc: "The all-weather default. Rent, gold and sukuk profit doing steady work, with equities for growth.",
      },
      growth: {
        name: "Growth",
        desc: "For long horizons. More equities and property, accepting bigger swings for bigger compounding.",
      },
    },
    assets: {
      property: { name: "Property", short: "Rental income from tokenized real estate" },
      gold: { name: "Gold", short: "Vaulted 24K gold, owned in grams" },
      sukuk: { name: "Sukuk", short: "Asset-backed Islamic certificates" },
      equities: { name: "Equities", short: "Shariah-screened Pakistani stocks" },
    },
  },

  home: {
    eyebrow: "Shariah-first investing for Pakistan",
    h1a: "Own the real economy.",
    h1b: "The halal way.",
    sub: "MalkiatX turns property, gold, sukuk and screened equities into fractional, Shariah-compliant digital ownership — so your money grows passively in real assets, starting from PKR 5,000.",
    badges: ["Shariah Supervisory Board", "PVARA-aligned", "JazzCash & Easypaisa", "From PKR 5,000"],
    streamCaption: "The passive journey: monthly amounts become asset-backed tokens on the Silsila ledger — flowing into four real asset classes, compounding.",
    stats: [
      { v: "PKR 5,000", l: "minimum to start owning real assets" },
      { v: "4", l: "Shariah-screened asset classes in one portfolio" },
      { v: "0", l: "interest — profit comes from rent, trade and real growth" },
      { v: "2 min", l: "to open your account with just your CNIC" },
    ],
    assetsTitle: "Four halal engines. One portfolio.",
    assetsSub: "Auto-Pilot spreads every rupee across four asset classes, each screened and certified by our Shariah board.",
    assetCardCta: "Deep dive",
    how: {
      title: "Passive by design",
      sub: "Three steps, once. Then MalkiatX works quietly in the background.",
      steps: [
        {
          t: "Verify in minutes",
          d: "Open your account with your CNIC and a selfie — fully digital, in Urdu or English.",
        },
        {
          t: "Set a goal, answer 3 questions",
          d: "Hajj, wedding, home, or simply wealth. Your answers set your risk profile and allocation.",
        },
        {
          t: "Auto-Pilot takes over",
          d: "Your JazzCash, Easypaisa or bank deposit is invested automatically every month and rebalanced as markets move.",
        },
      ],
    },
    growthTitle: "Small amounts. Serious outcomes.",
    growthSub: "Passive investing is boring on a Tuesday — and remarkable over a decade. Drag the sliders and see.",
    growthCta: "Understand passive investing",
    personasTitle: "Built for how Pakistan actually saves",
    personasSub: "Not for traders. For shopkeepers, professionals, mothers and students who want their money to live in real assets.",
    personas: [
      {
        name: "Akram",
        role: "Shopkeeper · Lahore",
        quote: "I always wanted to own a piece of property, but property starts at lakhs. Here I started with five thousand.",
        uses: "Property + gold · PKR 5,000/month",
      },
      {
        name: "Sana",
        role: "Marketing manager · Karachi",
        quote: "My salary comes in, Auto-Pilot invests, I check once a month. That is the entire relationship.",
        uses: "Balanced portfolio on Auto-Pilot",
      },
      {
        name: "Rukhsana",
        role: "Mother of three · Faisalabad",
        quote: "Gold for my daughter, the halal way — with a fatwa I can read and a scholar I can watch.",
        uses: "Gold-led Hajj & wedding goals",
      },
      {
        name: "Bilal",
        role: "Student · Islamabad",
        quote: "I am 21. PKR 5,000 a month for the next 20 years — and the app shows me exactly where it goes.",
        uses: "Growth portfolio · Urdu interface",
      },
    ],
    ledger: {
      eyebrow: "The Silsila Ledger",
      title: "Every rupee leaves a trail.",
      sub: "Each fraction you own is minted as a token and written to Silsila — MalkiatX's blockchain audit ledger. In our tradition, a claim is only as strong as its chain of narration. We built that principle into the technology: every link, verifiable.",
      scrollHint: "Scroll — watch it tokenize",
      stages: [
        {
          t: "A real asset is vetted",
          d: "It starts physical: a commercial property in Gulberg, Lahore — independently valued at PKR 8 crore, clean registered title, takaful-insured.",
          ledger: "Asset onboarded · Gulberg Heights · PKR 8.0 crore",
          chip: "Step 1 · Real asset",
        },
        {
          t: "Locked into licensed custody",
          d: "The title deed moves into a dedicated SPV under licensed custody — bankruptcy-remote from MalkiatX. Its hash is anchored to Silsila forever.",
          ledger: "SPV-114 sealed · title deed hash anchored",
          chip: "Step 2 · Custody",
        },
        {
          t: "Minted into 160,000 tokens",
          d: "The Shariah board certifies the structure, then the SPV is divided into PKR 5,000 tokens — each one sealed on Silsila with the fatwa attached.",
          ledger: "160,000 MXT minted · Fatwa #07 attached",
          chip: "Step 3 · Tokenized",
        },
        {
          t: "You own it. Rent flows.",
          d: "Your PKR 5,000 claims a token in seconds. Every month, rent lands in your wallet — distributed, recorded and audited on the same chain.",
          ledger: "Rent distributed to 1,842 owners · ✓ audited",
          chip: "Step 4 · Ownership",
        },
      ],
      liveLabel: "Live ledger preview · illustrative data",
      block: "Block",
      verified: "verified",
      events: [
        "12.4 g of vaulted gold minted · Karachi vault",
        "Rent distributed to 1,842 owners · Gulberg Heights",
        "GoP Ijarah Sukuk tranche tokenized · PKR 2.1 crore",
        "Equity basket rebalanced · purification logged",
        "Title audit verified · DHA Phase 6 plaza",
        "Zakat reports generated · 3,210 portfolios",
      ],
    },
    trustTitle: "Trust is the product",
    trustSub: "Every asset, fatwa and audit is public. This is wealth infrastructure, not a crypto casino.",
    trustPoints: [
      {
        t: "Shariah Supervisory Board",
        d: "Every structure is approved by qualified muftis — fatwas published in full, with video explainers in Urdu.",
      },
      {
        t: "PVARA-aligned",
        d: "Built to the framework of the Pakistan Virtual Assets Regulatory Authority from day one.",
      },
      {
        t: "Audited & asset-backed",
        d: "Quarterly proof-of-reserves. Every token maps to a real, custodied asset — never a promise.",
      },
    ],
    trustCta: "Visit the Trust Center",
    downloadTitle: "Your first asset is PKR 5,000 away.",
    downloadSub: "Join the waitlist and be first in when the app launches on iOS and Android.",
    downloadNote: "Launching first in Pakistan · Urdu & English",
  },

  learn: {
    eyebrow: "Passive investing, explained",
    title: "Wealth that works while you work.",
    sub: "Most wealth in Pakistan is built by owning real things over time — plots, gold, businesses. Passive investing applies the same patience with smaller amounts, more diversification and zero riba.",
    why: {
      title: "Why passive beats hustle",
      items: [
        {
          t: "Time in the market",
          d: "Returns come from years of ownership, not lucky timing. Starting early matters more than starting big.",
        },
        {
          t: "Diversification",
          d: "Four asset classes move differently. When equities dip, rent and gold keep working. The blend smooths the ride.",
        },
        {
          t: "Discipline, automated",
          d: "Auto-Pilot invests every month before you can spend it — the habit that builds wealth, without needing willpower.",
        },
      ],
    },
    riba: {
      title: "Halal profit, not interest",
      sub: "The difference is not cosmetic — it is the source of the return.",
      headA: "Interest-based saving",
      headB: "MalkiatX portfolio",
      rows: [
        {
          q: "Where the return comes from",
          a: "Lending money at interest (riba)",
          b: "Rent, gold value, sukuk profit and business earnings",
        },
        {
          q: "What you own",
          a: "A claim on a bank's balance sheet",
          b: "Fractional ownership of real, registered assets",
        },
        {
          q: "Shariah status",
          a: "Impermissible or doubtful",
          b: "Screened and certified by our Shariah board",
        },
        {
          q: "Transparency",
          a: "Opaque",
          b: "Published fatwas, audits and a live asset registry",
        },
      ],
      note: "Based on the rulings of the MalkiatX Shariah Supervisory Board — read the fatwas in the Trust Center.",
    },
    calc: {
      title: "The compounding machine",
      sub: "Pick a monthly amount and a horizon. The curve does the talking.",
      engine: "Projection engine",
      tokens: "tokens owned · PKR 5,000 each",
      monthly: "Monthly investment",
      years: "Years",
      tier: "Risk profile",
      contributed: "You put in",
      value: "It could grow to",
      multiple: "× your money",
      year: "Year",
      chartContrib: "Contributions",
      chartValue: "Portfolio value",
    },
    tiers: {
      title: "Three speeds. All halal.",
      sub: "Your onboarding answers place you in a tier — you can change it anytime.",
      allocation: "Allocation",
    },
    autopilot: {
      title: "What Auto-Pilot actually does",
      sub: "A quiet machine with four moving parts, running every month.",
      steps: [
        {
          t: "Collects",
          d: "Pulls your chosen amount via JazzCash, Easypaisa or bank transfer — every month, automatically.",
        },
        {
          t: "Screens",
          d: "Only Shariah-certified assets enter the universe. Non-compliant income is purified to charity.",
        },
        {
          t: "Allocates",
          d: "Splits your deposit across property, gold, sukuk and equities to match your tier.",
        },
        {
          t: "Rebalances",
          d: "When one asset runs ahead, profits are skimmed into the laggards — selling high, buying low, quietly.",
        },
      ],
    },
    faq: {
      title: "Questions, answered straight",
      items: [
        {
          q: "Is this halal? Who says so?",
          a: "Every structure is reviewed and certified by the MalkiatX Shariah Supervisory Board before launch and re-audited annually. The fatwas are published in full in the Trust Center, with video explainers in Urdu — you never have to take our word for it.",
        },
        {
          q: "Is my money locked in?",
          a: "No. You can sell your tokens back through the app. Gold and equities settle fastest; property and sukuk trade in regular windows and can take longer in thin markets. Withdrawals go to JazzCash, Easypaisa or your bank account.",
        },
        {
          q: "What happens if MalkiatX shuts down?",
          a: "Your assets do not sit on our balance sheet. They are held in segregated SPVs and licensed custody, bankruptcy-remote from MalkiatX the company. In a wind-down, assets are sold or transferred and proceeds returned to token holders.",
        },
        {
          q: "Are the returns guaranteed?",
          a: "No — and be careful with anyone who says yes, because a guaranteed return is usually riba in disguise. Real assets fluctuate. Every figure on this site is an illustration, not a promise.",
        },
        {
          q: "Why use tokens at all?",
          a: "Tokens make big assets divisible, transferable and auditable. PKR 5,000 of a PKR 80 lakh building was impossible before — tokenization is simply the engine that makes fractional ownership real, with an audit trail.",
        },
        {
          q: "What does it cost?",
          a: "A simple annual management fee of around 1%, reflected transparently in your dashboard. No entry loads, no exit loads, no hidden spreads. The full fee schedule is published before launch.",
        },
      ],
    },
    cta: {
      title: "Now see it in your own numbers.",
      sub: "Walk the journey from CNIC to your first portfolio — it takes about two minutes.",
      btn: "Walk the journey",
    },
  },

  journey: {
    eyebrow: "The MalkiatX experience",
    title: "From CNIC to your first asset — in minutes.",
    sub: "Choose a saver like you, then walk the exact journey the app gives them. Everything below is a live simulation — no data leaves this page.",
    pickerTitle: "Who is investing today?",
    simTitle: "Try the onboarding — right here",
    simSub: "A faithful simulation of the app's first run.",
    sim: {
      welcomeSub: "Halal ownership of real assets — from PKR 5,000.",
      welcomeBtn: "Begin — السلام عليكم",
      cnicTitle: "Verify your identity",
      cnicSub: "NADRA-checked, fully digital",
      cnicScan: "Scan CNIC",
      cnicScanning: "Reading card…",
      cnicSelfie: "Selfie check",
      cnicChecking: "Matching…",
      cnicDone: "Verified",
      quizTitle: "Three quick questions",
      quiz: [
        {
          q: "If your investment dipped 10% in a month, you would…",
          options: ["Take my money out", "Wait it out", "Invest more while it's low"],
        },
        {
          q: "When will you need this money?",
          options: ["Within 3 years", "In 3–7 years", "Not for 7+ years"],
        },
        {
          q: "Your bigger priority is…",
          options: ["Protecting what I save", "Steady, sensible growth", "Maximum long-term growth"],
        },
      ],
      goalTitle: "Pick a goal",
      goals: { hajj: "Hajj", wedding: "Wedding", home: "Home", wealth: "Long-term wealth" },
      amountTitle: "Monthly amount",
      amountSub: "You can change this anytime",
      allocTitle: "Your halal portfolio",
      allocSub: "Auto-Pilot will keep this balance",
      tierLabel: "profile",
      projectionTarget: "On track for {target} in ≈ {years} years",
      projectionOpen: "≈ {value} after {years} years",
      autopilot: "Auto-Pilot",
      confirm: "Confirm portfolio",
      successTitle: "You're an owner now.",
      successSub: "First investment scheduled this Friday via JazzCash.",
      successCta: "Restart the demo",
      next: "Continue",
      back: "Back",
    },
    after: {
      title: "Then the app gets boring — on purpose",
      sub: "Real wealth apps are not opened daily. Here is {name}'s portfolio over the next five years, untouched.",
      contributed: "put in",
      grewTo: "could grow to",
      labels: ["Year 1", "Year 3", "Year 5"],
    },
    cta: {
      title: "Ready to walk it for real?",
      sub: "Download MalkiatX and own your first asset this week.",
    },
  },

  assetsPage: {
    eyebrow: "The asset universe",
    title: "Four engines. One halal portfolio.",
    sub: "Tap a node in the constellation to inspect what you would own, where its profit comes from, and who certified it.",
    orbitHint: "Drag to rotate · tap an asset",
    panelOwn: "What you own",
    panelIncome: "Income source",
    certText: "Certified by the MalkiatX Shariah Supervisory Board",
    open: "Deep dive",
    gridTitle: "Compare the four engines",
  },

  assetDetail: {
    labels: {
      own: "What you actually own",
      income: "Where profit comes from",
      howTitle: "How tokenization works",
      shariahTitle: "Why it is halal",
      mechTitle: "Mechanics",
      riskTitle: "Honest risks",
      certCard: "Certified structure — fatwa available in the Trust Center",
      min: "Minimum",
      incomeL: "Income",
      liquidity: "Liquidity",
      horizon: "Horizon",
      othersTitle: "The other engines",
      backToAll: "All assets",
    },
    items: {
      property: {
        tagline: "Rental income from institutional real estate — in PKR 5,000 slices.",
        own: "Tokens of a dedicated SPV that holds clean, registered title to vetted commercial and residential property in Lahore, Karachi and Islamabad.",
        income: "Monthly rent (ijarah) distributed to token holders, plus capital growth when a property is sold.",
        how: [
          "A property is vetted, independently valued and purchased into a dedicated SPV with clean title.",
          "The SPV is divided into tokens — your ownership share, recorded on an auditable ledger.",
          "Rent flows to token holders every month; the asset is takaful-insured and audited.",
        ],
        shariah: [
          "Diminishing musharakah / ijarah structure — your return is rent, never interest.",
          "Usage screening: no tenants in banking, liquor, gambling or other non-compliant businesses.",
          "Takaful-insured, with the structure certified by the Shariah board in a published fatwa.",
        ],
        mech: { min: "PKR 5,000", income: "Monthly rental distributions", liquidity: "Monthly trading windows", horizon: "5+ years" },
        risks: [
          "Property values and rents can fall; vacancies reduce distributions.",
          "Selling large amounts quickly can take time — property is the least liquid of the four.",
        ],
      },
      gold: {
        tagline: "Vaulted 24K gold, owned in grams — not paper promises.",
        own: "Grams of LBMA-grade gold bars sitting in insured, audited vaults. Every token maps to real, allocated gold.",
        income: "Value tracks the gold price. Gold pays no yield — it is protection and a store of value.",
        how: [
          "Bars are purchased on spot and allocated in an insured vault — specified bars, on a published bar list.",
          "Each token represents grams of those bars; purchase settles with immediate (constructive) possession, as Shariah requires.",
          "Quarterly bar-list audits are published. Redeem as cash anytime — or as physical gold above a threshold.",
        ],
        shariah: [
          "Spot exchange with possession — no futures, no leverage, no unallocated paper gold.",
          "Structured to the AAOIFI gold standard (allocated, specified bars).",
          "Built-in zakat calculator, so you always know what you owe.",
        ],
        mech: { min: "PKR 5,000", income: "Price appreciation (no yield)", liquidity: "Instant sell-back in market hours", horizon: "Any" },
        risks: [
          "Gold prices swing — it protects over years, not weeks.",
          "A small storage and takaful fee (≈0.4%/yr) is reflected in the price.",
        ],
      },
      sukuk: {
        tagline: "The halal answer to bonds — profit from real assets, not interest.",
        own: "Fractions of Government of Pakistan Ijarah Sukuk and screened corporate sukuk — certificates backed by real assets like motorways and power plants.",
        income: "Semi-annual profit (rental) payments — typically the steadiest income of the four engines.",
        how: [
          "We buy sovereign and screened corporate sukuk through licensed primary and secondary channels.",
          "Holdings are tokenized, so PKR 5,000 buys a slice of lots that normally trade in millions.",
          "Profit payments auto-distribute to holders; maturities are laddered to keep income flowing.",
        ],
        shariah: [
          "Asset-backed ijarah structures — the return is rent on real, identifiable assets.",
          "No conventional bonds, ever. Each issue is screened to AAOIFI standards.",
          "Traded at market value — no guaranteed par games, no disguised interest.",
        ],
        mech: { min: "PKR 5,000", income: "Semi-annual profit payments", liquidity: "Weekly trading windows", horizon: "1–5 years" },
        risks: [
          "Profit rates move with the economy; market value fluctuates before maturity.",
          "Corporate sukuk carry issuer risk — mitigated by screening and diversification.",
        ],
      },
      equities: {
        tagline: "Own Pakistan's best businesses — screened, purified, diversified.",
        own: "A diversified basket of PSX-listed shares that pass Shariah screens, held through licensed custody in your name pool.",
        income: "Dividends (purified where required) plus the long-term growth of the underlying businesses.",
        how: [
          "The universe starts with business screens: no banks, conventional insurance, liquor, tobacco or gambling.",
          "Financial-ratio screens (debt levels, interest income) are applied every quarter; failures exit the basket.",
          "Your tokens track the basket; dividends are purified and reinvested automatically.",
        ],
        shariah: [
          "Dual screening — business activity plus financial ratios — reviewed quarterly by the board.",
          "Any non-compliant income is purified to charity, with purification reports published.",
          "Corporate actions and voting handled under the Shariah board's policy.",
        ],
        mech: { min: "PKR 5,000", income: "Dividends + growth", liquidity: "Daily in market hours", horizon: "7+ years" },
        risks: [
          "Equities are the most volatile of the four — drawdowns of 20–30% happen.",
          "Best used inside a diversified Auto-Pilot allocation, not on their own.",
        ],
      },
    },
  },

  trust: {
    eyebrow: "Trust & Compliance Center",
    title: "Trust is engineered, not promised.",
    sub: "Five independent layers stand between your money and bad outcomes. Tap each layer to see how it protects you.",
    stackHint: "Tap a layer to explore",
    layers: [
      {
        t: "Shariah Supervisory Board",
        d: "Qualified muftis approve every structure before launch and re-audit it annually. Their fatwas are published in full — in Urdu and English — not summarized into marketing lines.",
      },
      {
        t: "PVARA Regulation",
        d: "The Pakistan Virtual Assets Regulatory Authority licenses virtual-asset platforms. MalkiatX is built to its framework: KYC/AML, segregation of client assets, and fit-and-proper management.",
      },
      {
        t: "Independent Audits",
        d: "Quarterly proof-of-reserves matches every token to a real asset — bar lists and title records included — alongside annual financial audits. All reports are published.",
      },
      {
        t: "Custody & SPVs",
        d: "Assets sit in segregated SPVs and licensed custodians, never on MalkiatX's balance sheet. If the company disappeared tomorrow, your assets would not.",
      },
      {
        t: "Radical Transparency",
        d: "Fatwa library, mufti video explainers, the full fee schedule and a live asset registry — public, permanent, and written in plain Urdu first.",
      },
    ],
    boardTitle: "The Shariah Supervisory Board",
    boardNote: "Illustrative profiles — the founding board will be announced publicly at license grant.",
    board: [
      {
        name: "Mufti Abdul Rahman Siddiqui",
        role: "Chairman · 20+ years in Islamic finance rulings",
        focus: "Platform structure & property",
      },
      {
        name: "Dr. Sara Mahmood",
        role: "AAOIFI-certified Shariah auditor",
        focus: "Screening & purification",
      },
      {
        name: "Mufti Bilal Qureshi",
        role: "Dars-e-Nizami · LLM Islamic commercial law",
        focus: "Gold & sukuk structures",
      },
    ],
    fatwaTitle: "Fatwa & document library",
    fatwaBadge: "PDF · published at launch",
    docs: [
      { t: "Master Fatwa — Platform Structure", date: "Ramadan 1447 · March 2026" },
      { t: "Gold Tokenization & Possession", date: "Shawwal 1447 · April 2026" },
      { t: "Property Ijarah & Musharakah Structure", date: "Shawwal 1447 · April 2026" },
      { t: "Sukuk Screening Methodology", date: "Dhul-Qadah 1447 · May 2026" },
      { t: "Equity Screens & Purification Policy", date: "Dhul-Qadah 1447 · May 2026" },
    ],
    videoTitle: "Ask the Mufti — video library",
    videoBadge: "Urdu · coming soon",
    videos: [
      "Is tokenized gold halal?",
      "How is rent different from interest?",
      "What makes a stock Shariah-compliant?",
      "Zakat on your MalkiatX portfolio",
    ],
    auditsTitle: "Audits & proof of reserves",
    audits: [
      {
        t: "Quarterly proof-of-reserves",
        d: "Independent attestation that tokens equal assets — bar lists, title records and sukuk holdings included.",
      },
      {
        t: "Segregated client assets",
        d: "Client assets are bankruptcy-remote from MalkiatX Ltd. — held in SPVs and licensed custody.",
      },
      {
        t: "Bank-grade security",
        d: "Encryption end to end, multi-signature custody, NADRA-verified onboarding and biometric app lock.",
      },
    ],
    explorer: {
      title: "Proof-of-reserves explorer",
      sub: "The Silsila explorer ships with the app — every token traced to a vaulted, audited asset, on-chain. A preview:",
      supply: "Tokens in circulation",
      supplyV: "12,400,000",
      reserves: "Audited assets in custody",
      reservesV: "PKR 124 crore",
      ratio: "Backing ratio",
      ratioV: "100.0%",
      merkle: "Latest audit root",
      merkleV: "0x7c1e9f02…b94f2a8d",
      updated: "Last verified",
      updatedV: "31 May 2026 · independent auditors",
      cta: "Open the Silsila explorer",
      note: "Illustrative preview data",
    },
    faq: {
      title: "Hard questions, welcome",
      items: [
        {
          q: "Who regulates MalkiatX?",
          a: "We are built to the PVARA virtual-asset framework, with underlying securities activities under SECP rules where applicable. Licensing status will always be displayed, in full, on this page.",
        },
        {
          q: "Can I actually read the fatwas?",
          a: "Yes — in full, in Urdu and English, with the reasoning included. Summaries hide things; we publish the source documents.",
        },
        {
          q: "Where exactly is the gold?",
          a: "In insured, audited vaults, on a published bar list verified quarterly by independent auditors. Token supply can never exceed audited grams.",
        },
        {
          q: "Is my data safe?",
          a: "Onboarding runs against NADRA verification; data is encrypted in transit and at rest, and is never sold. You can request deletion any time under our privacy policy.",
        },
      ],
    },
    cta: {
      title: "Read everything. Then invest.",
      sub: "Skeptics make the best long-term investors. Bring your toughest questions to the app.",
    },
  },

  footer: {
    tagline: "Halal ownership of Pakistan's real economy.",
    colProduct: "Product",
    colTrust: "Trust",
    colLegal: "Legal",
    legalLinks: ["Terms of use", "Privacy policy", "Fee schedule", "Complaints"],
    payments: "Payments via",
    disclaimer:
      "MalkiatX (Pvt.) Ltd. is preparing its application under the Pakistan Virtual Assets Regulatory Authority (PVARA) framework. This website is an educational preview. All figures are illustrative and are not a promise of returns; investments carry risk and values can fall as well as rise. Nothing here is investment, legal or tax advice.",
    rights: "© 2026 MalkiatX (Pvt.) Ltd. All rights reserved.",
    language: "Language",
  },
};

export type Dict = typeof en;
