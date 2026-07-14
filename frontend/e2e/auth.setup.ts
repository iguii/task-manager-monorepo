import { test as setup, expect } from '@playwright/test'

setup('create user and save auth state', async ({ page, context }) => {
  const unique = Date.now()
  const email = `test+${unique}@test.com`
  const password = 'test1234'
  const name = 'TESTING USER'

  await page.goto('/register')
  await page.getByPlaceholder('Nombre').fill(name)
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Contraseña').fill(password)
  await page.getByRole('button', { name: /crear cuenta/i }).click()

  const isTasksUrl = (urlString: string) => {
    const { pathname, search, hash } = new URL(urlString)
    return /^\/tasks\/?$/.test(pathname) || /^\/tasks\/?(?:\?.*)?(?:#.*)?$/.test(`${pathname}${search}${hash}`)
  }

  if (!isTasksUrl(page.url())) {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill(email)
    await page.getByPlaceholder('Contraseña').fill(password)
    await page.getByRole('button', { name: /iniciar sesión/i }).click()
  }

  await expect(page).toHaveURL(/\/tasks\/?(?:\?.*)?(?:#.*)?$/, { timeout: 15000 })
  await expect(page.getByPlaceholder('Escribe el nombre de la tarea...')).toBeVisible({ timeout: 15000 })

  await context.storageState({ path: 'playwright/.auth/user.json' })

  console.log(`E2E_USER_EMAIL=${email}`)
  console.log(`E2E_USER_PASSWORD=${password}`)
})
