/**
 * Bliss Academy - Initial Seed Data & Store Configuration
 * Tailored for a Premier Nigerian International Academy (Lagos/Abuja)
 * Blending British Cambridge and Nigerian Curriculum (WAEC / IGCSE)
 */

const BLISS_DATA = {
  school: {
    name: "Bliss Academy",
    tagline: "Shaping Minds • Building Futures",
    established: 1999,
    motto: "Excellence, Character & Global Leadership",
    address: "Plot 14, Coral Crest Way, Off Admiralty Road, Lekki Phase 1, Lagos, Nigeria",
    phone: "+234 (0) 803 555 0192 / +234 (0) 809 111 8920",
    email: "admissions@blissacademy.edu.ng",
    portalUrl: "portal.blissacademy.edu.ng",
    stats: {
      years: "25+",
      students: "1,500+",
      teachers: "120+",
      awards: "50+",
      satisfaction: "98%",
      placement: "99.4%"
    }
  },

  // Academic Calendar Events (Canadian Bilingual / Nigerian Term calendar inspired)
  calendar: {
    currentYear: 2025,
    currentMonth: 8, // September (0-indexed: 8)
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    events: [
      {
        id: "ev-1",
        date: "2025-09-01",
        day: 1,
        month: 8,
        year: 2025,
        title: "First Installment Term 1 Fees Due",
        category: "finance",
        badge: "Fees Due",
        time: "09:00 AM",
        location: "Bursary / Online Portal",
        desc: "Deadline for first installment payment for the 2025/2026 academic term."
      },
      {
        id: "ev-2",
        date: "2025-09-08",
        day: 8,
        month: 8,
        year: 2025,
        title: "First Day of Term 1 (SSS 1 - 3 & JSS 1 - 3)",
        category: "academic",
        badge: "Resumption",
        time: "07:45 AM",
        location: "Assembly Hall & College Chapel",
        desc: "Official school resumption and orientation assembly for middle and senior secondary scholars."
      },
      {
        id: "ev-3",
        date: "2025-09-10",
        day: 10,
        month: 8,
        year: 2025,
        title: "Early Years & Primary Resumption (Creche - Gr 5)",
        category: "academic",
        badge: "Early Years",
        time: "08:15 AM",
        location: "Bliss Junior Wing",
        desc: "Warm welcome and class orientation for kindergarten and lower elementary pupils."
      },
      {
        id: "ev-4",
        date: "2025-09-17",
        day: 17,
        month: 8,
        year: 2025,
        title: "After-School Robotics & Clubs Commence",
        category: "enrichment",
        badge: "Clubs",
        time: "02:30 PM - 04:30 PM",
        location: "STEM Innovation Hub",
        desc: "Commencement of after-school coding, chess academy, French club, and sports training."
      },
      {
        id: "ev-5",
        date: "2025-09-24",
        day: 24,
        month: 8,
        year: 2025,
        title: "Annual General PTA Meeting & Open House",
        category: "parent",
        badge: "PTA Meeting",
        time: "10:00 AM - 01:00 PM",
        location: "College Multi-Purpose Hall",
        desc: "Meet subject tutors, discuss academic roadmaps, and elect executive parent committee representatives."
      },
      {
        id: "ev-6",
        date: "2025-09-27",
        day: 27,
        month: 8,
        year: 2025,
        title: "Continuous Assessment Test 1 (CA 1)",
        category: "assessment",
        badge: "Assessments",
        time: "09:00 AM",
        location: "Classrooms & CBT Labs",
        desc: "Diagnostic baseline evaluations and continuous assessment tests for all junior and senior levels."
      },
      {
        id: "ev-7",
        date: "2025-10-01",
        day: 1,
        month: 9,
        year: 2025,
        title: "Nigeria National Independence Day Holiday",
        category: "special",
        badge: "Public Holiday",
        time: "All Day",
        location: "Campus Closed",
        desc: "National Independence Day public holiday celebration."
      },
      {
        id: "ev-8",
        date: "2025-10-16",
        day: 16,
        month: 9,
        year: 2025,
        title: "Inter-House Robotics & Science Olympiad",
        category: "academic",
        badge: "STEM Fair",
        time: "09:00 AM - 03:30 PM",
        location: "Auditorium & Science Quad",
        desc: "Annual showcase of student AI rovers, solar energy models, and coding prototypes."
      }
    ]
  },

  // Role: Student Profile & Data (Nigerian Student: Adebayo Adeleke)
  student: {
    id: "STU-8021",
    name: "Adebayo Adeleke",
    role: "student",
    grade: "SSS 2A (Emerald House)",
    avatar: "assets/images/avatar_student.jpg",
    attendanceRate: 97.2,
    currentGPA: "3.88 / 4.0",
    academicPeriod: "Term 1 (Sept 2025 - Dec 2025)",
    institution: "Bliss Academy Senior College, Lekki",
    curriculum: "Cambridge IGCSE & WAEC Curriculum",
    courses: [
      { id: "c-1", code: "MTH-2A", name: "Further Mathematics & Algebra", progress: 88, teacher: "Mrs. Funmilayo Alabi", room: "Room 204", nextClass: "10:00 AM" },
      { id: "c-2", code: "PHY-2A", name: "Physics & Laboratory Inquiry", progress: 82, teacher: "Mr. David Adeleke", room: "Physics Lab", nextClass: "11:30 AM" },
      { id: "c-3", code: "ENG-2A", name: "English Language & Literature", progress: 94, teacher: "Mrs. Brenda Clark-Okon", room: "Room 105", nextClass: "Tomorrow 09:00 AM" },
      { id: "c-4", code: "ROB-2A", name: "Robotics & Software Engineering", progress: 96, teacher: "Engr. Ken Ezechukwu", room: "Innovation Hub", nextClass: "Tomorrow 01:00 PM" }
    ],
    todaySchedule: [
      { id: "s-1", subject: "Further Mathematics", group: "SSS2_MATH_SET_A", time: "10:00 AM - 11:15 AM", room: "Room 204", status: "completed", recordingAvailable: true },
      { id: "s-2", subject: "Pure Physics Lab Practical", group: "SSS2_SCI_GRP_1", time: "11:30 AM - 12:45 PM", room: "Physics Lab", status: "active", teacher: "Mr. David Adeleke" },
      { id: "s-3", subject: "Chemistry: Organic Compounds", group: "SSS2_CHEM_SET_B", time: "01:15 PM - 02:15 PM", room: "Chemistry Lab", status: "upcoming" },
      { id: "s-4", subject: "Coding & Micro-controllers", group: "SSS2_STEM_ROV", time: "02:30 PM - 03:45 PM", room: "Innovation Hub", status: "upcoming" }
    ],
    pendingTasks: [
      { id: "t-1", title: "Calculus Derivatives & Optimization Set", subject: "Further Mathematics", due: "Today, 05:00 PM", status: "pending", priority: "high" },
      { id: "t-2", title: "Ohm's Law Circuit Verification Report", subject: "Physics", due: "Tomorrow, 08:00 AM", status: "pending", priority: "medium" },
      { id: "t-3", title: "WAEC Prose Analysis: Second Class Citizen", subject: "English Literature", due: "Friday, 11:59 PM", status: "in-progress", priority: "normal" }
    ]
  },

  // Role: Parent Profile & Data (Nigerian Parent: Chief Mrs. Folake Adeleke)
  parent: {
    id: "PAR-9042",
    name: "Chief (Mrs.) Folake Adeleke",
    role: "parent",
    email: "folake.adeleke@lagosbusiness.ng",
    phone: "+234 (0) 803 456 7890",
    avatar: "assets/images/avatar_parent.jpg",
    children: [
      {
        id: "STU-8021",
        name: "Adebayo Adeleke",
        grade: "SSS 2A (Emerald House)",
        rollNo: "BA-8012",
        attendance: "97.2%",
        presentDays: 49,
        absentDays: 1,
        excusedDays: 0,
        gpa: "3.88 / 4.0",
        classTeacher: "Mrs. Funmilayo Alabi",
        feeStatus: "partial",
        avatar: "assets/images/avatar_student.jpg"
      },
      {
        id: "STU-5014",
        name: "Zainab Adeleke",
        grade: "Primary 5B (Sapphire House)",
        rollNo: "BA-5014",
        attendance: "98.5%",
        presentDays: 49,
        absentDays: 0,
        excusedDays: 1,
        gpa: "3.95 / 4.0",
        classTeacher: "Mrs. Ngozi Eze",
        feeStatus: "paid",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
      }
    ],
    billing: {
      studentId: "STU-8021",
      studentName: "Adebayo Adeleke (SSS 2A)",
      invoiceNumber: "INV-2025-0892",
      term: "Term 1 & 2 Academic Session (2025/2026)",
      totalBilled: 945000,
      totalPaid: 465000,
      outstandingBalance: 480000,
      dueDate: "15 November 2025",
      items: [
        { desc: "Term 1 Comprehensive Tuition & Science Lab Levy", amount: 450000, status: "PAID", date: "01 Sep 2025" },
        { desc: "Annual ICT Portal Licensing & WAEC Prep Materials", amount: 15000, status: "PAID", date: "01 Sep 2025" },
        { desc: "Term 2 Comprehensive Tuition & Academic Services", amount: 450000, status: "PENDING", date: "Due 15 Nov 2025" },
        { desc: "Robotics STEM Kit & Inter-House Sports Term 2 Levy", amount: 30000, status: "PENDING", date: "Due 15 Nov 2025" }
      ]
    }
  },

  // Role: Teacher Profile & Data (Nigerian Educator: Mrs. Funmilayo Alabi)
  teacher: {
    id: "TCH-3011",
    name: "Mrs. Funmilayo Alabi, M.Ed",
    role: "teacher",
    title: "Head of STEM & Lead Mathematics Faculty",
    department: "Mathematics & Physical Sciences",
    email: "funmilayo.alabi@blissacademy.edu.ng",
    avatar: "assets/images/avatar_teacher.jpg",
    stats: {
      classesToday: 3,
      totalStudents: 86,
      pendingGrading: 5,
      averageGrade: "A- (86.4%)"
    },
    classes: [
      { id: "cls-1", code: "MTH-2A", name: "Further Mathematics SSS 2A", room: "Room 204", studentsCount: 28, nextLecture: "10:00 AM Today" },
      { id: "cls-2", code: "CAL-3", name: "Advanced WAEC / Cambridge Math SSS 3", room: "Room 302", studentsCount: 24, nextLecture: "01:00 PM Today" },
      { id: "cls-3", code: "GEO-1B", name: "Geometry & Spatial Logic JSS 3B", room: "Room 204", studentsCount: 34, nextLecture: "08:30 AM Tomorrow" }
    ],
    roster: [
      { name: "Adebayo Adeleke", roll: "BA-8012", gradeScore: "95% (A*)", attendance: "97.2%", status: "Present" },
      { name: "Chinedu Okafor", roll: "BA-8018", gradeScore: "89% (A)", attendance: "96.0%", status: "Present" },
      { name: "Khadijah Babatunde", roll: "BA-8025", gradeScore: "94% (A*)", attendance: "98.5%", status: "Present" },
      { name: "Emeka Umeh", roll: "BA-8031", gradeScore: "84% (B+)", attendance: "94.0%", status: "Present" },
      { name: "Folake Oladipo", roll: "BA-8038", gradeScore: "91% (A)", attendance: "97.0%", status: "Present" },
      { name: "Tariq Danjuma", roll: "BA-8042", gradeScore: "80% (B)", attendance: "91.5%", status: "Late (5 min)" }
    ]
  },

  // Live Announcements & Social Feed (Qurtubiks Image 1 exact layout)
  announcements: [
    {
      id: "post-101",
      author: "Mrs. Funmilayo Alabi, M.Ed",
      authorRole: "Head of STEM & Mathematics",
      authorAvatar: "assets/images/avatar_teacher.jpg",
      date: "Today at 09:15 AM",
      category: "Academic Project",
      title: "Project Announcement: Solar Energy & Algebra in Action! ☀️📊",
      content: "Dear SSS 2 Scholars & Parents, I am pleased to announce our hands-on terminal STEM project titled 'Algebra in Action: Solar Grid Optimization'. Students will formulate mathematical models representing energy yields from our campus solar installations. Project guidelines and WAEC/Cambridge rubrics have been uploaded.",
      image: "assets/images/bliss_stem_nigeria.jpg",
      likes: 38,
      commentsCount: 9,
      tags: ["SSS 2A", "STEM Project", "Solar Grid"]
    },
    {
      id: "post-102",
      author: "Dr. (Mrs.) Helen Vance-Balogun",
      authorRole: "Principal & Head of School",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      date: "Yesterday at 02:40 PM",
      category: "School Circular",
      title: "Welcome to Academic Session 2025/2026 at Bliss Academy 🎉",
      content: "A hearty welcome to all returning families and new scholars joining our Lekki campus! Over the long vacation, we expanded our artificial intelligence and robotics laboratory, installed campus-wide fiber internet, and refreshed our sports facilities. We look forward to a session of unmatched academic triumphs.",
      image: "assets/images/bliss_hero_nigeria.jpg",
      likes: 84,
      commentsCount: 18,
      tags: ["All School", "Notice", "Principal"]
    },
    {
      id: "post-103",
      author: "Coach Babatunde Adeleke",
      authorRole: "Director of Athletics & Inter-House Sports",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      date: "22 Sep 2025",
      category: "Inter-House Sports",
      title: "Inter-House Swimming Trials & Football Selections 🏊‍♂️⚽",
      content: "Trials for Emerald Falcons, Sapphire Hawks, Topaz Eagles, and Ruby Lions begin this Friday at 03:30 PM on our Olympic standard pool and astro-turf. Students must come in regulation house PE kits.",
      image: null,
      likes: 47,
      commentsCount: 12,
      tags: ["Athletics", "Inter-House"]
    }
  ],

  // Terminal Gradebook Mockup (For Phase 2 Preview Sheet)
  terminalReport: {
    student: {
      name: "Adebayo Adeleke",
      studentId: "BA-8012",
      class: "SSS 2A (Emerald House)",
      term: "Term 1 Final Assessment",
      session: "2025 / 2026",
      position: "2nd of 28 Students",
      average: "92.4%",
      conduct: "Exemplary",
      attendance: "97.2%"
    },
    subjects: [
      { name: "Further Mathematics", caScore: 38, examScore: 57, total: 95, grade: "A1", remark: "Exceptional analytical depth" },
      { name: "English Language & Literature", caScore: 36, examScore: 53, total: 89, grade: "A1", remark: "Eloquent spoken and written prose" },
      { name: "Physics & Lab Practical", caScore: 37, examScore: 54, total: 91, grade: "A1", remark: "Superb lab investigation skill" },
      { name: "Chemistry", caScore: 36, examScore: 52, total: 88, grade: "A1", remark: "Consistent mastery of reaction mechanisms" },
      { name: "Robotics & Software Engineering", caScore: 40, examScore: 58, total: 98, grade: "A1", remark: "Outstanding algorithmic and IoT rover work" },
      { name: "Civic Education & History", caScore: 35, examScore: 49, total: 84, grade: "B2", remark: "Commendable constitutional understanding" },
      { name: "Economics & Data Analytics", caScore: 37, examScore: 53, total: 90, grade: "A1", remark: "Sound macroeconomic reasoning" }
    ],
    teacherRemark: "Adebayo is an exemplary, disciplined, and intellectually inquisitive scholar who consistently models the highest ideals of Bliss Academy.",
    principalRemark: "An outstanding terminal achievement. Highly recommended for the National Olympiad honors squad. — Dr. (Mrs.) Helen Vance-Balogun, Principal"
  },

  // Programs Offered (EduNova inspired)
  programs: [
    {
      id: "prog-stem",
      title: "STEM & Robotics Innovation",
      subtitle: "Autonomous rovers, IoT & coding",
      icon: "robot",
      accent: "#FF6B4A",
      bgGradient: "linear-gradient(135deg, #FFF1EE, #FFE3DC)",
      description: "Equipping young minds with hands-on robotics, drone technology, artificial intelligence basics, and Python programming from primary through secondary school."
    },
    {
      id: "prog-arts",
      title: "Visual, Musical & Dramatic Arts",
      subtitle: "Cultural expression & orchestral music",
      icon: "palette",
      accent: "#8B5CF6",
      bgGradient: "linear-gradient(135deg, #F3EEFF, #E7DCFF)",
      description: "Classical orchestral training, African talking drum & brass ensembles, digital multimedia design, and competitive theatre arts."
    },
    {
      id: "prog-sports",
      title: "Athletics & Physical Mastery",
      subtitle: "Inter-House sports, swimming & tennis",
      icon: "trophy",
      accent: "#10B981",
      bgGradient: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
      description: "Olympic-standard swimming pools, FIFA-standard astro-turf football pitch, tennis courts, and basketball arenas promoting sportsmanship and vigor."
    },
    {
      id: "prog-lang",
      title: "Global Languages & Diplomatic Debates",
      subtitle: "French, Mandarin & African oratory",
      icon: "globe",
      accent: "#2563EB",
      bgGradient: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
      description: "Multilingual proficiency in French, Mandarin, and Yoruba/Igbo/Hausa, combined with Model United Nations debate coaching for future African ambassadors."
    }
  ],

  // Testimonials (Authentic Nigerian Parents)
  testimonials: [
    {
      name: "Engr. Olumide Balogun, FNSE",
      role: "Parent of SSS 2 & JSS 1 Scholars",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      quote: "The robotics and STEM curriculum at Bliss Academy is truly world-class. My son Adebayo has already built autonomous rovers in school! The transparent portal updates give us 100% peace of mind."
    },
    {
      name: "Dr. (Mrs.) Chioma Ezechukwu",
      role: "Consultant Physician & PTA Member",
      avatar: "assets/images/avatar_parent.jpg",
      rating: 5,
      quote: "Bliss Academy strikes the ideal balance between rigorous Cambridge international standards and Nigerian moral values. Being able to track attendance, fees, and homework from my phone is effortless."
    },
    {
      name: "Alhaji Farouk Ibrahim",
      role: "Parent of Primary 4 Scholar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      rating: 5,
      quote: "The dedicated attention from the teachers is exceptional. When I log into the parent portal, I see continuous assessments and teacher circulars immediately. It is the gold standard for Lagos private schools."
    }
  ]
};

// Expose globally
window.BLISS_DATA = BLISS_DATA;
