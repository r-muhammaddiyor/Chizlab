import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Blog7 = ({
  tagline = 'Oxirgi yangilanishlar',
  heading = 'Blog xabarlari',
  description = 'Ushbu to‘plam chizmachilik, muhandislik grafikasi, chizma geometriya va boshqa texnik hamda o‘quv resurslarini o‘z ichiga oladi. Kitoblar, darsliklar, taqdimotlar va videolar yordamida bilimlaringizni kengaytirib, amaliy ko‘nikmalaringizni oshiring..',
  buttonText = 'Hammasini korish',
  buttonUrl = '/books',

  posts = [
    {
      id: 'post-1',
      title: 'Chizmachilik',
      summary:
        "Geometrik va proyeksion chizmachilikni o'rganishga qiynalyabsizmi ? Bu o'quv qo'llanmadagi mavularni o'rganib  test, amaliy topshiriqlarni bajaring va  super talabaga aylaning.",
      label: 'Tutorial',
      author: 'Xalimov. M. K',
      published: '2013',
      url: '/books',
      image: 'https://json-api.uz/mnt/file-1747846982055.jpg',
    },
    {
      id: 'post-2',
      title: 'Chizmachilik',
      summary:
        "Chizmachilik bilan batafsil tanishmoqchi bo'lsangiz ayni manzilni topdingiz. Chizamachilik oilasiga marhamat",
      label: 'Accessibility',
      author: 'N. X. Gulomova',
      published: '2019',
      url: '/books',
      image: 'https://json-api.uz/mnt/file-1747847082453.jpg',
    },
    {
      id: 'post-3',
      title: 'Muhandislik grafikasi',
      summary:
        "Siz talaba va o'quvchi bo'lsangiz ushbu maxsus qo'llanma aynan siz uchun. Uzatmalar turlarida boshqa adashmaysiz.",
      label: 'Design Systems',
      author: 'Emma Thompson',
      published: '1 Jan 2024',
      url: 'https://shadcnblocks.com',
      image: 'https://json-api.uz/mnt/file-1747847127131.jpg',
    },
  ],

  className,
}) => {
  return (
    <section className={cn('py-32', className)}>
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <Link to={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <div className="w-full h-[340px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold md:text-xl">{post.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
