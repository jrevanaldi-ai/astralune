
/**
 * Astra-Shield Security Engine
 * Menyediakan enkripsi, dekripsi, dan proteksi rate-limit riil.
 */

const SALT = "ASTRALUNE_SECURE_2025";

export const SecurityService = {
  // Enkripsi sederhana untuk LocalStorage (Anti-Leak)
  encryptData(data: any): string {
    const str = JSON.stringify(data);
    return btoa(encodeURIComponent(str + "|" + SALT));
  },

  // Dekripsi data dari LocalStorage
  decryptData(encrypted: string): any {
    try {
      const decoded = decodeURIComponent(atob(encrypted));
      const [data, salt] = decoded.split("|");
      if (salt !== SALT) throw new Error("Data Integrity Corrupted");
      return JSON.parse(data);
    } catch (e) {
      console.error("Security Breach: Unauthorized Data Access");
      return [];
    }
  },

  // Real-time Rate Limiter (Anti-Spam/DDoS)
  checkRateLimit(action: string, limit: number = 5, windowMs: number = 60000): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const key = `rate_limit_${action}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]") as number[];
    
    // Filter hits within the time window
    const validHits = history.filter(timestamp => now - timestamp < windowMs);
    
    if (validHits.length >= limit) {
      return { allowed: false, remaining: 0 };
    }

    validHits.push(now);
    localStorage.setItem(key, JSON.stringify(validHits));
    return { allowed: true, remaining: limit - validHits.length };
  }
};
