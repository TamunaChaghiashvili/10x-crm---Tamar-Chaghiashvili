/**
 * utils.js
 * Small formatting helpers shared across dashboard.js, clients.js,
 * and profile.js — kept in one place instead of copy-pasted three times.
 */

function formatCurrency(amount) {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}
