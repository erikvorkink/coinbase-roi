'use strict';

// Get updated amount
getROI();

// Reload after a while
var refreshMins = 15;
setInterval(getROI, 60000 * refreshMins);

function getROI() {
	var loadingEl = document.getElementById('loading');
	var resultsEl = document.getElementById('results');
	resultsEl.style.display = 'none';
	loadingEl.style.display = 'block';

	setTimeout(function() {
		var url = location.protocol + '//' + location.hostname + ':3000' + '/roi'; // assumes node is serving here
		axios.get(url)
			.then(function(response) {
				if (!response.data.success) {
					alert('Unable to load data');
					return;
				}

				loadingEl.style.display = 'none';
				resultsEl.style.display = 'block';

				displayProfit(response.data.profit);
				displayROI(response.data.roi * 100);
			})
			.catch(function(error) {
				alert(error);
			});
	}, 600); // because the loading icon looks cool
}

function statusForProfit(profit) {
	if (profit <= -50) { return '😢'; }
	if (profit < -5) { return '🙁'; }
	if (profit <= 0) { return '🙄'; }
	if (profit < 50) { return '😀'; }
	return '🤑';
}

function formattedCurrency(amount) {
	return (amount < 0 ? '-' : '+') + '$' + Math.abs(amount).toFixed(2);
}

function displayProfit(profit) {
	var statusEl = document.getElementById('status');
	var profitEl = document.getElementById('profit');

	statusEl.innerHTML = statusForProfit(profit);
	profitEl.innerHTML = formattedCurrency(profit);
	if (profit != 0) {
		profitEl.classList.add(profit > 0 ? 'positive' : 'negative');
	}
}

function displayROI(roiPercent) {
	var roi = roiPercent.toFixed(2) + '% ROI';
	document.getElementById('roi').innerHTML = roi;
}