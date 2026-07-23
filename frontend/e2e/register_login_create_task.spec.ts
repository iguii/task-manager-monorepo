import { test, expect } from '@playwright/test'

// End-to-end flow: a brand new user registers, logs in with those same
// credentials, and then creates a task. This test is fully self-contained
// (no storageState, no auth.setup.ts dependency) so it can run on its own.

test('usuario se registra, inicia sesión y crea una tarea', async ({ page }) => {
  const unique = Date.now()
  const name = 'TESTING USER'
  const email = `test+${unique}@test.com`
  const password = 'test1234'

  // --- 1. Register -------------------------------------------------------
  await page.goto('/register')

  await page.getByPlaceholder('Nombre').fill(name)
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await page.getByRole('button', { name: /crear cuenta/i }).click()

  // RegisterPage navigates to /login on success.
  await expect(page).toHaveURL(/\/login\/?(?:\?.*)?$/, { timeout: 15000 })

  // --- 2. Log in -----------------------------------------------------
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await page.getByRole('button', { name: /iniciar sesión/i }).click()

  await expect(page).toHaveURL(/\/tasks\/?(?:\?.*)?$/, { timeout: 15000 })
  await expect(page.getByText(`Hola, ${name}`)).toBeVisible({ timeout: 15000 })

  // --- 3. Create a task ----------------------------------------------
  const taskInput = page.getByPlaceholder('Escribe el nombre de la tarea...')
  await expect(taskInput).toBeVisible({ timeout: 15000 })

  const title = `Tarea E2E ${unique}`
  const description = `Descripción E2E ${unique}`

  await taskInput.fill(title)
  await page.getByPlaceholder('Una breve descripción... (opcional)').fill(description)
  await page.getByRole('button', { name: /agregar tarea/i }).click()

  await expect(page.getByText(title)).toBeVisible({ timeout: 15000 })
  await expect(page.getByText(description)).toBeVisible({ timeout: 15000 })
})
