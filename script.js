'use strict';

// Reload page after a while
var refreshMins = 30;
setTimeout(function() { location.reload() }, 60000 * refreshMins);

// Get updated amount
axios.get('http://localhost:3000/')
	.then(function(response) {
		var roi = response.data.balance;
		if (roi === undefined || roi.length === 0) {
			alert('Unable to load data');
			return;
		}
		displayROI(roi);
	})
	.catch(function(error) {
		alert(error);
	});

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