import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'tt_auth_user'

function loadUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(loadUser())
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  watch(user, (value) => {
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  })

  /**
   * TODO backend: ganti body function ini dengan call API beneran, misal:
   *   const res = await fetch('/api/auth/login', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ email, password }),
   *   })
   *   if (!res.ok) throw new Error((await res.json()).message)
   *   user.value = await res.json()
   */
  async function login({ email, password }) {
    loading.value = true
    error.value = null
    try {
      if (!email || !password) throw new Error('Email dan password wajib diisi.')
      await new Promise((resolve) => setTimeout(resolve, 500))

      user.value = {
        name: email.split('@')[0],
        email,
        provider: 'email',
        avatar: null,
        connectedProviders: ['email'],
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan POST /api/auth/register
   */
  async function register({ name, email, password, confirmPassword }) {
    loading.value = true
    error.value = null
    try {
      if (!name || !email || !password) throw new Error('Semua field wajib diisi.')
      if (password.length < 6) throw new Error('Password minimal 6 karakter.')
      if (password !== confirmPassword) throw new Error('Konfirmasi password tidak cocok.')
      await new Promise((resolve) => setTimeout(resolve, 500))

      user.value = {
        name,
        email,
        provider: 'email',
        avatar: null,
        connectedProviders: ['email'],
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan redirect OAuth beneran, misal:
   *   window.location.href = `/api/auth/${provider}/redirect`
   * dan handle callback-nya di route terpisah yang nge-set user dari
   * response backend (JWT / session cookie).
   */
  async function loginWithProvider(provider) {
    loading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      user.value = {
        name: provider === 'google' ? 'Google User' : 'GitHub User',
        email: `user@${provider}.example.com`,
        provider,
        avatar: null,
        connectedProviders: [provider],
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan PATCH /api/user/profile
   *   body: { name, avatar } (avatar bisa base64 dulu, atau upload
   *   multipart terpisah lalu simpan URL-nya)
   */
  async function updateProfile({ name, avatar }) {
    loading.value = true
    error.value = null
    try {
      if (!name || !name.trim()) throw new Error('Nama gak boleh kosong.')
      await new Promise((resolve) => setTimeout(resolve, 500))

      user.value = {
        ...user.value,
        name: name.trim(),
        avatar: avatar ?? user.value.avatar,
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan redirect OAuth link-account flow, misal
   *   window.location.href = `/api/auth/${provider}/link`
   */
  async function connectProvider(provider) {
    loading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const current = user.value.connectedProviders || []
      if (!current.includes(provider)) {
        user.value = {
          ...user.value,
          connectedProviders: [...current, provider],
        }
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan DELETE /api/user/connections/:provider
   */
  async function disconnectProvider(provider) {
    loading.value = true
    error.value = null
    try {
      const current = user.value.connectedProviders || []
      if (current.length <= 1) {
        throw new Error('Minimal harus ada satu metode login yang terhubung.')
      }
      await new Promise((resolve) => setTimeout(resolve, 400))
      user.value = {
        ...user.value,
        connectedProviders: current.filter((p) => p !== provider),
      }
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * TODO backend: ganti dengan DELETE /api/user beneran, lalu hapus
   * session/cookie di server. Data lokal (favorite, dsb) juga sebaiknya
   * dibersihkan di sini kalau memang mau full wipe.
   */
  async function deleteAccount() {
    loading.value = true
    error.value = null
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      user.value = null
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    loginWithProvider,
    updateProfile,
    connectProvider,
    disconnectProvider,
    deleteAccount,
    logout,
  }
})