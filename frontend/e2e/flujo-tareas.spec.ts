import { test, expect } from '@playwright/test'

test('un usuario nuevo puede registrarse, iniciar sesion, crear una tarea y verla en la lista de tareas pendientes.', async ({ page }) => {

  // 1. Register
  await page.goto('/register')
  await page.getByPlaceholder('Nombre').fill('TESTING USER')
  await page.getByPlaceholder('Email').fill('test@test.com')
  await page.getByPlaceholder('Contraseña').fill('test')


  await Promise.all([
    page.waitForURL('/login'), // ajusta según tu ruta real post-login
    page.getByRole('button', { name: 'crear Cuenta' }).click(),
  ])

  // 2. Login
  await page.getByPlaceholder('Email').fill('test@test.com')
  await page.getByPlaceholder('Contraseña').fill('test')

  await Promise.all([
    page.waitForURL('/tasks'), // ajusta según tu ruta real post-login
    page.getByRole('button', { name: 'Iniciar Sesión' }).click(),
  ])

  // 3. Create pending task 
  const taskNameInput = page.getByPlaceholder('Escribe el nombre de la tarea...')
  await expect(taskNameInput).toBeVisible()

  await taskNameInput.fill('Comprar pan TEST')

  await page
    .getByPlaceholder('Una breve descripción... (opcional)')
    .fill('Debo ir a la tienda a comprar 10 panes. TEST')

  await page.getByRole('button', { name: 'Agregar Tarea' }).click()

  await expect(page.getByText('Comprar pan TEST')).toBeVisible()
  await expect(page.getByText('Debo ir a la tienda a comprar 10 panes. TEST')).toBeVisible()
})
