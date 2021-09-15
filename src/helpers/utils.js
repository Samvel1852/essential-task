export function isUserValid(users, value) {
  let res = false;
  users.forEach((el) => {
    if (el.email === value.email && el.password === value.password) {
      res = true;
    }
  });
  return res;
}
