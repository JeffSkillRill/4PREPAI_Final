/**
 * Mock course catalogue. Prices and groups are examples until the Academy
 * provides the real class catalogue (managed in Super Admin → Products).
 */

export type CourseCode = "Foundation Math" | "General English" | "SAT" | "IELTS";

export type ClassGroup = {
  id: string;
  course: CourseCode;
  title: string;
  code: string;
  mode: "Online" | "Office";
  entry: string;
  schedule: string;
  weeks: number;
  starts: string;
  teacher: string;
  price: number;
  seatsLeft: number;
};

export const courseInfo: { code: CourseCode; leadsTo?: CourseCode; text: string }[] = [
  { code: "Foundation Math", leadsTo: "SAT", text: "Builds the algebra and problem-solving base for SAT Math." },
  { code: "General English", leadsTo: "IELTS", text: "Everyday and academic English before IELTS preparation." },
  { code: "SAT", text: "Digital SAT Reading & Writing and Math with full mock tests." },
  { code: "IELTS", text: "IELTS Academic, all four skills, with weekly speaking practice." },
];

export const classGroups: ClassGroup[] = [
  { id: "sat-int-nov-a", course: "SAT", title: "SAT Intensive", code: "SAT-INT-Nov-A", mode: "Office", entry: "Algebra basics", schedule: "Mon / Wed / Fri 18:00–20:00", weeks: 10, starts: "2 Nov", teacher: "Mr. Nazarov", price: 380, seatsLeft: 4 },
  { id: "ielts-g65-nov-b", course: "IELTS", title: "IELTS General to 6.5", code: "IELTS-G65-Nov-B", mode: "Online", entry: "IELTS 5.0", schedule: "Tue / Thu 19:00–21:00", weeks: 12, starts: "3 Nov", teacher: "Ms. Rakhimova", price: 320, seatsLeft: 8 },
  { id: "ielts-a7-nov-a", course: "IELTS", title: "IELTS Advanced 7+", code: "IELTS-A7-Nov-A", mode: "Office", entry: "IELTS 6.5", schedule: "Mon / Wed 17:00–19:00", weeks: 12, starts: "2 Nov", teacher: "Ms. Rakhimova", price: 390, seatsLeft: 0 },
  { id: "sat-wkd-nov-c", course: "SAT", title: "SAT Weekend", code: "SAT-WKD-Nov-C", mode: "Online", entry: "Placement test", schedule: "Sat / Sun 10:00–13:00", weeks: 8, starts: "7 Nov", teacher: "Mr. Nazarov", price: 340, seatsLeft: 6 },
  { id: "fm-base-nov-a", course: "Foundation Math", title: "Foundation Math", code: "FM-BASE-Nov-A", mode: "Office", entry: "Placement test", schedule: "Tue / Thu 16:00–18:00", weeks: 10, starts: "4 Nov", teacher: "Mr. Nazarov", price: 240, seatsLeft: 9 },
  { id: "ge-b1-nov-a", course: "General English", title: "General English B1", code: "GE-B1-Nov-A", mode: "Online", entry: "Placement test", schedule: "Mon / Wed / Fri 18:00–19:30", weeks: 12, starts: "3 Nov", teacher: "Ms. Rakhimova", price: 260, seatsLeft: 10 },
];

export function getGroup(id: string) {
  return classGroups.find((g) => g.id === id);
}
