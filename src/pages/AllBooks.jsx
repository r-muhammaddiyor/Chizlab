import { Footer2 } from '../components/footer2';
import Header from '../components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/cardAllBooks';
import { Calendar, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Badge } from '@/components/ui/badge';
import { BadgeCheckIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PlusIcon } from '../components/Plus';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PasswordInput } from '@/components/ui/password-input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { InfoIcon } from 'lucide-react';
import { ActionButton } from '@/components/ui/action-button';

export default function AllBooks() {
  const serverAction = async () => {
    // Simulate a server action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: false };
  };
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch('https://json-api.uz/api/project/chizmachilik/materials')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    fetch('https://json-api.uz/api/project/chizmachilik/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="container max-w-285 w-full mx-auto p-4">
      <Header />

      <main>
        <section className="pt-20">
          <div className="mb-5 gap-5 flex items-center justify-between">
            <Input type="text" placeholder="Qidirish" />

            <Dialog>
              <DialogTrigger>
                <Button>
                  <PlusIcon /> Qoshish
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kitob qo'shish</DialogTitle>
                  <DialogDescription>Istalgan kitobingizni qoshishingiz mumkin!</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-5 items-start">
                    <Input
                      required
                      placeholder="Kitobning nomini kiriting"
                      type="text"
                      name="name"
                    />
                    <Input required placeholder="Mu'allifni kiriting" name="authors" />
                    <Input
                      required
                      placeholder="Nechanchi yil chop etilganini kiriting"
                      name="publishedAt"
                    />
                    <Input required placeholder="Izoh kiriting" name="summary" />
                    <Input
                      required
                      placeholder="Qaysi tilda yozilganligini kiriting"
                      name="language"
                    />
                    <Input
                      type="url"
                      required
                      placeholder="https://example.com/image.jpg"
                      name="cover"
                    />
                    <button>
                      <ActionButton action={serverAction}>Tayyor !</ActionButton>
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <ul
            className="grid gap-6 
               grid-cols-1 
               sm:grid-cols-2 
               lg:grid-cols-3 
               xl:grid-cols-4 
               w-full"
          >
            {state.map(({ title, publishedAt, summary, cover, authors, id }) => {
              return (
                <li className="w-full flex" key={id}>
                  <div className="grid w-full">
                    {/* Blog Card */}
                    <Card className="overflow-hidden pt-0 flex flex-col w-full min-h-[420px]">
                      <div className="aspect-video w-full">
                        <img className="h-full w-full object-cover" src={cover} alt="Blog 1" />
                      </div>
                      <CardContent className="flex flex-col gap-2 flex-1">
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>{publishedAt ? publishedAt : 'No data'}</span>
                        </div>
                        <CardTitle className="text-xl font-semibold">
                          {title ? title : 'No data'}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 flex flex-col gap-3">
                          <div className="flex gap-1">
                            Mu'allif:
                            <Badge
                              variant="secondary"
                              className="bg-blue-500 text-white dark:bg-blue-600"
                            >
                              {authors ? authors[0] : 'No data'}
                              <BadgeCheckIcon />
                            </Badge>
                          </div>
                          {summary ? summary : 'No data'}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <InteractiveHoverButton to={`/books/:id`}>
                          <Link to={`/books/details/:${id}`}>Ko'proq o'qish </Link>
                        </InteractiveHoverButton>
                      </CardFooter>
                    </Card>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <Footer2 />
    </div>
  );
}
