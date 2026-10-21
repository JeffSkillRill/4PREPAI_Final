/** Mock numbers for the staff Overview (Figma: Admin — Overview). Illustrative only. */

export const kpis = [
  { label: "Sign-ups", value: "2,486", delta: "+12% this month" },
  { label: "Plans created", value: "612", delta: "+8% this month" },
  { label: "Academy students", value: "148", delta: "+5 this week" },
  { label: "Monthly revenue", value: "$11.6k", delta: "+14% vs Sep" },
];

export const registrations = [
  { month: "Mar", value: 120 },
  { month: "Apr", value: 180 },
  { month: "May", value: 210 },
  { month: "Jun", value: 260 },
  { month: "Jul", value: 240 },
  { month: "Aug", value: 340 },
  { month: "Sep", value: 390 },
  { month: "Oct", value: 310 },
];

export const funnel = [
  { stage: "Registered", value: 2486 },
  { stage: "Plan created", value: 1980 },
  { stage: "Applied to Academy", value: 612 },
  { stage: "Signed agreement", value: 214 },
  { stage: "Paid (students)", value: 148 },
];

export const newApplications = [
  { name: "Aziza Karimova", target: "USA", format: "Office", status: "New" },
  { name: "Sardor Malikov", target: "Canada", format: "Online", status: "Consult booked" },
  { name: "Dilnoza Rahimova", target: "Germany", format: "Both", status: "New" },
  { name: "Jasur Tursunov", target: "Italy", format: "Office", status: "Offer sent" },
  { name: "Madina Yusupova", target: "USA", format: "Online", status: "New" },
];

export const meetingsToday = [
  { time: "10:00", who: "Jasur T.", what: "Docs review · Desk 2" },
  { time: "11:30", who: "Dilnoza R.", what: "SOP workshop · Desk 4" },
  { time: "14:30", who: "Aziza K.", what: "Visa prep · Desk 1" },
  { time: "16:00", who: "Group", what: "IELTS speaking club" },
];

export const products = [
  { name: "Full admission support", type: "Package", uzs: "30,500,000", usd: "2,400", parts: "3 parts", status: "Active" },
  { name: "Application support", type: "Package", uzs: "17,800,000", usd: "1,400", parts: "3 parts", status: "Active" },
  { name: "Visa support", type: "Package", uzs: "6,400,000", usd: "500", parts: "2 parts", status: "Active" },
  { name: "IELTS General to 6.5", type: "Class", uzs: "4,050,000", usd: "320", parts: "2 parts", status: "Active" },
  { name: "SAT Intensive", type: "Class", uzs: "4,830,000", usd: "380", parts: "2 parts", status: "Active" },
  { name: "Foundation Math", type: "Class", uzs: "3,050,000", usd: "240", parts: "2 parts", status: "Active" },
  { name: "General English B1", type: "Class", uzs: "3,300,000", usd: "260", parts: "2 parts", status: "Active" },
  { name: "Extra essay review", type: "Add-on", uzs: "630,000", usd: "50", parts: "—", status: "Draft" },
];

export const payments = [
  { who: "Sardor M.", amount: "$380", method: "Card · J.P. Morgan", status: "Paid" },
  { who: "Jasur T.", amount: "$890", method: "Card · J.P. Morgan", status: "Overdue" },
  { who: "Madina Y.", amount: "$500", method: "Card · J.P. Morgan", status: "Failed" },
  { who: "Kamola R.", amount: "$320", method: "Bank transfer", status: "Pending" },
];
