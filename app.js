const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const hfApiKey = "YOUR_HUGGING_FACE_API_KEY";

let currentUser = null;
let chart = null;
let reminders = [];

auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline';
        document.getElementById('sessionsBtn').style.display = 'inline';
        document.getElementById('flashcardsBtn').style.display = 'inline';
        document.getElementById('trackerBtn').style.display = 'inline';
        loadUserData();
    } else {
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('sessionsBtn').style.display = 'none';
        document.getElementById('flashcardsBtn').style.display = 'none';
        document.getElementById('trackerBtn').style.display = 'none';
        showPage('home');
    }
});

function redirectToLogin() {
    window.location.href = 'login.html';
}

function logout() {
    auth.signOut();
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function playSession() {
    const type = document.getElementById('sessionType').value;
    const duration = document.getElementById('duration').value;
    const audio = document.getElementById('audioPlayer');
    audio.src = `assets/${type}.mp3`; // Preload MP3s in assets folder
    audio.style.display = 'block';
    audio.play();
    setTimeout(() => alert(`Session ended after ${duration} min`), duration * 60000);
}

async function generateFlashcards() {
    const notes = document.getElementById('notesInput').value;
    if (!notes) return alert('Enter notes first.');
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${hfApiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: `Summarize key points from: ${notes}`, parameters: { max_length: 100 } })
        });
        const data = await response.json();
        const summary = data[0]?.generated_text || 'AI summary failed. Edit manually.';
        const cards = summary.split('. ').map(point => point.trim()).filter(p => p);
        document.getElementById('flashcardList').innerHTML = cards.map(c => `<p>${c}</p>`).join('');
        if (currentUser) db.collection('users').doc(currentUser.uid).collection('flashcards').add({ cards, timestamp: new Date() });
    } catch (e) {
        alert('AI generation failed. Check API key.');
    }
}

function logTopic() {
    const topic = document.getElementById('topicInput').value;
    if (!topic) return alert('Enter a topic.');
    const timestamp = new Date();
    if (currentUser) db.collection('users').doc(currentUser.uid).collection('topics').add({ topic, timestamp });
    updateGraph();
    scheduleReminders(topic);
}

function updateGraph() {
    if (!currentUser) return;
    db.collection('users').doc(currentUser.uid).collection('topics').get().then(snapshot => {
        const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const labels = ['Initial', '1 Day', '3 Days', '7 Days'];
        const retention = [100, 70, 50, 30];
        if (chart) chart.destroy();
        chart = new Chart(document.getElementById('retentionChart'), {
            type: 'line',
            data: { labels, datasets: [{ label: 'Retention %', data: retention, borderColor: 'blue' }] }
        });
    });
}

function scheduleReminders(topic) {
    reminders.push(setTimeout(() => alert(`Reminder: Revise ${topic} (1 day)`), 86400000)); // 1 day
    reminders.push(setTimeout(() => alert(`Reminder: Revise ${topic} (3 days)`), 259200000)); // 3 days
    document.getElementById('reminderList').innerHTML += `<p>Reminder set for ${topic}</p>`;
}

function enableReminders() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}

function loadUserData() {
    updateGraph();
}