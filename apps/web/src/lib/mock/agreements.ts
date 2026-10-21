/**
 * Mock offers/agreements (spec §12). Prices are placeholders until the
 * Super Admin sets them in Products; there are no refunds (spec §12.4).
 */

export type Offer = {
  id: string;
  kind: "Admission package" | "Test-prep plan";
  title: string;
  student: string;
  subtitle: string;
  number: string;
  invoiceId: string;
  included: { tag: string; title: string; text: string; price: string }[];
  clauses: string[];
};

export const offers: Offer[] = [
  {
    id: "admission-package",
    kind: "Admission package",
    title: "Your admission package",
    student: "Jasur Aliyev",
    subtitle: "Jasur Aliyev · Bachelor's · Fall 2027 · Application path",
    number: "4P-2026-0187",
    invoiceId: "inv-0187",
    included: [
      {
        tag: "Package",
        title: "8 applications · USA, Canada, Germany, Italy",
        text: "5 US · 1 Canadian · 2 European applications. Essays written by 4Prep, document collection, financial-aid and grant applications, plus visa interview preparation.",
        price: "Price to be confirmed",
      },
      {
        tag: "Included",
        title: "English + recommended SAT retake prep",
        text: "IELTS 6.5 → target 7.0 · SAT 1350 → target 1450. Retake preparation is included; no separate SAT class charge.",
        price: "Included",
      },
    ],
    clauses: [
      "1. Parties: 4Prep Academy and Jasur Aliyev. Adults sign themselves; a parent signs if the learner is under 18.",
      "2. Services: 8 applications (5 US, 1 Canadian, 2 European), essays, documents, financial-aid/grant applications, English and recommended SAT retake prep, visa interview prep.",
      "3. Price to be confirmed. Payment plan to be confirmed. Review the final terms before signing and paying.",
      "4. 4Prep opens and manages all application accounts; mentors and the learner build the list; 4Prep submits only with the learner's approval. Common App (US), provincial/university portals (Canada), national/university portals (Europe); CSS Profile where required. The family decides among offers.",
      "5. Retakes, financial aid and visa interview prep run alongside applications. No admission, grant or visa is guaranteed.",
      "6. Payments are final. 4Prep does not offer refunds.",
    ],
  },
  {
    id: "test-prep-plan",
    kind: "Test-prep plan",
    title: "Your test-prep plan",
    student: "Aziza Karimova",
    subtitle: "Aziza Karimova · Bachelor's · Fall 2027 · Test-prep path",
    number: "4P-2026-0192",
    invoiceId: "inv-0192",
    included: [
      {
        tag: "Class",
        title: "IELTS General to 6.5 · IELTS-G65-Nov-B",
        text: "Online · Tue / Thu 19:00–21:00 · 12 weeks · starts 3 Nov. Mock tests, homework and monthly teacher feedback.",
        price: "$320",
      },
      {
        tag: "Recommended",
        title: "SAT Weekend · SAT-WKD-Nov-C",
        text: "Optional add-on. SAT is recommended — it improves admission and scholarship chances.",
        price: "$340",
      },
    ],
    clauses: [
      "1. Parties: 4Prep Academy and Aziza Karimova. A parent signs because the learner is under 18.",
      "2. Services: IELTS preparation to the 6.5 entry requirement, with optional SAT preparation.",
      "3. When the official English requirement is met, the mentor offers the admission package.",
      "4. Payments are final. 4Prep does not offer refunds.",
    ],
  },
];

export function getOffer(id: string) {
  return offers.find((o) => o.id === id);
}

export function getOfferByInvoice(invoiceId: string) {
  return offers.find((o) => o.invoiceId === invoiceId);
}
