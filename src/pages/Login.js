import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disableLogin: true,
      loading: false,
      redirect: false,
    };
  }

  validationLogin = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({ disableLogin: false });
    } else {
      this.setState({ disableLogin: true });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validationLogin);
  };

  saveLogin = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    const createrUser = await createUser({ name });
    if (createrUser) {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  };

  render() {
    const { name, disableLogin, loading, redirect } = this.state;
    const { history } = this.props;
    if (redirect) {
      history.push('/search');
    }
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div data-testid="page-login">
              <p>Login</p>
              <input
                type="text"
                data-testid="login-name-input"
                value={ name }
                name="name"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disableLogin }
                onClick={ this.saveLogin }
              >
                Entrar
              </button>
            </div>
          )
        }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
