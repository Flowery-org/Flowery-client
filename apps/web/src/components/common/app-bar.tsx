import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type AppBarProps = {
  title?: string;
  titleStyle?: 'iconText' | 'logoIcon';
  showIcon?: boolean;
  leftIcon?: { icon: LucideIcon; href: string };
  rightIcon?: { icon: LucideIcon; href: string };
};

export function AppBar({
  title,
  titleStyle = 'iconText',
  showIcon = true,
  leftIcon,
  rightIcon,
}: AppBarProps) {
  const LeftIcon = leftIcon?.icon;
  const RightIcon = rightIcon?.icon;
  return (
    <div className='py-3 px-8 flex items-center h-14 w-full'>
      <div className='w-2/12 items-center flex justify-start'>
        {LeftIcon && (
          <Link href={leftIcon.href}>
            <LeftIcon />
          </Link>
        )}
      </div>

      <div className='w-8/12 items-center flex'>
      {titleStyle == 'iconText' ? (
        <div className='w-full flex items-center justify-center gap-1'>
          {showIcon && <Image src='/FloweryIcon.svg' alt='Icon' width={24} height={24} />}
          <div className='items-center'>{title}</div>
        </div>
      ) : (
        <div className='w-full flex items-center justify-center'>
          {titleStyle == 'logoIcon' && showIcon && (
            <Image
            src={'/FloweryLogo.svg'}
            alt='Icon'
            width={165 / 1.5}
            height={16 / 1.5}
            />
          )}
        </div>
      )}
      </div>

      <div className='w-2/12 items-center flex justify-end'>
        {RightIcon && (
          <Link href={rightIcon.href}>
            <RightIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
