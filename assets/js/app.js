/**
 * Bliss Academy - Core Application Logic
 * Powers Public Website, Role-based Dashboards (Student, Parent, Teacher),
 * Interactive Academic Calendar, Working Announcement Publisher,
 * Admission Form Submissions, and Phase 2 Pitch Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentView: 'website', // 'website' | 'portal'
    currentRole: 'student', // 'student' | 'parent' | 'teacher'
    calendarMonth: 8,       // September (0-indexed: 8)
    calendarYear: 2025,
    selectedDate: null,
    activeChildId: 'STU-8021',
    announcements: [...BLISS_DATA.announcements],
    applications: []
  };

  // Load persisted announcements & applications from localStorage
  try {
    const savedAnnouncements = localStorage.getItem('bliss_announcements');
    if (savedAnnouncements) {
      state.announcements = JSON.parse(savedAnnouncements);
    }
    const savedApps = localStorage.getItem('bliss_applications');
    if (savedApps) {
      state.applications = JSON.parse(savedApps);
    }
  } catch (e) {
    console.warn('LocalStorage access error:', e);
  }

  // DOM Elements
  const publicView = document.getElementById('public-site-view');
  const portalView = document.getElementById('portal-view');
  const studentContent = document.getElementById('student-view-content');
  const parentContent = document.getElementById('parent-view-content');
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

  // Expose to window for inline onclicks
  window.switchToView = switchToView;

  /* ==========================================================================
     ROLE SWITCHING (Student, Parent, Teacher)
     ========================================================================== */
  function switchRole(role) {
    if (!['student', 'parent', 'teacher'].includes(role)) return;
    state.currentRole = role;

    // Update active pill button in topbar
    roleButtons.forEach(btn => {
      if (btn.dataset.role === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderRoleDashboard();
    showToast(`Switched to ${role.toUpperCase()} View`, '👤');
  }

  window.switchRole = switchRole;

  // Render the active role dashboard
  function renderRoleDashboard() {
    studentContent.style.display = 'none';
    parentContent.style.display = 'none';
    teacherContent.style.display = 'none';

    const userAvatar = document.getElementById('topbar-user-avatar');
    const userName = document.getElementById('topbar-user-name');
    const userRoleText = document.getElementById('topbar-user-role');

    if (state.currentRole === 'student') {
      studentContent.style.display = 'block';
      userAvatar.src = BLISS_DATA.student.avatar;
      userName.textContent = BLISS_DATA.student.name;
      userRoleText.textContent = `${BLISS_DATA.student.grade} Scholar`;
      renderStudentDashboard();
    } else if (state.currentRole === 'parent') {
      parentContent.style.display = 'block';
      userAvatar.src = BLISS_DATA.parent.avatar;
      userName.textContent = BLISS_DATA.parent.name;
      userRoleText.textContent = 'Parent / Guardian';
      renderParentDashboard();
    } else if (state.currentRole === 'teacher') {
      teacherContent.style.display = 'block';
      userAvatar.src = BLISS_DATA.teacher.avatar;
      userName.textContent = BLISS_DATA.teacher.name;
      userRoleText.textContent = 'Faculty Head';
      renderTeacherDashboard();
    }

    // Always re-render live feed on role change
    renderAnnouncementsFeed();
  }

  /* ==========================================================================
     QUICK ONE-TAP DEMO LOGIN (For Pitch Presentations)
     ========================================================================== */
  function quickDemoLogin(role) {
    switchToView('portal');
    switchRole(role);
    showToast(`Welcome! Logged in as Demo ${role.toUpperCase()}`, '🚀');
  }

  window.quickDemoLogin = quickDemoLogin;

  /* ==========================================================================
     ROLE 1: STUDENT DASHBOARD RENDERING
     ========================================================================== */
  function renderStudentDashboard() {
    // Schedule rendering
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

    // Tasks rendering
    const tasksContainer = document.getElementById('student-tasks-list');
    if (tasksContainer) {
      tasksContainer.innerHTML = BLISS_DATA.student.pendingTasks.map(task => `
        <div class="task-item">
          <input type="checkbox" class="task-checkbox" id="${task.id}" onchange="toggleTaskDone('${task.id}')">
          <div class="task-body">
            <label for="${task.id}" class="task-title">${task.title}</label>
            <div class="task-meta">${task.subject} • Due: ${task.due}</div>
          </div>
        </div>
      `).join('');
    }
  }

  window.toggleTaskDone = function(taskId) {
    showToast('Task marked as completed! 🎉', '✅');
  };

  /* ==========================================================================
     ROLE 2: PARENT DASHBOARD RENDERING
     ========================================================================== */
  function renderParentDashboard() {
    const activeChild = BLISS_DATA.parent.children.find(c => c.id === state.activeChildId) || BLISS_DATA.parent.children[0];

    // Child switcher buttons
    const childListContainer = document.getElementById('parent-child-pills');
    if (childListContainer) {
      childListContainer.innerHTML = BLISS_DATA.parent.children.map(child => `
        <button class="child-select-btn ${child.id === activeChild.id ? 'active' : ''}" onclick="selectChild('${child.id}')">
          <img src="${child.avatar}" alt="${child.name}">
          <span><strong>${child.name}</strong> (${child.grade.split(' ')[0]})</span>
        </button>
      `).join('');
    }

    // Update child stats
    document.getElementById('child-attendance-val').textContent = activeChild.attendance;
    document.getElementById('child-present-days').textContent = `${activeChild.presentDays} of 50 school days`;
    document.getElementById('child-gpa-val').textContent = activeChild.gpa;
    document.getElementById('child-teacher-val').textContent = activeChild.classTeacher;

    // Render invoice breakdown
    const invoiceTableBody = document.getElementById('parent-invoice-tbody');
    if (invoiceTableBody) {
      invoiceTableBody.innerHTML = BLISS_DATA.parent.billing.items.map(item => `
        <tr>
          <td><strong>${item.desc}</strong></td>
          <td>₦${item.amount.toLocaleString()}</td>
          <td><span class="status-badge ${item.status === 'PAID' ? 'status-paid' : 'status-pending'}">${item.status}</span></td>
          <td style="color: var(--text-muted);">${item.date}</td>
        </tr>
      `).join('');
    }

    document.getElementById('parent-due-balance').textContent = `₦${BLISS_DATA.parent.billing.outstandingBalance.toLocaleString()}`;
  }

  window.selectChild = function(childId) {
    state.activeChildId = childId;
    renderParentDashboard();
    showToast(`Viewing details for ${state.activeChildId === 'STU-8021' ? 'Alex Rivera' : 'Maya Rivera'}`, '👶');
  };

  /* ==========================================================================
     ROLE 3: TEACHER DASHBOARD & LIVE POST CREATOR (Qurtubiks Image 1)
     ========================================================================== */
  function renderTeacherDashboard() {
    // Render roster
    const rosterContainer = document.getElementById('teacher-roster-list');
    if (rosterContainer) {
      rosterContainer.innerHTML = BLISS_DATA.teacher.roster.map(st => `
        <div class="roster-student-item">
          <div>
            <div class="student-roster-name">${st.name}</div>
            <div class="student-roster-roll">${st.roll} • Att: ${st.attendance}</div>
          </div>
          <span class="roster-score">${st.gradeScore}</span>
        </div>
      `).join('');
    }
  }

  // Working Post / Announcement publisher
  const publishBtn = document.getElementById('btn-publish-announcement');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('new-post-title');
      const contentInput = document.getElementById('new-post-content');
      const categorySelect = document.getElementById('new-post-category');

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      const category = categorySelect ? categorySelect.value : 'Announcement';

      if (!title || !content) {
        showToast('Please enter both a title and message content!', '⚠️');
        return;
      }

      // Create new announcement object
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
        tags: ['Live Feed', 'Grade 8A']
      };

      // Prepend to array
      state.announcements.unshift(newPost);

      // Persist to localStorage
      try {
        localStorage.setItem('bliss_announcements', JSON.stringify(state.announcements));
      } catch (e) {
        console.warn(e);
      }

      // Clear inputs
      titleInput.value = '';
      contentInput.value = '';

      // Re-render
      renderAnnouncementsFeed();
      showToast('🎉 Announcement published live to students & parents!', '📢');
    });
  }

  /* ==========================================================================
     LIVE FEED RENDERING (Shared across all views)
     ========================================================================== */
  function renderAnnouncementsFeed() {
    const feedContainers = [
      document.getElementById('student-feed-container'),
      document.getElementById('teacher-feed-container'),
      document.getElementById('parent-feed-container')
    ];

    const feedHtml = state.announcements.map(post => `
      <div class="feed-post-card">
        <div class="post-card-author">
          <div class="author-meta-block">
            <img src="${post.authorAvatar}" alt="${post.author}">
            <div class="author-name-text">
              <h4>${post.author}</h4>
              <span>${post.authorRole} • ${post.date}</span>
            </div>
          </div>
          <span class="post-category-tag">${post.category}</span>
        </div>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-content">${post.content}</p>
        ${post.image ? `
          <div class="post-media-image">
            <img src="${post.image}" alt="Post Image">
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
    showToast('Student & parent discussion thread active.', '💬');
  };

  window.sharePost = function() {
    showToast('Link copied to clipboard for WhatsApp sharing!', '🔗');
  };

  /* ==========================================================================
     INTERACTIVE ACADEMIC CALENDAR (Canadian Bilingual School inspired)
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
    showToast(`Viewing calendar for ${BLISS_DATA.calendar.months[monthIdx]} 2025`, '📅');
  };

  function renderCalendarDays() {
    const gridContainer = document.getElementById('cal-days-grid');
    const label = document.getElementById('cal-month-name-label');
    if (!gridContainer || !label) return;

    label.textContent = `${BLISS_DATA.calendar.months[state.calendarMonth]} ${state.calendarYear}`;

    // Calculate days in month & first day index
    const firstDayIndex = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
    const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

    let cellsHtml = '';

    // Empty lead cells
    for (let i = 0; i < firstDayIndex; i++) {
      cellsHtml += `<div class="cal-day-cell inactive"></div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      // Check if this day has events
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
      if (agendaTitle) agendaTitle.textContent = `Events on ${BLISS_DATA.calendar.months[state.calendarMonth]} ${state.selectedDate}, 2025`;
    } else {
      if (agendaTitle) agendaTitle.textContent = `All Events for ${BLISS_DATA.calendar.months[state.calendarMonth]} 2025`;
    }

    if (filteredEvents.length === 0) {
      agendaContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
          <i class="fa-regular fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
          <p style="font-size: 0.88rem;">No events scheduled for this selected date.</p>
          <button onclick="clearDateFilter()" style="margin-top: 10px; color: var(--accent-coral); font-weight: 700; font-size: 0.8rem; text-decoration: underline;">Show full month schedule</button>
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
      showToast(`Selected: ${event.title} (${event.time})`, '📌');
    }
  };

  /* ==========================================================================
     ONLINE ADMISSION / APPLICATION FORM (Qurtubiks Form 16208f89... inspired)
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

      const referenceCode = `BLISS-2025-APP-${Math.floor(1000 + Math.random() * 9000)}`;
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
        localStorage.setItem('bliss_applications', JSON.stringify(state.applications));
      } catch (err) {
        console.warn(err);
      }

      // Display Success State inside modal
      const formInner = document.getElementById('admission-modal-inner');
      if (formInner) {
        formInner.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--success-green-light); color: var(--success-green); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 18px;">
              <i class="fa-solid fa-check"></i>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 8px;">Application Submitted Successfully! 🚀</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 24px;">Thank you, <strong>${parentName}</strong>. We have received your enrollment application for <strong>${studentName}</strong>.</p>
            
            <div style="background: var(--neutral-bg); border: 2px dashed var(--accent-coral); border-radius: var(--radius-md); padding: 20px; max-width: 440px; margin: 0 auto 24px; text-align: left;">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; letter-spacing: 0.5px;">Official Application Reference</div>
              <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 900; color: var(--accent-coral); margin: 4px 0 12px;">${referenceCode}</div>
              <div style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
                <div><strong>Grade Level:</strong> ${gradeApplying}</div>
                <div><strong>Mode:</strong> ${learningMode}</div>
                <div><strong>Confirmation Sent To:</strong> ${parentEmail}</div>
              </div>
            </div>

            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 24px;">Our Admissions Team will contact you within 24 hours to schedule the diagnostic baseline interview.</p>
            
            <div style="display: flex; gap: 12px; justify-content: center;">
              <button class="btn-hero-primary" onclick="printApplicationSlip('${referenceCode}', '${studentName}', '${gradeApplying}')">
                <i class="fa-solid fa-print"></i> Print Slip
              </button>
              <button class="btn-hero-secondary" onclick="closeModal('admission-modal')">
                Close
              </button>
            </div>
          </div>
        `;
      }

      showToast(`Application ${referenceCode} logged successfully!`, '🎉');
    });
  }

  window.printApplicationSlip = function(code, name, grade) {
    showToast(`Printing enrollment voucher for ${name} (${code})`, '🖨️');
    window.print();
  };

  /* ==========================================================================
     PHASE 2 "COMING SOON" STRATEGIC PITCH MODALS
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

  // Strategic Phase 2 Opener
  window.openPhase2Modal = function(type) {
    if (type === 'fee-gateway') {
      openModal('payment-gateway-modal');
    } else if (type === 'gradebook') {
      openModal('gradebook-modal');
    } else if (type === 'cbt-exams') {
      openModal('cbt-modal');
    } else {
      showToast('This advanced module is scheduled for Phase 2 implementation.', '🚀');
    }
  };

  // Simulate Instant Demo Payment
  window.simulatePaymentSuccess = function() {
    const payBtn = document.getElementById('btn-simulate-pay');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing with Bank...';
    }

    setTimeout(() => {
      // Update balance
      BLISS_DATA.parent.billing.outstandingBalance = 0;
      BLISS_DATA.parent.billing.items.forEach(i => i.status = 'PAID');
      
      closeModal('payment-gateway-modal');
      renderParentDashboard();

      showToast('Payment of ₦480,000 Verified! Receipt emailed to parent.', '💳');
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Authorize Payment (₦480,000)';
      }
    }, 1500);
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
      switchRole('teacher');
    } else if (tabName === 'fees') {
      if (state.currentView !== 'portal') switchToView('portal');
      switchRole('parent');
      window.openPhase2Modal('fee-gateway');
    } else if (tabName === 'profile') {
      openModal('demo-selector-modal');
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
    }, 3500);
  }

  window.showToast = showToast;

  // Initialize all components
  initCalendar();
  renderAnnouncementsFeed();
  console.log('Bliss Academy MVP Initialized Successfully.');
});
