// অক্ষরকে ইনডেক্স সংখ্যায় রূপান্তরের জন্য ম্যাপ
    const optionMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };

    // অপশন সিলেক্ট করার ফাংশন
    function selectOption(button) {
      const parentCard = button.closest('.question-card');
      const buttons = parentCard.querySelectorAll('.option-btn');
      
      // সাবমিট করার পর অপশন বদলানো আটকানো
      if (document.getElementById('submit-btn').style.display === 'none') return;

      // ক্লাসের নির্বাচন সরানো
      buttons.forEach(btn => btn.classList.remove('selected'));
      
      // নতুন অপশনে ক্লাস যোগ
      button.classList.add('selected');
    }

    // কুইজ সাবমিট করার ফাংশন
    function submitQuiz() {
      const questions = document.querySelectorAll('.question-card');
      let score = 0;
      let allAnswered = true;

      // চেক করা সব প্রশ্নের উত্তর দেওয়া হয়েছে কি না
      questions.forEach(q => {
        if (!q.querySelector('.option-btn.selected')) {
          allAnswered = false;
        }
      });

      if (!allAnswered) {
        alert("অনুগ্রহ করে সমস্ত প্রশ্নের উত্তর দিন!");
        return;
      }

      // উত্তর যাচাই
      questions.forEach(q => {
        const correctLetter = q.getAttribute('data-correct').toLowerCase().trim();
        const correctIndex = optionMap[correctLetter];
        const options = q.querySelectorAll('.option-btn');

        options.forEach((opt, index) => {
          // ক্লিক করা বন্ধ করা
          opt.style.pointerEvents = 'none';

          if (index === correctIndex) {
            opt.classList.add('correct'); // সঠিক উত্তর হলে সবুজ
          }

          if (opt.classList.contains('selected')) {
            if (index === correctIndex) {
              score++;
            } else {
              opt.classList.add('wrong'); // ভুল পছন্দ হলে লাল
            }
          }
        });
      });

      // রেজাল্ট দেখানো
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = `আপনার প্রাপ্ত নম্বর: ${score} / ${questions.length}`;

      // বাটন পরিবর্তন
      document.getElementById('submit-btn').style.display = 'none';
      document.getElementById('reset-btn').style.display = 'inline-block';
    }

    // কুইজ রিসেট করার ফাংশন
    function resetQuiz() {
      const questions = document.querySelectorAll('.question-card');

      questions.forEach(q => {
        const options = q.querySelectorAll('.option-btn');
        options.forEach(opt => {
          opt.classList.remove('selected', 'correct', 'wrong');
          opt.style.pointerEvents = 'auto';
        });
      });

      document.getElementById('result').innerText = '';
      document.getElementById('submit-btn').style.display = 'inline-block';
      document.getElementById('reset-btn').style.display = 'none';
    }

