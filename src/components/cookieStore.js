export const cookieStore = {
  get(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },

  set(name, value, options = {}) {
    const { days = 7, path = '/', secure = false, sameSite = 'Lax' } = options;
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}; SameSite=${sameSite}${secure ? '; Secure' : ''}`;
  },

  remove(name, path = '/') {
    document.cookie = `${name}=; Max-Age=0; path=${path}`;
  }
};
