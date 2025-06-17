// Signup

const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = signupForm.fullname.value;
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm['confirm-password'].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Save user data to localStorage
  const user = { name, email, password };
  localStorage.setItem("procoinUser", JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "../Dashboard/homeD.html"; // Adjust path if needed
});


//   Login
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const storedUser = JSON.parse(localStorage.getItem("procoinUser"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    alert("Login successful!");
    window.location.href = "../Dashboard/homeD.html"; // Adjust path if needed
  } else {
    alert("Invalid email or password.");
  }
});




// Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const usernameDisplay = document.getElementById("username");
  const investmentAmount = document.getElementById("investmentAmount");
  const transactionList = document.getElementById("transactionList");
  const logoutBtn = document.getElementById("logoutBtn");
  const investmentForm = document.getElementById("investmentForm");
  const amountInput = document.getElementById("amountInput");

  // Check login status
  const user = JSON.parse(localStorage.getItem("procoinUser"));
  let transactions = JSON.parse(localStorage.getItem("procoinTransactions")) || [];

  if (!user) {
    window.location.href = "../Access/login.html";
    return;
  }

  // Display username
  usernameDisplay.textContent = user.name || "User";

  // Calculate total investment
  function updateDashboard() {
    let total = 0;
    transactionList.innerHTML = "";

    transactions.forEach((tx) => {
      total += parseFloat(tx.amount);
      const li = document.createElement("li");
      li.textContent = `${tx.date} - $${tx.amount} - ${tx.note}`;
      transactionList.appendChild(li);
    });

    investmentAmount.textContent = total.toFixed(2);
  }

  updateDashboard();

  // Handle new investment form
  if (investmentForm) {
    investmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const newTransaction = {
        amount: amount.toFixed(2),
        date: new Date().toLocaleString(),
        note: "User Investment"
      };

      transactions.push(newTransaction);
      localStorage.setItem("procoinTransactions", JSON.stringify(transactions));
      investmentForm.reset();
      updateDashboard(); // Instead of redirecting, update the UI directly
    });
  }

  // Logout handler
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("procoinUser");
    window.location.href = "../Access/login.html";
  });
});















document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("dashAmountInput");
  const investBtn = document.getElementById("dashInvestBtn");
  const investmentDisplay = document.getElementById("investmentAmount");
  const transactionList = document.getElementById("transactionList");

  // Debugging
  console.log("Input:", input);
  console.log("Button:", investBtn);
  console.log("Investment Display:", investmentDisplay);
  console.log("Transaction List:", transactionList);
});

// Load saved amount if exists
const savedAmount = localStorage.getItem("investedAmount");
if (savedAmount) {
  investmentDisplay.textContent = savedAmount;
  appendTransaction(savedAmount);
}

// Handle submit click
investBtn?.addEventListener("click", () => {
  const amount = parseFloat(input.value);
  if (!isNaN(amount) && amount > 0) {
    const formattedAmount = amount.toFixed(2);

    // Update display
    investmentDisplay.textContent = formattedAmount;

    // Save to localStorage
    localStorage.setItem("investedAmount", formattedAmount);

    // Add to transaction history
    appendTransaction(formattedAmount);

    // Clear input
    input.value = "";
  } else {
    alert("Please enter a valid amount.");
  }
});

function appendTransaction(amount) {
  if (transactionList) {
    const li = document.createElement("li");
    li.textContent = `Invested $${amount}`;
    transactionList.appendChild(li);
  }
}
});