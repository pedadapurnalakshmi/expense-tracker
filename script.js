document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expense-form');
  const tableBody = document.querySelector('#expenses-table tbody');

  // Function to load all expenses
  function loadExpenses() {
    fetch('/api/expenses')
      .then(response => response.json())
      .then(data => {
        tableBody.innerHTML = '';
        data.forEach(expense => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
          `;
          tableBody.appendChild(tr);
        });
      });
  }

  // Load expenses on page load
  loadExpenses();

  // Handle form submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    fetch('/api/expenses', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, amount, date})
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        loadExpenses();
        form.reset();
      } else {
        alert('Error adding expense');
      }
    });
  });
});
