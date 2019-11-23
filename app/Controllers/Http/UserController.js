'use strict'

const User = use('App/Models/User');
const { validateAll } = use('Validator');

class UserController {

  async create({ request, response }) {
    try{
      const erroMessages = {
        'username.required': 'Todos os campos devem ser preenchidos!',
        'username.unique': 'Este usuário já existe!',
        'username.min': 'O campo usuário deve ser no mínimo 5 caracteres'
      }

      const validation = await validateAll(request.all(), {
        username: 'required|min:3|unique:users',
        email: 'required|email|unique:users',
        password: 'required|min:8'
      }, erroMessages);

      if(validation.fails()) {
        return response.status(401).send({message: validation.messages()});
      }

      const data = request.only(['username', 'email', 'password']);
      const user = await User.create(data);

      return user;

    } catch(err) {
      return response.status(500).send({error: `Erro: ${err.message}`});
    }
  }

  async login({ request, response, auth }) {
    try{
      const { email, password } = request.all();

      const validToken = await auth.attempt(email, password);

      return validToken;
    } catch(err) {
      return response.status(500).send({error: `Erro: ${err.message}`});
    }
  }

}

module.exports = UserController;
