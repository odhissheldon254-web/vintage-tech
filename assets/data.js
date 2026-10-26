/* Vintage Tech: the catalogue.
   Everything the shop window lists comes from this file. Edit here, push, done.

   RULES
   - Only list products that really exist or are honestly marked "build" / "soon".
   - status: "ready" = the engine already runs for a real client · "build" = being made · "soon" = planned
   - price: null shows "Quote". Set a number (KES) only when Sheldon decides it.
   - contact: while both are null the box office is closed and buttons say so.
   - Phone Financing (Mifos) is deliberately NOT listed while Sheldon works on it.
*/
window.VT = {
  contact: {
    whatsapp: null, // e.g. "2547XXXXXXXX" (country code, no +)
    email: null     // e.g. "hello@vintagetech.co.ke"
  },

  products: [
    {
      id: "duka",
      name: "Duka",
      line: "An online shop that delivers.",
      for: "Shops, thrift sellers, kitchens and anyone selling in Nairobi",
      status: "ready",
      proof: { label: "Running at sosick.odhis.co.ke", url: "https://sosick.odhis.co.ke" },
      price: null,
      accent: "#ff5a8a",
      features: [
        "Customers order pickup or delivery straight from your site",
        "Verified sellers: listed only after you check them",
        "Private admin for orders, team and charges",
        "Fees you switch on yourself, nothing hard-coded"
      ]
    },
    {
      id: "office",
      name: "The Office",
      line: "Your clients and meetings, in your pocket.",
      for: "Insurance agents, property agents, SACCO and sales reps",
      status: "ready",
      proof: { label: "Running at agiza.odhis.co.ke", url: "https://agiza.odhis.co.ke" },
      price: null,
      accent: "#c58bff",
      features: [
        "A public page that sends leads to your WhatsApp",
        "Private office: clients, meetings, quotes, to-dos",
        "Phone reminders before every meeting",
        "Quote PDFs stored privately, only you can open them"
      ]
    },
    {
      id: "campus",
      name: "Campus Board",
      line: "Every free room on campus, right now.",
      for: "Universities, colleges and student bodies",
      status: "build",
      proof: { label: "Being built for Chiromo campus", url: null },
      price: null,
      accent: "#5ea8ff",
      features: [
        "Reads the official timetable",
        "Shows free lecture rooms hour by hour",
        "Made for phones, works for any campus"
      ]
    },
    {
      id: "remember",
      name: "Remember",
      line: "WhatsApp wishes and reminders that send themselves.",
      for: "Businesses that want customers to come back",
      status: "build",
      proof: { label: "Uses WhatsApp's official business service", url: null },
      price: null,
      accent: "#ffb020",
      features: [
        "Birthday wishes sent on the day",
        "Official WhatsApp Cloud service, so no bans",
        "A customer list you keep yourself"
      ]
    }
  ]
};
