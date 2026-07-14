import { test, expect } from '@playwright/test'

test('un usuario nuevo puede registrarse, iniciar sesion, crear una tarea y verla en la lista de tareas pendientes.', async ({ page }) => {
  await page.goto('/register')

  const unique = Date.now()
  const email = `test+${unique}@test.com`
  const password = 'test1234'

  await page.getByPlaceholder('Nombre').fill('TESTING USER')
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await page.getByRole('button', { name: /crear cuenta/i }).click()

  await expect
    .poll(() => new URL(page.url()).pathname, { timeout: 30000 })
    .toMatch(/^\/(register|login|tasks)$/)

  if (new URL(page.url()).pathname === '/register') {
    const createBtn = page.getByRole('button', { name: /crear cuenta/i })
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click()
      await expect
        .poll(() => new URL(page.url()).pathname, { timeout: 30000 })
        .toMatch(/^\/(register|login|tasks)$/)
    }
  }

  // If we're not already in tasks, do login explicitly
  if (new URL(page.url()).pathname !== '/tasks') {
    // Ensure we're on login page (if app is still on register, navigate deterministically)
    if (new URL(page.url()).pathname !== '/login') {
      await page.goto('/login')
    }

    const emailInput = page.getByPlaceholder('Email')
    const passwordInput = page.getByPlaceholder('Contraseña')
    const loginBtn = page.getByRole('button', { name: /iniciar sesión/i })

    await expect(emailInput).toBeVisible({ timeout: 15000 })
    await expect(passwordInput).toBeVisible({ timeout: 15000 })
    await expect(loginBtn).toBeEnabled({ timeout: 15000 })

    await emailInput.fill(email)
    await passwordInput.fill(password)

    // Robust for SPA/client-side redirects (fixes flaky waitForURL timeout)
    await loginBtn.click()

    await expect
      .poll(() => new URL(page.url()).pathname, { timeout: 30000 })
      .toBe('/tasks')

    await expect(page.getByPlaceholder('Escribe el nombre de la tarea...')).toBeVisible({ timeout: 15000 })
  }

  await expect(page).toHaveURL(/\/tasks(?:\?.*)?$/, { timeout: 30000 })

  const taskTitle = `Comprar pan TEST ${unique}`
  const taskDescription = `Debo ir a la tienda a comprar 10 panes. TEST ${unique}`

  const taskNameInput = page.getByPlaceholder('Escribe el nombre de la tarea...')
  await expect(taskNameInput).toBeVisible({ timeout: 15000 })

  await taskNameInput.fill(taskTitle)
  await page.getByPlaceholder('Una breve descripción... (opcional)').fill(taskDescription)
  await page.getByRole('button', { name: /agregar tarea/i }).click()

  await expect(page.getByText(taskTitle, { exact: false })).toBeVisible({ timeout: 15000 })
  await expect(page.getByText(taskDescription, { exact: false })).toBeVisible({ timeout: 15000 })
})
