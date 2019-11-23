'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'UserController.create');
Route.post('/login', 'UserController.login');

Route.resource('tarefa', 'TarefaController').apiOnly().middleware('auth');
Route.post('/tarefa/:id/arquivo', 'ArquivoController.create').middleware('auth');
