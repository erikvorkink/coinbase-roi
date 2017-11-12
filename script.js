'use strict';

// Get updated amount
getROI();

// Reload after a while
var refreshMins = 15;
setInterval(getROI, 60000 * refreshMins);

function getROI() {console.log('getROI');
	var loadingEl = document.getElementById('loading');
	var resultsEl = document.getElementById('results');
	resultsEl.style.display = 'none';
	loadingEl.style.display = 'block';

	setTimeout(function() {
		axios.get('http://localhost:3000/')
			.then(function(response) {
				if (!response.data.success) {
					alert('Unable to load data');
					return;
				}

				loadingEl.style.display = 'none';
				resultsEl.style.display = 'block';

				var roi = -(response.data.investment - response.data.balance).toFixed(2);
				displayROI(roi);
			})
			.catch(function(error) {
				alert(error);
			});
	}, 600); // because the loading icon looks cool
}

function statusForROI(roi) {
	if (roi <= -50) { return '😢'; }
	if (roi < -1) { return '🙁'; }
	if (roi <= 1) { return '🙄'; }
	if (roi < 50) { return '😀'; }
	return '🤑';
}

function formattedCurrency(amount) {
	return (amount < 0 ? '-' : '+') + '$' + Math.abs(amount);
}

function displayROI(roi) {
	var statusEl = document.getElementById('status');
	var roiEl = document.getElementById('roi');

	statusEl.innerHTML = statusForROI(roi);
	roiEl.innerHTML = formattedCurrency(roi);
	if (roi != 0) {
		roiEl.classList.add(roi > 0 ? 'positive' : 'negative');
	}
}