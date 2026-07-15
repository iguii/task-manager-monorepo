import { test, expect } from '@playwright/test'

test('usuario puede iniciar sesión', async ({ page }) => {
  // This test is independent: uses explicit credentials from env.
  // Ensure these exist in CI secrets for stability.
  const email = process.env.E2E_USER_EMAIL
  const password = process.env.E2E_USER_PASSWORD

  test.skip(!email || !password, 'E2E_EMAIL/E2E_PASSWORD are required for login.spec.ts')

  await page.goto('/login')
  await page.getByPlaceholder('Email').fill(email!)
  await page.getByPlaceholder('Contraseña').fill(password!)
  await page.getByRole('button', { name: /iniciar sesión/i }).click()

  await expect(page).toHaveURL(/\/tasks(?:\?.*)?$/, { timeout: 15000 })
  await expect(page.getByPlaceholder('Escribe el nombre de la tarea...')).toBeVisible()
})
