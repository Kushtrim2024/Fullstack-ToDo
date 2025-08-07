import users from '../data/users.json' with { type: 'json' };

export const loginController = (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = users.find(
      (user) => user.username === username && user.password === password
    );
    userData.token = "dfdf";
    res.json(userData);
  } catch (error) {
    res.json("User not found!");
  }
};

