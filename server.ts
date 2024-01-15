import * as express from 'express';
import { Request, Response } from 'express';
 
const app = express();
const PORT = 3000;

interface User {
  id: number;
  name: string;
}

let users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.use(express.json());

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser: User = req.body;
  users = users.map((user) => (user.id === parseInt(id) ? { ...user, ...updatedUser } : user));
  res.json(users.find((user) => user.id === parseInt(id)));
});

app.delete('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
