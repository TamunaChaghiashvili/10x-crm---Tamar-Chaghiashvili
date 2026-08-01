/**
 * storage.js
 * Thin wrapper around localStorage so every other file reads/writes
 * through one place instead of repeating JSON.parse/stringify everywhere.
 * Keys are exactly as specified in the PRD (section 5.4).
 */

const STORAGE_KEYS = {
  USERS: 'crm_users',
  SESSION: 'crm_session',
  CLIENTS: 'crm_clients',
  THEME: 'crm_theme',
};

/** Read a JSON value from localStorage. Returns fallback if missing/invalid. */
function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`storageGet failed for "${key}":`, err);
    return fallback;
  }
}

/** Write a JSON value to localStorage. */
function storageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Remove a key entirely. */
function storageRemove(key) {
  localStorage.removeItem(key);
}

// Convenience accessors used across pages ----------------------------------

function getUsers() {
  return storageGet(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  storageSet(STORAGE_KEYS.USERS, users);
}

function getSession() {
  return storageGet(STORAGE_KEYS.SESSION, null);
}

function saveSession(session) {
  storageSet(STORAGE_KEYS.SESSION, session);
}

function clearSession() {
  storageRemove(STORAGE_KEYS.SESSION);
}

function getClients() {
  return storageGet(STORAGE_KEYS.CLIENTS, null); // null = "never loaded yet"
}

function saveClients(clients) {
  storageSet(STORAGE_KEYS.CLIENTS, clients);
}

/** Look up the fully-hydrated user object for whoever is currently logged in. */
function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find((u) => u.id === session.userId) || null;
}
