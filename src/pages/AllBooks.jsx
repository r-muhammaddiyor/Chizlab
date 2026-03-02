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
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/reui/alert';
//

import { useNavigate } from 'react-router-dom';

import { Label } from '@/components/ui/label';
import { BorderBeam } from '@/components/ui/border-beam';
import { Spinner } from '@/components/ui/spinner';
import { CircleCheckIcon } from 'lucide-react';
import { CircleAlertIcon } from 'lucide-react';

import { Banner1 } from '../components/banner1';

export default function AllBooks({ setLoading }) {
  const serverAction = async () => {
    // Simulate a server action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: false };
  };
  const [state, setState] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [editData, setEditData] = useState(null);
  const token = localStorage.getItem('token');
  const [editDialogId, setEditDialogId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://json-api.uz/api/project/chizmachilik/materials')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    // Add

    fetch('https://json-api.uz/api/project/chizmachilik/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
          setTimeout(() => setError(false), 1500);
        } else {
          location.reload();
          setSuccess(true);
          setTimeout(() => setSuccess(false), 1500);
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // edit

  function handleEdit(evt, id) {
    evt.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async () => {
        await fetchMaterials(false);
        setEditDialogId(null);
        setEditData(null);
        setSuccess(true);
      })
      .catch(() => {
        setEditDialogId(null);
        setEditData(null);
        setSuccessMessage("Server ruxsat bermadi, o'zgarish lokal saqlandi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const filteredState = state.filter((el) => {
    const title = el?.title ? String(el.title).toLowerCase() : '';
    const query = search ? String(search).toLowerCase() : '';
    return title.includes(query);
  });

  return (
    <div className="container max-w-285 w-full mx-auto p-4">
      <div className="fixed bottom-0 z-999 left-0 right-0">{!token ? <Banner1 /> : null}</div>

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
            <AlertTitle>Xatolik yuz berdi! Qayta urinib ko'ring!</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>
      )}

      <Header />

      <main>
        <section className="pt-20">
          <div className="mb-5 gap-5 flex items-center justify-between">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Qidirish"
            />

            <Dialog>
              <DialogTrigger>
                <Button className={`${localStorage.getItem('token') ? 'flex' : 'hidden'}`}>
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
                      name="title"
                    />
                    <Input required placeholder="Mu'allifni kiriting" name="authors" />
                    <Input
                      required
                      type="number"
                      placeholder="Nechanchi yil chop etilganini kiriting"
                      name="publishedAt"
                    />
                    <Textarea required placeholder="Izoh kiriting" name="summary" />
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
            pt-10
               grid-cols-1 
               sm:grid-cols-2 
               lg:grid-cols-3 
               xl:grid-cols-4 
               w-full"
          >
            {filteredState.length > 0 ? (
              filteredState.map((el) => {
                if (!el) return null;
                const { title, publishedAt, language, summary, cover, authors, id } = el;
                return (
                  <li className="w-full flex" key={id}>
                    <div className="grid w-full">
                      {/* Blog Card */}
                      <Card className="overflow-hidden pt-0 flex flex-col w-full min-h-105 relative">
                        <div className="aspect-video w-full">
                          <img className="h-full w-full object-cover" src={cover} alt="Blog" />
                        </div>
                        <CardContent className="flex flex-col gap-2 flex-1 ">
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
                                {authors ? authors : 'No data'}
                                <BadgeCheckIcon />
                              </Badge>
                            </div>
                            {summary ? summary : 'No data'}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto flex flex-col-reverse items-start gap-5">
                          <InteractiveHoverButton to={`/books/:id`}>
                            <Link to={`/books/details/${id}`}>Ko'proq o'qish </Link>
                          </InteractiveHoverButton>

                          <Dialog
                            open={String(editDialogId) === String(id)}
                            onOpenChange={(open) => {
                              if (open) setEditDialogId(id);
                              else {
                                setEditDialogId(null);
                                setEditData(null);
                              }
                            }}
                          >
                            <DialogTrigger>
                              <Button
                                className={`${localStorage.getItem('token') ? 'flex' : 'hidden'}`}
                                onClick={() =>
                                  setEditData({
                                    id,
                                    title,
                                    authors,
                                    publishedAt,
                                    summary,
                                    language,
                                    cover,
                                  })
                                }
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                  Istalgan kitobingizni qoshishingiz mumkin!
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={(evt) => handleEdit(evt, editData?.id)}>
                                <div className="flex flex-col gap-5 items-start">
                                  <Input required name="title" defaultValue={editData?.title} />

                                  <Input required name="authors" defaultValue={editData?.authors} />

                                  <Input
                                    required
                                    type="number"
                                    name="publishedAt"
                                    defaultValue={editData?.publishedAt}
                                  />

                                  <Textarea
                                    required
                                    name="summary"
                                    defaultValue={editData?.summary}
                                  />

                                  <Input
                                    required
                                    name="language"
                                    defaultValue={editData?.language}
                                  />

                                  <Input
                                    required
                                    type="url"
                                    name="cover"
                                    defaultValue={editData?.cover}
                                  />
                                  <button>
                                    <ActionButton action={serverAction}>Tayyor !</ActionButton>
                                  </button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="col-span-full text-center text-gray-500 py-10">
                Hech narsa topilmadi
              </li>
            )}
          </ul>
        </section>

        <section></section>
      </main>

      <Footer2 />
    </div>
  );
}
