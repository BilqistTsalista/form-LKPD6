document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const extracurricular = document.getElementById('extracurricular');
    const successMessage = document.getElementById('successMessage');

    function setError(input, message) {
        input.classList.remove('success');
        input.classList.add('error');
        const small = input.parentElement.querySelector('.error-message');
        small.textContent = message;
    }

    function setSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        const small = input.parentElement.querySelector('.error-message');
        small.textContent = '';
    }

    function validateFullname() {
        const value = fullname.value.trim();
        if (value === '') {
            setError(fullname, 'Nama lengkap tidak boleh kosong.');
            return false;
        } else if (value.length < 3) {
            setError(fullname, 'Nama lengkap minimal 3 karakter.');
            return false;
        } else {
            setSuccess(fullname);
            return true;
        }
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            setError(email, 'Email tidak boleh kosong.');
            return false;
        } else if (!emailRegex.test(value)) {
            setError(email, 'Format email tidak valid (contoh: nama@email.com).');
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    }

    function validatePassword() {
        const value = password.value;
        if (value === '') {
            setError(password, 'Password tidak boleh kosong.');
            return false;
        } else if (value.length < 8) {
            setError(password, 'Password minimal 8 karakter.');
            return false;
        } else {
            setSuccess(password);
            return true;
        }
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const passValue = password.value;
        if (value === '') {
            setError(confirmPassword, 'Konfirmasi password tidak boleh kosong.');
            return false;
        } else if (value !== passValue) {
            setError(confirmPassword, 'Konfirmasi password tidak sama dengan password.');
            return false;
        } else {
            setSuccess(confirmPassword);
            return true;
        }
    }

    function validateExtracurricular() {
        if (extracurricular.value === '') {
            setError(extracurricular, 'Silakan pilih salah satu ekstrakurikuler.');
            return false;
        } else {
            setSuccess(extracurricular);
            return true;
        }
    }

    // Real-time validation listeners
    fullname.addEventListener('input', validateFullname);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', () => {
        validatePassword();
        if (confirmPassword.value !== '') validateConfirmPassword();
    });
    confirmPassword.addEventListener('input', validateConfirmPassword);
    extracurricular.addEventListener('change', validateExtracurricular);

    // Form submit listener with preventDefault
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const isFullnameValid = validateFullname();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isExtraValid = validateExtracurricular();

        if (isFullnameValid && isEmailValid && isPasswordValid && isConfirmValid && isExtraValid) {
            successMessage.style.display = 'block';
            successMessage.textContent = 'Pendaftaran Berhasil!';
            alert('Pendaftaran Berhasil!');
        } else {
            successMessage.style.display = 'none';
        }
    });
});
// --- SCRIPT CHATBOT (DIPERBARUI DENGAN PILIHAN EKSKUL LENGKAP) ---
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatBox = document.getElementById('chat-box');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatBody = document.getElementById('chatBody');

chatToggleBtn.addEventListener('click', () => {
    chatBox.classList.toggle('chat-hidden');
});

chatCloseBtn.addEventListener('click', () => {
    chatBox.classList.add('chat-hidden');
});

function sendUserMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Tampilkan pesan user
    const userMsgDiv = document.createElement('div');
    userMsgDiv.classList.add('chat-message', 'user-msg');
    userMsgDiv.textContent = text;
    chatBody.appendChild(userMsgDiv);

    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Respon otomatis bot sesuai alur percakapan
    setTimeout(() => {
        const botMsgDiv = document.createElement('div');
        botMsgDiv.classList.add('chat-message', 'bot-msg');
        
        const lowerText = text.toLowerCase();

        // 1. Jika user bilang mau tanya / salam / halo
        if (lowerText.includes('mau tanya') || lowerText.includes('tanya') || lowerText.includes('halo') || lowerText.includes('pagi') || lowerText.includes('siang')) {
            botMsgDiv.textContent = 'Silakan, ada yang bisa saya bantu terkait pendaftaran ekstrakurikuler?';
        
        // 2. Pramuka
        } else if (lowerText.includes('pramuka')) {
            botMsgDiv.textContent = 'Konsep Pramuka mengusung kegiatan luar ruangan (outdoor), melatih kemandirian, kerja sama tim, kepemimpinan, serta kecintaan terhadap alam.';
        
        // 3. Paduan Suara / Padus
        } else if (lowerText.includes('padus') || lowerText.includes('paduan suara')) {
            botMsgDiv.textContent = 'Konsep Paduan Suara (Padus) melatih teknik vokal, keharmonisan nada, pernapasan, serta keselarasan bernyanyi dalam grup untuk acara resmi sekolah.';
        
        // 4. Seni Tari / Tari
        } else if (lowerText.includes('tari') || lowerText.includes('seni tari')) {
            botMsgDiv.textContent = 'Konsep Seni Tari berfokus pada pelestarian budaya melalui penguasaan gerakan tari tradisional maupun kreasi modern, kelenturan tubuh, dan ekspresi seni.';
        
        // 5. Rebana
        } else if (lowerText.includes('rebana')) {
            botMsgDiv.textContent = 'Konsep Rebana mengembangkan seni musik islami, melatih kekompakan tabuhan ritmis, vokal sholawat, serta pengamalan nilai-nilai keagamaan.';
        
        // 6. Jurnalistik
        } else if (lowerText.includes('jurnalistik')) {
            botMsgDiv.textContent = 'Konsep Jurnalistik melatih keterampilan menulis berita, teknik wawancara, fotografi, pembuatan majalah dinding (mading), dan pengelolaan media sekolah.';
        
        // 7. Olahraga
        } else if (lowerText.includes('olahraga')) {
            botMsgDiv.textContent = 'Konsep Olahraga mewadahi bakat fisik seperti sepak bola, basket, bulu tangkis, atau voli untuk menjaga kesehatan, sportivitas, dan prestasi.';
        
        // 8. Pencak Silat
        } else if (lowerText.includes('silat') || lowerText.includes('pencak silat')) {
            botMsgDiv.textContent = 'Konsep Pencak Silat melatih seni bela diri tradisional asli Indonesia, ketahanan fisik, kedisiplinan, serta pembentukan mental yang tangguh.';
        
        // 9. Paskibra
        } else if (lowerText.includes('paskibra')) {
            botMsgDiv.textContent = 'Konsep Paskibra berfokus pada pelatihan kedisiplinan, kepemimpinan, dan teknik baris-berbaris (PBB).';
        // 10.PMR
        } else if (lowerText.includes('pmr')) {
            botMsgDiv.textContent = 'Konsep PMR melatih keterampilan pertolongan pertama (First Aid) dan jiwa kemanusiaan.';
        // 11. Drumband
        } else if (lowerText.includes('Drumband')) {
            botMsgDiv.textContent = 'Ekstrakurikuler Drumband adalah kegiatan seni musik kolektif yang memadukan permainan alat musik (perkusi dan tiup), baris-berbaris, serta formasi visual.';
        // 12.Rohis
        } else if (lowerText.includes('rohis')) {
            botMsgDiv.textContent = 'Konsep Rohis membina kerohanian Islam siswa melalui kajian keagamaan.';

        // 10. Cara daftar
        } else if (lowerText.includes('cara') || lowerText.includes('daftar')) {
            botMsgDiv.textContent = 'Cukup isi nama lengkap, email, password, lalu pilih ekstrakurikuler yang kamu minati di form dan klik Kirim Pendaftaran!';
        
        // 11. Daftar ekskul secara umum
        } else if (lowerText.includes('esktrakurikuler') || lowerText.includes('Eksul') || lowerText.includes('pilihan')) {
            botMsgDiv.textContent = 'Pilihan ekskul yang tersedia meliputi Pramuka, Padus, Tari, Rebana, Jurnalistik, Olahraga, Pencak Silat, Paskibra, PMR,Drumband, dan Rohis. Mau tahu detail konsep yang mana?';
        
        // 12. Respon default
        } else {
            botMsgDiv.textContent = 'Baik, silakan tanyakan hal seputar pendaftaran atau tanyakan konsep ekstrakurikuler yang ingin kamu ketahui ya!';
        }

        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

chatSendBtn.addEventListener('click', sendUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});