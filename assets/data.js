/* Vintage Tech — the programme.
   Everything the site shows comes from this file. Edit here, push, done.

   RULES
   - Only list platforms that really exist. Never invent a listing, a studio or a price.
   - price: null shows "Ask for a quote". Set a number (KES) only when Sheldon decides it.
   - contact: while both are null the box office is closed (buttons explain that
     instead of sending anywhere). Fill one in to open it.
*/
window.VT = {
  contact: {
    whatsapp: null, // e.g. "2547XXXXXXXX" (country code, no +)
    email: null     // e.g. "hello@vintagetech.co.ke"
  },

  // Studios = sellers. Vintage Tech is the first. Outside studios join after review.
  studios: [
    { id: "vintage", name: "Vintage Tech", city: "Nairobi", verified: true }
  ],

  genres: ["Commerce", "Business", "Finance", "Campus", "Assistants", "Bots"],

  platforms: [
    {
      id: "sosick",
      title: "Sosick",
      tagline: "A shop that delivers. Sellers you can trust.",
      genre: "Commerce",
      studio: "vintage",
      status: "live",
      link: "https://sosick.odhis.co.ke",
      price: null,
      palette: ["#1d0f2e", "#ff4f8b", "#ffd36b"],
      glyph: "◆",
      story: "Built for a Nairobi thrift brand. Customers order pickup and delivery across the city, and only sellers who pass five checks get a Verified Plug badge. The owner runs everything from a private admin portal.",
      cast: ["HTML, CSS, JavaScript", "Supabase (database + sign-in)", "Row-level security", "GitHub Pages"],
      features: [
        "Pickup and delivery orders straight from the site",
        "Verified Plugs: sellers listed only after 5 checks",
        "Private admin portal: orders, team, charges, plugs",
        "Fees the owner switches on himself, never hard-coded",
        "Built-in helper that answers common questions"
      ]
    },
    {
      id: "agiza",
      title: "The Office",
      tagline: "An agent's whole day, in her pocket.",
      genre: "Business",
      studio: "vintage",
      status: "live",
      link: "https://agiza.odhis.co.ke",
      price: null,
      palette: ["#2a0f24", "#e7a6b8", "#f6e7d8"],
      glyph: "✦",
      story: "A public site plus a private office for an insurance agent. Clients, meetings, quotes and to-dos live behind her own login, and her phone reminds her before every meeting.",
      cast: ["HTML, CSS, JavaScript", "Supabase (database, sign-in, private files)", "Phone notifications", "GitHub Pages"],
      features: [
        "Elegant public page that hands leads to WhatsApp",
        "Private office: clients, meetings, quotes, to-dos",
        "Quote PDFs stored privately, owner-only access",
        "Phone reminders before meetings",
        "Built-in assistant for everyday questions"
      ]
    },
    {
      id: "pfs",
      title: "Phone Financing",
      tagline: "Phones on instalments. M-PESA does the rest.",
      genre: "Finance",
      studio: "vintage",
      status: "private",
      link: null,
      price: null,
      palette: ["#06231d", "#38d39f", "#e9ffd9"],
      glyph: "▲",
      story: "A full phone-financing system running for a Nairobi business. Managers add phones, agents sell them on instalments, customers pay by M-PESA, and the system keeps the books, pays commission and follows up on late loans.",
      cast: ["Java + Spring Boot", "PostgreSQL", "Apache Fineract (loan ledger)", "M-PESA Daraja API", "Docker on AWS"],
      features: [
        "Loans with instalment plans and interest per phone",
        "M-PESA payments in, commission payouts out",
        "Agents, managers and a full ledger",
        "Overdue follow-up, with device locking in testing",
        "Runs on its own cloud server with backups"
      ]
    },
    {
      id: "venuecheck",
      title: "VenueCheck",
      tagline: "Every free room on campus, right now.",
      genre: "Campus",
      studio: "vintage",
      status: "build",
      link: null,
      price: null,
      palette: ["#0c1a33", "#5aa9ff", "#ffe08a"],
      glyph: "■",
      story: "A live board for Chiromo campus that reads the official timetable and shows which lecture rooms are empty this hour, so students stop wandering corridors looking for a place to read.",
      cast: ["Python", "FastAPI + SQLite", "Timetable importer", "Campus email sign-in"],
      features: [
        "Imports the real timetable",
        "Shows free rooms by the hour",
        "Phone-friendly board for students",
        "Works for any campus with a timetable"
      ]
    },
    {
      id: "jarvis",
      title: "Jarvis",
      tagline: "A laptop that learns how you work.",
      genre: "Assistants",
      studio: "vintage",
      status: "private",
      link: null,
      price: null,
      palette: ["#120f0b", "#e8b04a", "#fff1cf"],
      glyph: "●",
      story: "A personal assistant that lives on the laptop. It runs everyday jobs and learns from past conversations, and it only reports what it actually measured.",
      cast: ["Python", "Runs locally on Linux", "Learns from conversation history"],
      features: [
        "Runs on your own machine",
        "Learns from your past conversations",
        "Reports only what it measured, never guesses",
        "Built around one person's real routine"
      ]
    },
    {
      id: "birthday-bot",
      title: "Birthday Bot",
      tagline: "Never miss a birthday again.",
      genre: "Bots",
      studio: "vintage",
      status: "build",
      link: null,
      price: null,
      palette: ["#2b1404", "#ff9a3c", "#fff0b3"],
      glyph: "✺",
      story: "Sends personal WhatsApp birthday wishes on the day, through WhatsApp's official business service, so the account never gets banned.",
      cast: ["Python", "FastAPI + SQLite", "WhatsApp Cloud API (official)", "Docker"],
      features: [
        "Uses the official WhatsApp Cloud service",
        "A birthday list you keep yourself",
        "Personal wishes sent on the day"
      ]
    }
  ]
};
