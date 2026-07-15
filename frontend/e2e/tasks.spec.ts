import { test, expect } from '@playwright/test'

// This file assumes auth.setup.ts already created playwright/.auth/user.json
test.use({ storageState: 'playwright/.auth/user.json' })

test('usuario autenticado puede crear una tarea', async ({ page }) => {
  await page.goto('/tasks')

  const input = page.getByPlaceholder('Escribe el nombre de la tarea...')
  await expect(input).toBeVisible({ timeout: 15000 })

  const unique = Date.now()
  const title = `Tarea E2E ${unique}`
  const description = `Descripción E2E ${unique}`

  await input.fill(title)
  await page.getByPlaceholder('Una breve descripción... (opcional)').fill(description)
  await page.getByRole('button', { name: /agregar tarea/i }).click()

  await expect(page.getByText("testtttt")).toBeVisible({ timeout: 15000 })
  await expect(page.getByText(description)).toBeVisible({ timeout: 15000 })
})
