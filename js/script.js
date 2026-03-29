// ===== GLOBAL: Theme Toggle =====
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ===== GLOBAL: Mobile Nav =====
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ===== GLOBAL: Active Nav Link =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== GLOBAL: Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ===== HOME: Typing Effect =====
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Chào mừng đến lớp học thông minh! 📚',
    'Học tập hiệu quả với công nghệ 💡',
    'Kiểm tra kiến thức mọi lúc mọi nơi ✅',
    'Giải trí lành mạnh sau giờ học 🎮',
    'Sáng tạo không giới hạn 🚀'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.innerHTML = currentPhrase.substring(0, charIndex) + '<span class="cursor"></span>';

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    timeout = setTimeout(type, delay);
  }

  type();
}

// ===== HOME: Counter Animation =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

// ===== QUIZ ENGINE =====
const quizData = [
  {
    question: "HTML là viết tắt của gì?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "CSS dùng để làm gì trong trang web?",
    options: [
      "Xử lý dữ liệu",
      "Tạo cấu trúc trang",
      "Trang trí và định dạng giao diện",
      "Kết nối cơ sở dữ liệu"
    ],
    correct: 2
  },
  {
    question: "Thẻ nào dùng để tạo liên kết (link) trong HTML?",
    options: [
      "&lt;link&gt;",
      "&lt;a&gt;",
      "&lt;href&gt;",
      "&lt;url&gt;"
    ],
    correct: 1
  },
  {
    question: "JavaScript có thể chạy ở đâu?",
    options: [
      "Chỉ trên máy chủ",
      "Chỉ trên trình duyệt",
      "Cả trình duyệt và máy chủ",
      "Chỉ trên điện thoại"
    ],
    correct: 2
  },
  {
    question: "Thuộc tính CSS nào dùng để thay đổi màu chữ?",
    options: [
      "font-color",
      "text-color",
      "color",
      "foreground-color"
    ],
    correct: 2
  },
  {
    question: "Đâu là cách khai báo biến đúng trong JavaScript?",
    options: [
      "variable x = 5;",
      "let x = 5;",
      "v x = 5;",
      "int x = 5;"
    ],
    correct: 1
  },
  {
    question: "Thẻ HTML nào tạo danh sách có thứ tự?",
    options: [
      "&lt;ul&gt;",
      "&lt;list&gt;",
      "&lt;ol&gt;",
      "&lt;dl&gt;"
    ],
    correct: 2
  },
  {
    question: "Đơn vị 'px' trong CSS nghĩa là gì?",
    options: [
      "Percent",
      "Pixel",
      "Point",
      "Pica"
    ],
    correct: 1
  },
  {
    question: "Phím tắt nào mở Developer Tools trên Chrome?",
    options: [
      "Ctrl + D",
      "Ctrl + Shift + I",
      "Ctrl + Alt + T",
      "F5"
    ],
    correct: 1
  },
  {
    question: "Flexbox trong CSS giúp làm gì?",
    options: [
      "Tạo animation",
      "Bố trí layout linh hoạt",
      "Thêm hình ảnh",
      "Kết nối API"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

function initQuiz() {
  const quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  answered = false;
  renderQuestion();
}

function renderQuestion() {
  const quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  const q = quizData[currentQuestion];
  const progress = ((currentQuestion) / quizData.length) * 100;

  quizCard.innerHTML = `
    <div class="quiz-progress">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="quiz-progress-text">Câu ${currentQuestion + 1}/${quizData.length}</div>
    </div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectAnswer(${i})" id="option-${i}">
          <div class="option-letter">${String.fromCharCode(65 + i)}</div>
          <span>${opt}</span>
        </div>
      `).join('')}
    </div>
    <div class="quiz-actions">
      <div></div>
      <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()" disabled>
        ${currentQuestion === quizData.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} →
      </button>
    </div>
  `;
}

function selectAnswer(index) {
  if (answered) return;

  selectedAnswer = index;
  answered = true;

  const correct = quizData[currentQuestion].correct;

  document.querySelectorAll('.quiz-option').forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === correct) {
      opt.classList.add('correct');
    } else if (i === index && i !== correct) {
      opt.classList.add('wrong');
    }
  });

  if (index === correct) score++;

  document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;
  selectedAnswer = null;
  answered = false;

  if (currentQuestion >= quizData.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  const quizCard = document.getElementById('quizCard');
  const percentage = Math.round((score / quizData.length) * 100);
  let emoji = '🎉';
  let message = 'Xuất sắc! Bạn nắm vững kiến thức rất tốt!';

  if (percentage < 50) {
    emoji = '💪';
    message = 'Cần cố gắng thêm! Hãy ôn lại bài nhé.';
  } else if (percentage < 80) {
    emoji = '👍';
    message = 'Khá tốt! Tiếp tục phát huy nhé!';
  }

  quizCard.innerHTML = `
    <div class="quiz-result">
      <div class="result-icon">${emoji}</div>
      <h2>Hoàn thành bài kiểm tra!</h2>
      <div class="result-score">${score}/${quizData.length}</div>
      <p>${message}</p>
      <div class="quiz-progress">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="quiz-progress-text">${percentage}%</div>
      </div>
      <button class="btn btn-primary mt-40" onclick="initQuiz()">🔄 Làm lại</button>
    </div>
  `;
}

// ===== RPS GAME =====
let rpsScore = { wins: 0, losses: 0, draws: 0 };

function playRPS(playerChoice) {
  const choices = ['✊', '✋', '✌️'];
  const names = ['Búa', 'Bao', 'Kéo'];
  const computerIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[computerIndex];
  const playerIndex = choices.indexOf(playerChoice);

  // Highlight active
  document.querySelectorAll('.rps-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  let result, resultClass;

  if (playerIndex === computerIndex) {
    result = 'Hòa!';
    resultClass = 'draw';
    rpsScore.draws++;
  } else if (
    (playerIndex === 0 && computerIndex === 2) ||
    (playerIndex === 1 && computerIndex === 0) ||
    (playerIndex === 2 && computerIndex === 1)
  ) {
    result = 'Bạn thắng! 🎉';
    resultClass = 'win';
    rpsScore.wins++;
  } else {
    result = 'Bạn thua! 😅';
    resultClass = 'lose';
    rpsScore.losses++;
  }

  const resultDiv = document.getElementById('rpsResult');
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div style="font-size: 2rem; margin-bottom: 8px;">
        ${playerChoice} vs ${computerChoice}
      </div>
      <div class="result-text ${resultClass}">${result}</div>
    `;
  }

  const scoreDiv = document.getElementById('rpsScoreBoard');
  if (scoreDiv) {
    scoreDiv.innerHTML = `
      Thắng: <span>${rpsScore.wins}</span> &nbsp;|&nbsp; 
      Thua: <span>${rpsScore.losses}</span> &nbsp;|&nbsp; 
      Hòa: <span>${rpsScore.draws}</span>
    `;
  }
}

// ===== MEMORY CARD GAME =====
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryLocked = false;

function initMemoryGame() {
  const board = document.getElementById('memoryBoard');
  if (!board) return;

  const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'];
  memoryCards = [...emojis, ...emojis];
  flippedCards = [];
  matchedPairs = 0;
  memoryMoves = 0;
  memoryLocked = false;

  // Shuffle
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
  }

  board.innerHTML = memoryCards.map((emoji, i) => `
    <div class="memory-card" onclick="flipCard(${i})" id="mcard-${i}">
      <div class="card-front">?</div>
      <div class="card-back">${emoji}</div>
    </div>
  `).join('');

  updateMemoryStats();
}

function flipCard(index) {
  if (memoryLocked) return;
  const card = document.getElementById(`mcard-${index}`);
  if (!card || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length >= 2) return;

  card.classList.add('flipped');
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    memoryMoves++;
    memoryLocked = true;
    updateMemoryStats();

    const [first, second] = flippedCards;

    if (memoryCards[first] === memoryCards[second]) {
      // Match!
      setTimeout(() => {
        document.getElementById(`mcard-${first}`).classList.add('matched');
        document.getElementById(`mcard-${second}`).classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        memoryLocked = false;

        if (matchedPairs === 8) {
          setTimeout(() => {
            alert(`🎉 Chúc mừng! Bạn hoàn thành trong ${memoryMoves} lượt!`);
          }, 300);
        }
      }, 400);
    } else {
      // No match
      setTimeout(() => {
        document.getElementById(`mcard-${first}`).classList.remove('flipped');
        document.getElementById(`mcard-${second}`).classList.remove('flipped');
        flippedCards = [];
        memoryLocked = false;
      }, 800);
    }
  }
}

function updateMemoryStats() {
  const statsEl = document.getElementById('memoryStats');
  if (statsEl) {
    statsEl.innerHTML = `
      Lượt: <span>${memoryMoves}</span> &nbsp;|&nbsp; 
      Cặp: <span>${matchedPairs}/8</span>
    `;
  }
}

// ===== CREATIVE: Document Filter =====
function filterDocs(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  document.querySelectorAll('.doc-item').forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'flex';
      item.style.animation = 'fadeIn 0.3s ease';
    } else {
      item.style.display = 'none';
    }
  });
}

// ===== CREATIVE: Gemini AI Chatbot =====
// 🔑 THAY API KEY CỦA BẠN VÀO ĐÂY:
const GEMINI_API_KEY = 'AIzaSyAHV9svuqJ89YTYBLRHBvkKn9gv2IJQDdI';
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const chatHistory = [];

function initChatbot() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  if (!input || !sendBtn) return;

  sendBtn.addEventListener('click', () => sendChatMessage());
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const statusEl = document.getElementById('botStatus');
  if (!input || !messages) return;

  const text = input.value.trim();
  if (!text) return;

  // Add user message
  messages.innerHTML += `<div class="chat-msg user">${escapeHtml(text)}</div>`;
  input.value = '';
  input.disabled = true;
  messages.scrollTop = messages.scrollHeight;

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  messages.innerHTML += `<div class="chat-msg bot" id="${typingId}" style="opacity:0.6;">⏳ Đang suy nghĩ...</div>`;
  messages.scrollTop = messages.scrollHeight;
  if (statusEl) statusEl.innerHTML = '<span style="color: var(--accent-yellow);">● Đang trả lời...</span>';

  // Check if API key is set
  if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.style.opacity = '1';
      typingEl.innerHTML = '⚠️ Chưa cấu hình API Key! Hãy mở file <code>js/script.js</code> và thay <code>YOUR_API_KEY_HERE</code> bằng Gemini API Key của bạn. Lấy key miễn phí tại <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--cyan-primary);">Google AI Studio</a>.';
    }
    input.disabled = false;
    if (statusEl) statusEl.innerHTML = '<span style="color: var(--accent-pink);">● Chưa có API Key</span>';
    return;
  }

  // Add to history
  chatHistory.push({ role: 'user', parts: [{ text: text }] });

  try {
    const systemPrompt = 'Bạn là SmartBot, trợ giảng AI thân thiện của website "Lớp Học Thông Minh" dành cho học sinh lớp 8. Hãy trả lời ngắn gọn, dễ hiểu, bằng tiếng Việt. Sử dụng emoji khi phù hợp. Hỗ trợ các môn: Toán, Vật Lý, Tin Học, Tiếng Anh, Ngữ Văn, Lịch Sử. Nếu không biết, hãy nói "Mình không chắc, bạn hãy hỏi thầy cô nhé!".';

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.9,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API lỗi: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, mình không thể trả lời lúc này. 😅';

    // Add to history
    chatHistory.push({ role: 'model', parts: [{ text: botReply }] });

    // Update typing indicator with actual response
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.style.opacity = '1';
      typingEl.innerHTML = formatBotResponse(botReply);
    }

    if (statusEl) statusEl.innerHTML = '<span style="color: var(--accent-green);">● Sẵn sàng</span>';

  } catch (error) {
    console.error('Gemini API Error:', error);
    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.style.opacity = '1';
      typingEl.innerHTML = `❌ Lỗi kết nối: ${error.message}. Hãy kiểm tra API Key hoặc kết nối mạng.`;
    }
    if (statusEl) statusEl.innerHTML = '<span style="color: var(--accent-pink);">● Lỗi kết nối</span>';
  }

  input.disabled = false;
  input.focus();
  messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatBotResponse(text) {
  // Basic markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:var(--bg-glass);padding:2px 6px;border-radius:4px;font-family:JetBrains Mono,monospace;font-size:0.85em;">$1</code>')
    .replace(/\n/g, '<br>');
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs-container');
      const target = btn.getAttribute('data-tab');

      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  setActiveNav();
  initScrollAnimations();
  initTypingEffect();
  initCounters();
  initQuiz();
  initMemoryGame();
  initChatbot();
  initTabs();
});
