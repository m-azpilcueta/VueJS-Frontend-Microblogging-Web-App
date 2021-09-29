import store from "./store";
import AccountRepository from "@/repositories/AccountRepository";

const user = store.state.user;

export default {
  login,
  logout,
  register,
  getToken,
  isAdmin,
  isAuthenticationChecked: isAuthenticationChecked(),
};

async function login(credentials) {
  const response = await AccountRepository.authenticate(credentials);
  _saveToken(response.token);
  return _authenticate();
}

async function register(credentials) {
  await AccountRepository.registerAccount(credentials);
}

function logout() {
  _removeToken();
  user.login = "";
  user.authority = "";
  user.logged = false;
  user.id = "";
}

function isAdmin() {
  return user.authority == "ADMIN";
}

function getToken() {
  return localStorage.getItem("token");
}

// usamos localStorage para guardar el token, de forma
// que sea persistente (se inhabilita con el tiempo o
// al hacer logout)
function _saveToken(token) {
  localStorage.setItem("token", token);
}

function _removeToken() {
  localStorage.removeItem("token");
}

// si tenemos el token guardado, esta petición se hará
// con el filtro definido en http-common y por tanto nos
// devolverá el usuario logueado
async function _authenticate() {
  const response = await AccountRepository.getAccount();
  user.login = response.login;
  user.authority = response.authority;
  user.logged = true;
  user.id = response.id;
  return user;
}

// este método devuelve una promesa que se resuelve cuando
// se haya comprobado si el token, de existir, es válido o no
function isAuthenticationChecked() {
  return new Promise((res) => {
    if (getToken()) {
      _authenticate()
        .catch(() => logout())
        .finally(() => res(true));
    } else {
      res(true);
    }
  });
}
