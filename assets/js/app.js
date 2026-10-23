/**
 * Bliss Academy - Core Application Engine
 * Location: Alihame, Agbor, Delta State, Nigeria
 * Simplified 2-Portal Architecture: Student Portal & Teacher Portal
 * Unified Student Portal includes Attendance, GPA, Conduct & School Fee Booking.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentView: 'website', // 'website' | 'portal'
    currentRole: 'student', // 'student' | 'teacher'
    calendarMonth: 8,       // September (0-indexed: 8)
    calendarYear: 2026,
    selectedDate: null,
    announcements: [...BLISS_DATA.announcements],
    applications: []
  };

  // Load persisted announcements & applications
  try {
    const savedAnnouncements = localStorage.getItem('bliss_announcements_2026');
    if (savedAnnouncements) {
      state.announcements = JSON.parse(savedAnnouncements);
    }
    const savedApps = localStorage.getItem('bliss_applications_2026');
    if (savedApps) {
      state.applications = JSON.parse(savedApps);
    }
  } catch (e) {
    console.warn('Storage warning:', e);
  }

  // DOM Elements
  const publicView = document.getElementById('public-site-view');
  const portalView = document.getElementById('portal-view');
  const studentContent = document.getElementById('student-view-content');
  const teacherContent = document.getElementById('teacher-view-content');
  const roleButtons = document.querySelectorAll('.role-pill-btn');

  /* ==========================================================================
     VIEW SWITCHING (Public Website <-> Portal)
     ========================================================================== */
  function switchToView(viewName) {
    state.currentView = viewName;
    if (viewName === 'portal') {
      publicView.style.display = 'none';
      portalView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderRoleDashboard();
    } else {
      portalView.style.display = 'none';
      publicView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  window.switchToView = switchToView;

  /* ==========================================================================
     ROLE SWITCHING (Student Portal vs Teacher Portal)
     ========================================================================== */
  function switchRole(role) {
    if (!['student', 'teacher'].includes(role)) return;
    state.currentRole = role;

    // Update active pill button
    roleButtons.forEach(btn => {
      if (btn.dataset.role === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderRoleDashboard();
    showToast(`Switched to ${role === 'student' ? 'Student Portal' : 'Teacher Portal'}`, '👤');
  }

  window.switchRole = switchRole;

  // Render the active role dashboard
  function renderRoleDashboard() {
    studentContent.style.display = 'none';
    teacherContent.style.display = 'none';

    const userAvatar = document.getElementById('topbar-user-avatar');
    const userName = document.getElementById('topbar-user-name');
    const userRoleText = document.getElementById('topbar-user-role');

    if (state.currentRole === 'student') {
      studentContent.style.display = 'block';
      userAvatar.src = BLISS_DATA.student.avatar;
      userName.textContent = BLISS_DATA.student.name;
      userRoleText.textContent = `${BLISS_DATA.student.grade}`;
      renderStudentDashboard();
    } else if (state.currentRole === 'teacher') {
      teacherContent.style.display = 'block';
      userAvatar.src = BLISS_DATA.teacher.avatar;
      userName.textContent = BLISS_DATA.teacher.name;
      userRoleText.textContent = 'Senior STEM Lead';
      renderTeacherDashboard();
    }

    renderAnnouncementsFeed();
  }

  /* ==========================================================================
     1-CLICK QUICK DEMO LOGIN
     ========================================================================== */
  function quickDemoLogin(role) {
    switchToView('portal');
    switchRole(role);
    showToast(`Logged into ${role === 'student' ? 'Student Portal' : 'Teacher Portal'}!`, '🚀');
  }

  window.quickDemoLogin = quickDemoLogin;

  /* ==========================================================================
     ROLE 1: STUDENT PORTAL RENDERING
     Consolidates Attendance, Performance/GPA, Conduct, Fees & Schedule
     ========================================================================== */
  function renderStudentDashboard() {
    // 1. Performance & Conduct Elements
    const gpaElem = document.getElementById('stu-gpa-val');
    const attElem = document.getElementById('stu-att-val');
    const rankElem = document.getElementById('stu-rank-val');
    const conductElem = document.getElementById('stu-conduct-val');

    if (gpaElem) gpaElem.textContent = BLISS_DATA.student.performance.gpa;
    if (attElem) attElem.textContent = BLISS_DATA.student.attendance.rate;
    if (rankElem) rankElem.textContent = BLISS_DATA.student.performance.classRank;
    if (conductElem) conductElem.textContent = BLISS_DATA.student.performance.conduct;

    // 2. Fee Booking & Invoicing Card
    const balanceElem = document.getElementById('stu-fee-balance');
    const invoiceTableBody = document.getElementById('stu-invoice-tbody');

    if (balanceElem) {
      balanceElem.textContent = `₦${BLISS_DATA.student.billing.outstandingBalance.toLocaleString()}`;
    }

    if (invoiceTableBody) {
      invoiceTableBody.innerHTML = BLISS_DATA.student.billing.items.map(item => `
        <tr>
          <td><strong>${item.desc}</strong></td>
          <td>₦${item.amount.toLocaleString()}</td>
          <td><span class="status-badge ${item.status === 'PAID' ? 'status-paid' : 'status-pending'}">${item.status}</span></td>
          <td style="color: var(--text-muted);">${item.date}</td>
        </tr>
      `).join('');
    }

    // 3. Today's Timetable
    const scheduleContainer = document.getElementById('student-schedule-list');
    if (scheduleContainer) {
      scheduleContainer.innerHTML = BLISS_DATA.student.todaySchedule.map(item => `
        <div class="schedule-item ${item.status === 'active' ? 'active-class' : ''}">
          <div class="schedule-item-info">
            <h5>${item.subject}</h5>
            <span class="class-time"><i class="fa-regular fa-clock"></i> ${item.time}</span>
          </div>
          <span class="class-room"><i class="fa-solid fa-location-dot"></i> ${item.room}</span>
        </div>
      `).join('');
    }

    // 4. Pending Homework Tasks
    const tasksContainer = document.getElementById('student-tasks-list');
    if (tasksContainer) {
      tasksContainer.innerHTML = BLISS_DATA.student.pendingTasks.map(task => `
        <div class="task-item">
          <input type="checkbox" class="task-checkbox" id="${task.id}" onchange="toggleTaskDone('${task.id}')">
          <div class="task-body">
            <label for="${task.id}" class="task-title">${task.title}</label>
            <div class="task-meta">${task.subject} &bull; Due: ${task.due}</div>
          </div>
        </div>
      `).join('');
    }
  }

  window.toggleTaskDone = function(taskId) {
    showToast('Task marked as completed! 🎉', '✅');
  };

  /* ==========================================================================
     ROLE 2: TEACHER PORTAL RENDERING
     Class Roster, Lecture Schedule, and Working Announcement Composer
     ========================================================================== */
  function renderTeacherDashboard() {
    const rosterContainer = document.getElementById('teacher-roster-list');
    if (rosterContainer) {
      rosterContainer.innerHTML = BLISS_DATA.teacher.roster.map(st => `
        <div class="roster-student-item">
          <div>
            <div class="student-roster-name">${st.name}</div>
            <div class="student-roster-roll">${st.roll} &bull; Att: ${st.attendance}</div>
          </div>
          <span class="roster-score">${st.score}</span>
        </div>
      `).join('');
    }
  }

  // Working Post / Announcement publisher for Teachers
  const publishBtn = document.getElementById('btn-publish-announcement');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('new-post-title');
      const contentInput = document.getElementById('new-post-content');
      const categorySelect = document.getElementById('new-post-category');

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      const category = categorySelect ? categorySelect.value : 'Academic Notice';

      if (!title || !content) {
        showToast('Please enter both title and message content!', '⚠️');
        return;
      }

      const newPost = {
        id: `post-${Date.now()}`,
        author: BLISS_DATA.teacher.name,
        authorRole: BLISS_DATA.teacher.title,
        authorAvatar: BLISS_DATA.teacher.avatar,
        date: 'Just now',
        category: category,
        title: title,
        content: content,
        image: null,
        likes: 1,
        commentsCount: 0,
        tags: ['Live Feed', 'SSS 2A']
      };

      state.announcements.unshift(newPost);

      try {
        localStorage.setItem('bliss_announcements_2026', JSON.stringify(state.announcements));
      } catch (e) {
        console.warn(e);
      }

      titleInput.value = '';
      contentInput.value = '';

      renderAnnouncementsFeed();
      showToast('🎉 Announcement published live to Student Portal!', '📢');
    });
  }

  /* ==========================================================================
     LIVE FEED STREAM RENDERING
     ========================================================================== */
  function renderAnnouncementsFeed() {
    const feedContainers = [
      document.getElementById('student-feed-container'),
      document.getElementById('teacher-feed-container')
    ];

    const feedHtml = state.announcements.map(post => `
      <div class="feed-post-card">
        <div class="post-card-author">
          <div class="author-meta-block">
            <img src="${post.authorAvatar}" alt="${post.author}">
            <div class="author-name-text">
              <h4>${post.author}</h4>
              <span>${post.authorRole} &bull; ${post.date}</span>
            </div>
          </div>
          <span class="post-category-tag">${post.category}</span>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-content">${post.content}</p>
        ${post.image ? `
          <div class="post-media-image">
            <img src="${post.image}" alt="Post Media">
          </div>
        ` : ''}
        <div class="post-actions-strip">
          <button class="post-action-btn" onclick="likePost('${post.id}', this)">
            <i class="fa-regular fa-thumbs-up"></i> <span>${post.likes} Likes</span>
          </button>
          <button class="post-action-btn" onclick="openCommentToast()">
            <i class="fa-regular fa-comment"></i> <span>${post.commentsCount} Comments</span>
          </button>
          <button class="post-action-btn" onclick="sharePost()">
            <i class="fa-solid fa-share-nodes"></i> <span>Share</span>
          </button>
        </div>
      </div>
    `).join('');

    feedContainers.forEach(container => {
      if (container) container.innerHTML = feedHtml;
    });
  }

  window.likePost = function(postId, btnElement) {
    const post = state.announcements.find(p => p.id === postId);
    if (post) {
      post.likes++;
      btnElement.querySelector('span').textContent = `${post.likes} Likes`;
      btnElement.style.color = 'var(--accent-coral)';
      showToast('Post liked!', '❤️');
    }
  };

  window.openCommentToast = function() {
    showToast('Class discussion channel active.', '💬');
  };

  window.sharePost = function() {
    showToast('Link copied to clipboard for WhatsApp sharing!', '🔗');
  };

  /* ==========================================================================
     INTERACTIVE ACADEMIC CALENDAR (2026/2027 Session)
     ========================================================================== */
  function initCalendar() {
    renderCalendarMonths();
    renderCalendarDays();
    renderAgendaEvents();
  }

  function renderCalendarMonths() {
    const monthsContainer = document.getElementById('cal-months-list');
    if (!monthsContainer) return;

    monthsContainer.innerHTML = BLISS_DATA.calendar.months.map((m, idx) => `
      <button class="month-btn ${idx === state.calendarMonth ? 'active' : ''}" onclick="selectCalendarMonth(${idx})">
        ${m}
      </button>
    `).join('');
  }

  window.selectCalendarMonth = function(monthIdx) {
    state.calendarMonth = monthIdx;
    state.selectedDate = null;
    renderCalendarMonths();
    renderCalendarDays();
    renderAgendaEvents();
    showToast(`Viewing calendar for ${BLISS_DATA.calendar.months[monthIdx]} 2026`, '📅');
  };

  function renderCalendarDays() {
    const gridContainer = document.getElementById('cal-days-grid');
    const label = document.getElementById('cal-month-name-label');
    if (!gridContainer || !label) return;

    label.textContent = `${BLISS_DATA.calendar.months[state.calendarMonth]} ${state.calendarYear}`;

    const firstDayIndex = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
    const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

    let cellsHtml = '';

    for (let i = 0; i < firstDayIndex; i++) {
      cellsHtml += `<div class="cal-day-cell inactive"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = BLISS_DATA.calendar.events.some(
        e => e.month === state.calendarMonth && e.day === day && e.year === state.calendarYear
      );
      const isSelected = state.selectedDate === day;

      cellsHtml += `
        <div class="cal-day-cell ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}" onclick="selectCalendarDay(${day})">
          <span>${day}</span>
        </div>
      `;
    }

    gridContainer.innerHTML = cellsHtml;
  }

  window.selectCalendarDay = function(day) {
    state.selectedDate = day;
    renderCalendarDays();
    renderAgendaEvents();
  };

  function renderAgendaEvents() {
    const agendaContainer = document.getElementById('agenda-events-container');
    const agendaTitle = document.getElementById('agenda-filter-title');
    if (!agendaContainer) return;

    let filteredEvents = BLISS_DATA.calendar.events.filter(e => e.month === state.calendarMonth);

    if (state.selectedDate) {
      filteredEvents = filteredEvents.filter(e => e.day === state.selectedDate);
      if (agendaTitle) agendaTitle.textContent = `Events on ${BLISS_DATA.calendar.months[state.calendarMonth]} ${state.selectedDate}, 2026`;
    } else {
      if (agendaTitle) agendaTitle.textContent = `Events for ${BLISS_DATA.calendar.months[state.calendarMonth]} 2026`;
    }

    if (filteredEvents.length === 0) {
      agendaContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
          <i class="fa-regular fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
          <p style="font-size: 0.88rem;">No events scheduled for this selected date.</p>
          <button onclick="clearDateFilter()" style="margin-top: 10px; color: var(--accent-coral); font-weight: 700; font-size: 0.8rem; text-decoration: underline;">Show all month events</button>
        </div>
      `;
      return;
    }

    agendaContainer.innerHTML = filteredEvents.map(event => `
      <div class="agenda-event-card" onclick="showEventDetails('${event.id}')">
        <span class="event-category-badge cat-${event.category}">${event.badge}</span>
        <h5>${event.title}</h5>
        <div class="event-meta-info">
          <span><i class="fa-regular fa-clock"></i> ${event.time}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${event.location}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px; line-height: 1.4;">${event.desc}</p>
      </div>
    `).join('');
  }

  window.clearDateFilter = function() {
    state.selectedDate = null;
    renderCalendarDays();
    renderAgendaEvents();
  };

  window.showEventDetails = function(eventId) {
    const event = BLISS_DATA.calendar.events.find(e => e.id === eventId);
    if (event) {
      showToast(`Selected: ${event.title}`, '📌');
    }
  };

  /* ==========================================================================
     ONLINE ADMISSION / APPLICATION FORM
     ========================================================================== */
  const admissionForm = document.getElementById('enrollment-application-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('app-student-name').value.trim();
      const parentName = document.getElementById('app-parent-name').value.trim();
      const parentEmail = document.getElementById('app-parent-email').value.trim();
      const parentPhone = document.getElementById('app-parent-phone').value.trim();
      const gradeApplying = document.getElementById('app-grade-select').value;
      const learningMode = document.getElementById('app-learning-mode').value;

      if (!studentName || !parentName || !parentEmail || !parentPhone) {
        showToast('Please fill out all required fields!', '⚠️');
        return;
      }

      const referenceCode = `BLISS-2026-APP-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp = {
        ref: referenceCode,
        studentName,
        parentName,
        parentEmail,
        parentPhone,
        gradeApplying,
        learningMode,
        timestamp: new Date().toISOString()
      };

      state.applications.push(newApp);
      try {
        localStorage.setItem('bliss_applications_2026', JSON.stringify(state.applications));
      } catch (err) {
        console.warn(err);
      }

      const formInner = document.getElementById('admission-modal-inner');
      if (formInner) {
        formInner.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--success-green-light); color: var(--success-green); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 18px;">
              <i class="fa-solid fa-check"></i>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 8px;">Application Submitted Successfully! 🚀</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 24px;">Thank you, <strong>${parentName}</strong>. We have received your application for <strong>${studentName}</strong>.</p>
            
            <div style="background: var(--neutral-bg); border: 2px dashed var(--accent-coral); border-radius: var(--radius-md); padding: 20px; max-width: 440px; margin: 0 auto 24px; text-align: left;">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; letter-spacing: 0.5px;">Official Application Reference</div>
              <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 900; color: var(--accent-coral); margin: 4px 0 12px;">${referenceCode}</div>
              <div style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
                <div><strong>Grade Level:</strong> ${gradeApplying}</div>
                <div><strong>Mode:</strong> ${learningMode}</div>
                <div><strong>Location:</strong> Alihame, Agbor, Delta State</div>
              </div>
            </div>

            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 24px;">The Admissions Office will contact you within 24 hours to schedule the entrance interview.</p>
            
            <div style="display: flex; gap: 12px; justify-content: center;">
              <button class="btn-hero-primary" onclick="printApplicationSlip('${referenceCode}', '${studentName}', '${gradeApplying}')">
                <i class="fa-solid fa-print"></i> Print Voucher
              </button>
              <button class="btn-hero-secondary" onclick="closeModal('admission-modal')">
                Close
              </button>
            </div>
          </div>
        `;
      }

      showToast(`Application ${referenceCode} logged!`, '🎉');
    });
  }

  window.printApplicationSlip = function(code, name, grade) {
    showToast(`Printing voucher for ${name} (${code})`, '🖨️');
    window.print();
  };

  /* ==========================================================================
     PHASE 2 MODALS & PAYMENT SIMULATION
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  window.openPhase2Modal = function(type) {
    if (type === 'fee-gateway') {
      openModal('payment-gateway-modal');
    } else if (type === 'gradebook') {
      openModal('gradebook-modal');
    } else if (type === 'cbt-exams') {
      openModal('cbt-modal');
    } else {
      showToast('This advanced module is scheduled for Phase 2.', '🚀');
    }
  };

  // Simulate Instant Demo Payment (Directly updates Student Portal Fees)
  window.simulatePaymentSuccess = function() {
    const payBtn = document.getElementById('btn-simulate-pay');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing with Bank...';
    }

    setTimeout(() => {
      // Update student billing state
      BLISS_DATA.student.billing.outstandingBalance = 0;
      BLISS_DATA.student.billing.items.forEach(i => i.status = 'PAID');
      
      closeModal('payment-gateway-modal');
      renderStudentDashboard();

      showToast('Payment of ₦480,000 Verified! Official receipt generated.', '💳');
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Authorize Demo Payment (₦480,000)';
      }
    }, 1200);
  };

  /* ==========================================================================
     MOBILE HAMBURGER & BOTTOM NAV TAB SWITCHING
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer-menu');
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });
  }

  window.toggleMobileMenu = function() {
    const mobileDrawer = document.getElementById('mobile-drawer-menu');
    if (mobileDrawer) {
      mobileDrawer.classList.toggle('active');
    }
  };

  window.mobileNavSwitch = function(tabName) {
    document.querySelectorAll('.mob-nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (tabName === 'home') {
      if (state.currentView !== 'portal') switchToView('portal');
      switchRole('student');
    } else if (tabName === 'feed') {
      if (state.currentView !== 'portal') switchToView('portal');
      switchRole('student');
      document.getElementById('student-feed-container')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabName === 'fees') {
      if (state.currentView !== 'portal') switchToView('portal');
      switchRole('student');
      window.openPhase2Modal('fee-gateway');
    } else if (tabName === 'teacher') {
      if (state.currentView !== 'portal') switchToView('portal');
      switchRole('teacher');
    }
  };

  /* ==========================================================================
     TOAST NOTIFICATION ENGINE
     ========================================================================== */
  function showToast(message, icon = '💡') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  window.showToast = showToast;

  // Initialize
  initCalendar();
  renderAnnouncementsFeed();
});
