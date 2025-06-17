// COIN
async function updatePrices() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const data = await response.json();

      document.querySelectorAll('.coin-price').forEach(el => {
        const coin = el.getAttribute('data-coin');
        if (coin === 'BTC') {
          el.textContent = `$${data.bitcoin.usd.toLocaleString()}`;
        } else if (coin === 'ETH') {
          el.textContent = `$${data.ethereum.usd.toLocaleString()}`;
        }
      });
    } catch (error) {
      console.error("Error fetching coin prices:", error);
    }
  }

  // Initial load
  updatePrices();
  // Update every minute
  setInterval(updatePrices, 60000);




//   CONTACT

  document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('waName').value.trim();
    const message = document.getElementById('waMessage').value.trim();

    const fullMessage = `Hello, my name is ${name}. ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);

    const phoneNumber = '08164419629'; // e.g. 15551234567 (no + or spaces)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  });

   // Get all nav links
   const navLinks = document.querySelectorAll('.nav-links a');

   // Get current page URL (file name)
   const currentPage = window.location.pathname.split('/').pop();
 
   navLinks.forEach(link => {
     const hrefPage = link.getAttribute('href').split('/').pop();
     if (hrefPage === currentPage) {
       link.classList.add('active');
     }
   });



  //  BTC chart

  const ctx = document.getElementById('btcChartCanvas').getContext('2d');
  const btcChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'ProCoin Price (USD)',
        data: [],
        borderColor: '#f2a900',
        backgroundColor: 'rgba(242, 169, 0, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { color: '#ffffff' }
        },
        y: {
          ticks: { color: '#ffffff' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#ffffff'
          }
        }
      }
    }
  });

  async function fetchBTCPrice() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await res.json();
      const price = data.bitcoin.usd;
      const time = new Date().toLocaleTimeString();

      btcChart.data.labels.push(time);
      btcChart.data.datasets[0].data.push(price);

      // Limit data points to last 30
      if (btcChart.data.labels.length > 30) {
        btcChart.data.labels.shift();
        btcChart.data.datasets[0].data.shift();
      }

      btcChart.update();
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  }

  // Initial fetch and then update every 5 seconds
  fetchBTCPrice();
  setInterval(fetchBTCPrice, 5000);



  document.addEventListener("DOMContentLoaded", () => {
    const investmentForm = document.getElementById("investmentForm");
    const amountInput = document.getElementById("amountInput");
  
    investmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount");
        return;
      }
  
      const transactions = JSON.parse(localStorage.getItem("procoinTransactions")) || [];
  
      const newTransaction = {
        amount: amount.toFixed(2),
        date: new Date().toLocaleString(),
        note: "User Investment"
      };
  
      transactions.push(newTransaction);
      localStorage.setItem("procoinTransactions", JSON.stringify(transactions));
  
      // Redirect to dashboard
      window.location.href = "../../Dashboard/homeD.html"; // Make sure this path is correct
    });
  });