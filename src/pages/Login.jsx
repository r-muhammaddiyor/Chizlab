import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BorderBeam } from '@/components/ui/border-beam';
import { Spinner } from '@/components/ui/spinner';
import { CircleCheckIcon } from 'lucide-react';
import { CircleAlertIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/reui/alert';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch('https://json-api.uz/api/project/chizmachilik/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.access_token);
        setSuccess(true);

        setTimeout(() => navigate('/'), 1500);
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => setError(false), 1500);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div style={{ width: '300px', margin: '100px auto' }}>
      {success && (
        <div className="fixed top-5 right-5">
          <Alert variant="success" className="mb-4 flex items-center gap-2">
            <CircleCheckIcon />
            <AlertTitle>Amal muvaffaqiyatli bajarildi!</AlertTitle>
          </Alert>
        </div>
      )}
      {error && (
        <div className="fixed top-5 right-5">
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>Login yoki parol xato!</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="relative w-87.5 overflow-hidden">
        <CardHeader>
          <CardTitle>Tizimga kirish</CardTitle>
          <CardDescription>
            Ro'yhatdan o'tgan bo'lsangiz, login parolingizni kiriting!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Login</Label>
                <Input
                  id="email"
                  name="username"
                  type="text"
                  placeholder="Loginingizni kiriting"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline">
                <Link to={'/signup'}>Register</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Tizimga kirish'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>

        <BorderBeam
          duration={4}
          size={300}
          reverse
          className="from-transparent via-green-500 to-transparent"
        />
      </Card>
    </div>
  );
}

export default Login;
