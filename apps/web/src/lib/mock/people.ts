/**
 * Mock people and records used across the student, parent and staff panels.
 * Names match the Figma sample data so screens line up with the design.
 */

export type Path = "Application path" | "Test-prep path" | "Awaiting mentor review";

export type Student = {
  id: string;
  name: string;
  city: string;
  degree: string;
  intake: string;
  destinations: string;
  path: Path;
  stage: string;
  english: { test: string; current: string; target: string; requirement: string; met: boolean };
  sat: { current: string; target: string };
  mentor: string;
  parent: string;
  progress: number;
  nextDeadline: string;
  applications: string;
};

export const students: Student[] = [
  {
    id: "aziza-karimova",
    name: "Aziza Karimova",
    city: "Tashkent",
    degree: "Bachelor's",
    intake: "Fall 2027",
    destinations: "USA",
    path: "Test-prep path",
    stage: "Test prep",
    english: { test: "IELTS", current: "5.5", target: "6.5", requirement: "6.5", met: false },
    sat: { current: "Not taken", target: "Not set" },
    mentor: "Madina S.",
    parent: "Dilfuza Karimova",
    progress: 18,
    nextDeadline: "Not set",
    applications: "Not started",
  },
  {
    id: "jasur-aliyev",
    name: "Jasur Aliyev",
    city: "Tashkent",
    degree: "Bachelor's",
    intake: "Fall 2027",
    destinations: "USA, Canada, Germany, Italy",
    path: "Application path",
    stage: "Applications",
    english: { test: "IELTS", current: "6.5", target: "7.0", requirement: "6.5", met: true },
    sat: { current: "1350", target: "1450" },
    mentor: "Madina S.",
    parent: "Bobur Aliyev",
    progress: 62,
    nextDeadline: "Dec 1 · KAIST",
    applications: "8 proposed · 5 USA · 1 Canada · 1 Germany · 1 Italy",
  },
  {
    id: "dilnoza-rahimova",
    name: "Dilnoza Rahimova",
    city: "Samarkand",
    degree: "Master's",
    intake: "Spring 2027",
    destinations: "Europe",
    path: "Awaiting mentor review",
    stage: "Consultation",
    english: { test: "Duolingo", current: "120", target: "Not set", requirement: "Not configured", met: false },
    sat: { current: "Not needed", target: "—" },
    mentor: "Madina S.",
    parent: "—",
    progress: 6,
    nextDeadline: "Not set",
    applications: "Not started",
  },
];

export function getStudent(id: string) {
  return students.find((s) => s.id === id);
}

export type StaffRole = "Mentor" | "Mentor Admin" | "Teacher" | "Content Admin" | "Super Admin";

export const staff: {
  name: string;
  roles: StaffRole[];
  twoFactor: boolean;
  lastLogin: string;
  status: "Active" | "Invited";
}[] = [
  { name: "Madina S.", roles: ["Mentor"], twoFactor: true, lastLogin: "Today", status: "Active" },
  { name: "Rustam K.", roles: ["Mentor Admin", "Mentor"], twoFactor: true, lastLogin: "Today", status: "Active" },
  { name: "Mr. Nazarov", roles: ["Teacher", "Mentor"], twoFactor: true, lastLogin: "Yesterday", status: "Active" },
  { name: "Ms. Rakhimova", roles: ["Teacher"], twoFactor: true, lastLogin: "Yesterday", status: "Active" },
  { name: "Content editor", roles: ["Content Admin"], twoFactor: true, lastLogin: "3 days ago", status: "Active" },
  { name: "Sevara A.", roles: ["Mentor"], twoFactor: false, lastLogin: "—", status: "Invited" },
];

export const families: {
  student: string;
  parent: string;
  phone: string;
  login: "Not created" | "Sent" | "Active";
  mentor: string;
  teachers: string;
}[] = [
  { student: "Aziza Karimova", parent: "Dilfuza Karimova", phone: "+998 91 555 12 34", login: "Active", mentor: "Madina S.", teachers: "Ms. Rakhimova" },
  { student: "Jasur Aliyev", parent: "Bobur Aliyev", phone: "+998 90 222 33 44", login: "Sent", mentor: "Madina S.", teachers: "Mr. Nazarov" },
  { student: "Dilnoza Rahimova", parent: "—", phone: "—", login: "Not created", mentor: "Madina S.", teachers: "—" },
];
