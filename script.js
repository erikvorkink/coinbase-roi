'use strict';

// Reload page
var refreshMins = 30;
setTimeout(function() { location.reload() }, 60000 * refreshMins);

// Get updated amount
setTimeout(function() {
	var roi = Math.floor(Math.random() * (100 - -100 + 1)) + -100;

	var statusEl = document.getElementById('status');
	var roiEl = document.getElementById('roi');

	statusEl.innerHTML = statusForROI(roi);
	roiEl.innerHTML = formattedCurrency(roi);
	if (roi != 0) {
		roiEl.classList.add(roi > 0 ? 'positive' : 'negative');
	}
}, 50);

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