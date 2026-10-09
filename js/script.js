const form = document.getElementById('regForm');
const gpa = document.getElementById('gpa');
const out = document.getElementById('gpaOut');
const progress = document.getElementById('progress');
const result = document.getElementById('result');

gpa.addEventListener('input', () => out.textContent = gpa.value);

function updateProgress() {
  const fields = [...form.querySelectorAll('[required]')];
  const done = fields.filter(f => f.type === 'radio'
    ? form.querySelector(`input[name="${f.name}"]:checked`)
    : f.type === 'checkbox' ? f.checked : f.value.trim() !== '').length;
  progress.value = Math.round(done / fields.length * 100);
}
form.addEventListener('input', updateProgress);
form.addEventListener('change', updateProgress);

function summary() {
  const d = new FormData(form);
  return `Name: ${d.get('fname')}\nEmail: ${d.get('email')}\nProgram: ${d.get('program')}\nGender: ${d.get('gender') || '-'}\nInterests: ${d.getAll('interest').join(', ') || '-'}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  result.style.display = 'block';
  result.textContent = 'Registration received.\n' + summary();
});
document.getElementById('alertBtn').addEventListener('click', () => alert(summary()));
document.getElementById('clearBtn').addEventListener('click', () => { form.reset(); updateProgress(); result.style.display = 'none'; });
form.addEventListener('reset', () => setTimeout(() => { out.textContent = gpa.value; updateProgress(); }));
