// e2e/flujo-tareas.spec.js
import { test, expect } from '@playwright/test'

test('un usuario puede iniciar sesion, crear una tarea y verla en la lista', async ({ page }) => {
  // // 1. Entrar a la aplicación
  // await page.goto('/')
  //
  // // 2. Crear una tarea
  // await page.getByLabel('Nueva tarea').fill('Comprar pan')
  // await page.getByRole('button', { name: 'Agregar' }).click()
  //
  // // 3. Verla en la lista
  // await expect(page.getByText('Comprar pan')).toBeVisible()
  //
  // 1. go to /login and use testing credentials
  await page.goto('/login')

  await page.getByPlaceholder('Email').fill('test@test.com')
  await page.getByPlaceholder('Contraseña').fill('test')
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click()

  // 2. Create a new task
  await page.getByPlaceholder('Escribe el nombre de la tarea...').fill('Comprar pan TEST')
  await page.getByPlaceholder('Una breve descripción... (opcional)').fill('Debo ir a la tienda a comprar 10 panes. TEST')
  await page.getByRole('button', { name: 'Agregar Tarea' }).click()

  // 3. Wait for item to show on tasks list
  await expect(page.getByText('Comprar pan TEST')).toBeVisible()
  await expect(page.getByText('Debo ir a la tienda a comprar 10 panes. TEST')).toBeVisible()
})
