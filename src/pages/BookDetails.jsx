import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/cardAllBooks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function BookDetails({ setLoading }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBook(res);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen text-3xl font-semibold">
        Kitob topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto p-4 gap-6">
      <Link to="/books">
        <Button variant="secondary">⬅️ Orqaga</Button>
      </Link>

      <Card className="flex flex-col md:flex-row gap-6 p-4">
        {/* Rasm */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>

        <CardContent className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{book.title ? book.title : 'No data'}</h1>

          <p>
            <b>Muallif:</b> {book.authors ? book.authors : 'No data'}
          </p>

          <p>
            <b>Yil:</b> {book.publishedAt ? book.publishedAt : 'No data'}
          </p>

          <p>
            <b>Til:</b> {book.language ? book.language : 'No data'}
          </p>

          <p>
            <b>Hajmi:</b> {book.size ? book.size : 'No data'}
          </p>

          <p>
            <b>Tur:</b> {book.resourceType ? book.resourceType : 'No data'}
          </p>

          <p className="flex flex-wrap gap-2">
            <b>Kalit so‘zlar:</b>
            {(book.keywords && book.keywords.length > 0 ? book.keywords : ['No data']).map(
              (el, i) => (
                <Badge key={i} variant="secondary">
                  {el}
                </Badge>
              )
            )}
          </p>

          <p className="mt-2">{book.summary ? book.summary : 'No data'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
