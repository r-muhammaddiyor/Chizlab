'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Banner1 = ({
  title = '',
  description = "Bu sitedan to'liq foydalanmoqchi bo'lsangiz, ro'yhatdan o'ting!",
  linkText = "ro'yhatdan o'tish",
  linkUrl = '#',
  defaultVisible = true,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section className={cn('w-full border-b bg-background px-4 py-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <span className="text-sm">
            <span className="font-medium">{title}</span>{' '}
            <span className="text-muted-foreground">
              {description}{' '}
              <Link
                href={linkUrl}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </Link>
              .
            </span>
          </span>
        </div>

        <Button
          onClick={handleClose}
        >
          Tushunarli!
        </Button>
      </div>
    </section>
  );
};

export { Banner1 };
