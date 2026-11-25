const STORAGE_KEY = "flarepix_measurement_consent_v1";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type MeasurementConsent = "accepted" | "declined";

let memoryChoice: MeasurementConsent | null = null;
let regionalDefaultEnabled = false;

export function setRegionalMeasurementDefault(enabled: boolean): void {
  regionalDefaultEnabled = enabled;
}

export function isMeasurementEnabled(): boolean {
  const choice = getMeasurementConsent();
  if (choice) return choice === "accepted";
  return regionalDefaultEnabled;
}

function asChoice(value: unknown): MeasurementConsent | null {
  return value === "accepted" || value === "declined" ? value : null;
}

function readLocalChoice(): MeasurementConsent | null {
  try {
    return asChoice(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function readCookieChoice(): MeasurementConsent | null {
  try {
    const prefix = STORAGE_KEY + "=";
    const cookie = document.cookie.split(/;\s*/).find((entry) => entry.startsWith(prefix));
    return asChoice(cookie?.slice(prefix.length));
  } catch {
    return null;
  }
}

export function getSavedMeasurementConsent(): MeasurementConsent | null {
  if (typeof window === "undefined") return null;

  const stored = readCookieChoice() ?? readLocalChoice();
  if (stored) return stored;

  try {
    return asChoice(window.history.state?.[STORAGE_KEY]);
  } catch {
    return null;
  }
}

export function getMeasurementConsent(): MeasurementConsent | null {
  return memoryChoice ?? getSavedMeasurementConsent();
}

export function saveMeasurementConsent(choice: MeasurementConsent): void {
  memoryChoice = choice;

  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // The preference cookie can persist the choice when storage is blocked.
  }

  if (readLocalChoice() !== choice || readCookieChoice()) {
    try {
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${STORAGE_KEY}=${choice}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      // Some browsers also block first-party cookies.
    }
  }

  if (getSavedMeasurementConsent() !== choice) {
    try {
      window.history.replaceState({ ...window.history.state, [STORAGE_KEY]: choice }, "");
    } catch {
      // The in-memory choice still applies to the current page.
    }
  }

  window.dispatchEvent(new Event("flarepix:measurement-consent-changed"));
}

export function subscribeMeasurementConsent(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    memoryChoice = null;
    onChange();
  }

  window.addEventListener("flarepix:measurement-consent-changed", onChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("flarepix:measurement-consent-changed", onChange);
    window.removeEventListener("storage", handleStorage);
  };
}
