/**
 * Bliss Academy - Data Store
 * Location: Alihame, Agbor, Delta State, Nigeria
 * Institution: Nursery, Primary & Secondary School (Creche to SSS 3)
 * Academic Session: 2026 / 2027
 */

const BLISS_DATA = {
  school: {
    name: "Bliss Academy",
    tagline: "Excellence, Character & Integrity",
    established: 2008,
    level: "Nursery, Primary & Secondary School",
    motto: "Nurturing Tomorrow's Leaders Today",
    address: "Bliss Academy Boulevard, Alihame, Agbor, Delta State, Nigeria",
    phone: "+234 (0) 803 555 0192 / +234 (0) 812 345 6789",
    email: "info@blissacademy.sch.ng",
    portalUrl: "portal.blissacademy.sch.ng",
    stats: {
      years: "18+",
      students: "850+",
      teachers: "45+",
      waecPassRate: "99.2%",
      satisfaction: "98%"
    }
  },

  // Academic Calendar for 2026/2027 Session (Term 1)
  calendar: {
    currentYear: 2026,
    currentMonth: 8, // September (0-indexed: 8)
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    events: [
      {
        id: "ev-1",
        date: "2026-09-07",
        day: 7,
        month: 8,
        year: 2026,
        title: "Term 1 School Resumption (JSS 1 - SSS 3)",
        category: "academic",
        badge: "Resumption",
        time: "07:30 AM",
        location: "Secondary Campus Assembly Hall",
        desc: "Official resumption assembly and term orientation for all secondary school scholars."
      },
      {
        id: "ev-2",
        date: "2026-09-09",
        day: 9,
        month: 8,
        year: 2026,
        title: "Primary & Nursery Resumption (Creche - Basic 6)",
        category: "academic",
        badge: "Primary Resumption",
        time: "08:00 AM",
        location: "Bliss Junior Wing, Alihame",
        desc: "Welcoming our young pupils back for an exciting 2026/2027 learning journey."
      },
      {
        id: "ev-3",
        date: "2026-09-18",
        day: 18,
        month: 8,
        year: 2026,
        title: "After-School STEM Robotics & Jet Club Begins",
        category: "enrichment",
        badge: "Clubs",
        time: "02:30 PM - 04:00 PM",
        location: "ICT & Innovation Lab",
        desc: "Hands-on robotics prototyping, chess academy, and debate rehearsals commence."
      },
      {
        id: "ev-4",
        date: "2026-09-25",
        day: 25,
        month: 8,
        year: 2026,
        title: "Term 1 School Fees Clearance Deadline",
        category: "finance",
        badge: "Fees Due",
        time: "09:00 AM",
        location: "Bursary / Online Portal",
        desc: "Final date for first installment fee clearance for 2026/2027 academic session."
      },
      {
        id: "ev-5",
        date: "2026-10-01",
        day: 1,
        month: 9,
        year: 2026,
        title: "Nigeria National Independence Day",
        category: "special",
        badge: "Public Holiday",
        time: "All Day",
        location: "Campus Closed",
        desc: "National Independence Day holiday celebration."
      },
      {
        id: "ev-6",
        date: "2026-10-15",
        day: 15,
        month: 9,
        year: 2026,
        title: "Continuous Assessment Test 1 (CA 1)",
        category: "assessment",
        badge: "Examinations",
        time: "08:30 AM",
        location: "Classrooms & CBT Center",
        desc: "Mid-term baseline evaluations across all primary and secondary subjects."
      }
    ]
  },

  // Student Profile & Consolidated Records (Adebayo Adeleke - SSS 2A)
  student: {
    id: "BA-2026-8012",
    name: "Adebayo Adeleke",
    role: "student",
    grade: "Senior Secondary (SSS 2A)",
    house: "Emerald House",
    avatar: "assets/images/avatar_student.jpg",
    academicPeriod: "Term 1 (2026/2027 Session)",
    institution: "Bliss Academy, Alihame, Agbor",
    
    // Academic & Conduct Standing (Shown directly in Student Portal)
    attendance: {
      rate: "97.4%",
      presentDays: 45,
      totalDays: 46,
      status: "Punctual & Regular"
    },
    performance: {
      gpa: "3.88 / 4.0",
      averageScore: "92.4% (Grade A1)",
      classRank: "2nd of 28 Scholars",
      conduct: "Exemplary & Diligent"
    },

    // School Fee Booking & Invoicing (Shown directly in Student Portal)
    billing: {
      invoiceNumber: "BA/INV/2026/041",
      session: "2026 / 2027 Academic Session",
      term: "Term 1 Tuition & Services",
      outstandingBalance: 480000,
      dueDate: "25 September 2026",
      items: [
        { desc: "Term 1 Tuition & Educational Services", amount: 420000, status: "PENDING", date: "Due 25 Sep 2026" },
        { desc: "STEM Robotics & Science Lab Practical Levy", amount: 40000, status: "PENDING", date: "Due 25 Sep 2026" },
        { desc: "School Identity Badge & Medical Clinic Care", amount: 20000, status: "PENDING", date: "Due 25 Sep 2026" }
      ]
    },

    // Enrolled Subjects & Progress
    courses: [
      { id: "c-1", code: "MTH-201", name: "Further Mathematics", progress: 88, teacher: "Mrs. Funmilayo Alabi", room: "Room 204", nextClass: "10:00 AM Today" },
      { id: "c-2", code: "PHY-201", name: "Physics & Lab Practical", progress: 84, teacher: "Mr. David Adeleke", room: "Physics Lab", nextClass: "11:30 AM Today" },
      { id: "c-3", code: "ENG-201", name: "English Language & Prose", progress: 92, teacher: "Mrs. Brenda Okon", room: "Room 105", nextClass: "01:00 PM Tomorrow" },
      { id: "c-4", code: "ROB-201", name: "Robotics & Software Logic", progress: 96, teacher: "Engr. Ken Ezechukwu", room: "Innovation Lab", nextClass: "02:30 PM Tomorrow" }
    ],

    // Today's Timetable
    todaySchedule: [
      { id: "s-1", subject: "Further Mathematics (Algebra)", time: "10:00 AM - 11:15 AM", room: "Room 204", status: "completed" },
      { id: "s-2", subject: "Physics Lab (Circuits & Ohm's Law)", time: "11:30 AM - 12:45 PM", room: "Physics Lab", status: "active", teacher: "Mr. David Adeleke" },
      { id: "s-3", subject: "Chemistry (Stoichiometry)", time: "01:15 PM - 02:15 PM", room: "Chemistry Lab", status: "upcoming" }
    ],

    // Homework Tasks Checklist
    pendingTasks: [
      { id: "t-1", title: "Solve Exercises 4.1 to 4.5 in Further Math text", subject: "Further Mathematics", due: "Today, 05:00 PM", status: "pending" },
      { id: "t-2", title: "Submit Physics Experiment Report on Resistance", subject: "Physics", due: "Tomorrow, 08:30 AM", status: "pending" },
      { id: "t-3", title: "Read Chapter 3 of WAEC Literature text", subject: "English Literature", due: "Friday, 12:00 PM", status: "in-progress" }
    ]
  },

  // Teacher Profile & Data (Mrs. Funmilayo Alabi, M.Ed)
  teacher: {
    id: "TCH-3011",
    name: "Mrs. Funmilayo Alabi, M.Ed",
    role: "teacher",
    title: "Senior Mathematics & STEM Lead",
    department: "Department of Sciences & Technology",
    email: "f.alabi@blissacademy.sch.ng",
    avatar: "assets/images/avatar_teacher.jpg",
    stats: {
      classesToday: 3,
      totalStudents: 28,
      pendingGrading: 4,
      averagePerformance: "88.6% (Grade A1)"
    },
    roster: [
      { name: "Adebayo Adeleke", roll: "BA-8012", score: "95% (A1)", attendance: "97.4%", status: "Present" },
      { name: "Chinedu Okafor", roll: "BA-8018", score: "89% (A1)", attendance: "95.0%", status: "Present" },
      { name: "Khadijah Babatunde", roll: "BA-8025", score: "92% (A1)", attendance: "98.0%", status: "Present" },
      { name: "Emeka Umeh", roll: "BA-8031", score: "85% (B2)", attendance: "93.5%", status: "Present" },
      { name: "Folake Oladipo", roll: "BA-8038", score: "90% (A1)", attendance: "96.0%", status: "Present" },
      { name: "Tariq Danjuma", roll: "BA-8042", score: "82% (B2)", attendance: "91.0%", status: "Present" }
    ]
  },

  // School Stream & Announcements
  announcements: [
    {
      id: "post-101",
      author: "Mrs. Funmilayo Alabi, M.Ed",
      authorRole: "Head of STEM & Mathematics",
      authorAvatar: "assets/images/avatar_teacher.jpg",
      date: "Today at 08:30 AM",
      category: "Academic",
      title: "Inter-House Robotics & Mathematics Olympiad Registration 🤖📐",
      content: "All SSS 1 - SSS 3 scholars interested in representing Bliss Academy, Alihame at the forthcoming Delta State STEM Olympiad should submit their names after school today in Room 204.",
      image: "assets/images/bliss_stem_nigeria.jpg",
      likes: 24,
      commentsCount: 5,
      tags: ["STEM", "Olympiad", "SSS"]
    },
    {
      id: "post-102",
      author: "Office of the Principal",
      authorRole: "Head of School",
      authorAvatar: "assets/images/avatar_teacher.jpg",
      date: "Yesterday",
      category: "School Notice",
      title: "Welcome to the 2026/2027 Academic Session 🎉",
      content: "We warmly welcome our scholars, parents, and dedicated teachers to a new session of excellence at Bliss Academy, Alihame, Agbor. Let us uphold our motto of Excellence, Character, and Integrity.",
      image: "assets/images/bliss_hero_nigeria.jpg",
      likes: 52,
      commentsCount: 10,
      tags: ["Notice", "2026/2027", "Alihame"]
    }
  ],

  // Terminal Report Card Mockup (Phase 2 Preview)
  terminalReport: {
    student: {
      name: "Adebayo Adeleke",
      studentId: "BA-2026-8012",
      class: "Senior Secondary (SSS 2A)",
      term: "Term 1 Cumulative Transcript",
      session: "2026 / 2027",
      position: "2nd of 28 Scholars",
      average: "92.4% (Grade A1)",
      conduct: "Exemplary & Diligent",
      attendance: "97.4%"
    },
    subjects: [
      { name: "Further Mathematics", caScore: 38, examScore: 57, total: 95, grade: "A1", remark: "Outstanding mathematical intellect" },
      { name: "English Language & Literature", caScore: 36, examScore: 53, total: 89, grade: "A1", remark: "Eloquent and coherent writing" },
      { name: "Physics & Laboratory Practical", caScore: 37, examScore: 54, total: 91, grade: "A1", remark: "Exceptional lab comprehension" },
      { name: "Chemistry", caScore: 36, examScore: 52, total: 88, grade: "A1", remark: "Consistent mastery of topics" },
      { name: "Robotics & Computer Science", caScore: 40, examScore: 58, total: 98, grade: "A1", remark: "Superb coding and circuit skills" },
      { name: "Civic Education", caScore: 35, examScore: 49, total: 84, grade: "B2", remark: "Strong moral and civic grounding" }
    ],
    teacherRemark: "Adebayo is a shining example of discipline, hard work, and moral fortitude at Bliss Academy.",
    principalRemark: "An extraordinary academic record. Keep aiming for the peak of global achievement. — Dr. (Mrs.) Helen Vance-Balogun, Principal"
  },

  // Academic Programs
  programs: [
    {
      id: "prog-early",
      title: "Early Years & Nursery",
      subtitle: "Creche, Playgroup & KG",
      icon: "shapes",
      description: "Montessori-inspired foundational learning cultivating early phonics, numbers, social warmth, and motor dexterity in a joyful environment."
    },
    {
      id: "prog-primary",
      title: "Basic Primary School",
      subtitle: "Basic 1 to Basic 6",
      icon: "book-open-reader",
      description: "Building unshakeable foundations in literacy, quantitative reasoning, introductory coding, cultural heritage, and scientific inquiry."
    },
    {
      id: "prog-junior",
      title: "Junior Secondary School",
      subtitle: "JSS 1 to JSS 3 (BECE)",
      icon: "flask-vial",
      description: "Comprehensive preparation for National & Delta State BECE examinations, introductory STEM laboratories, and creative arts."
    },
    {
      id: "prog-senior",
      title: "Senior Secondary College",
      subtitle: "SSS 1 to SSS 3 (WAEC & NECO)",
      icon: "graduation-cap",
      description: "Rigorous academic streams in Science, Arts, and Commercial subjects preparing scholars for WAEC, NECO, and Cambridge qualifications."
    }
  ]
};

// Expose globally
window.BLISS_DATA = BLISS_DATA;
