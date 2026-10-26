// Frontend demonstration only; replace with server authentication for real use.
export async function authenticateLogin({ email, password }) {
  if (email.trim() !== 'ongyeol@gmail.com') return { status: 'id-mismatch' }
  if (password !== '1234') return { status: 'password-mismatch' }
  return { status: 'success' }
}
