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

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch('https://json-api.uz/api/project/chizmachilik/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 1500);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="flex justify-center mt-24">
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
            <AlertTitle>Xatolik yuz berdi</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>
      )}
      <Card className="w-87.5 relative overflow-hidden">
        <CardHeader>
          <CardTitle>Ro'yhatdan o'tish</CardTitle>
          <CardDescription>Ro'yhatdan o'tish uchun login va parolingizni kiriting!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col w-full">
              <Label htmlFor="username">Login</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Loginingizni kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex flex-col w-full">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <Button variant="outline">
                <Link to={'/login'}>Tizimga kirish</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Ro'yhatdan o'tish"}
              </Button>
            </div>
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

export default Register;
