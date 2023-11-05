import jwtDecode from 'jwt-decode';

export function isValidBase64(str) {
  const base64Chars = /^[A-Za-z0-9+/]+={0,2}$/;
  return base64Chars.test(str);
}

export const checkTokenExpiration = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik

      if (decodedToken.exp < currentTime) {
        // Token sudah kedaluwarsa, lemparkan pengguna ke halaman /
        return true;
      }
    } catch (error) {
      // Token tidak valid, lemparkan pengguna ke halaman /
      return true;
    }
  } else {
    // Token tidak ada, lemparkan pengguna ke halaman /
    return true;
  }

  return false;
};
