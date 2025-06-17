document.getElementById("investmentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from refreshing the page

  const amount = document.getElementById("amountInput").value;
  if (amount && parseFloat(amount) > 0) {
    // Save to localStorage
    localStorage.setItem("investedAmount", parseFloat(amount).toFixed(2));
    
    // Optionally redirect to the dashboard
    window.location.href = "../Dashboard/homeD.html";
  } else {
    alert("Please enter a valid amount.");
  }
});