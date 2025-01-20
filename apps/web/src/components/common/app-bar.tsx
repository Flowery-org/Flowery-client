import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

type AppBarProps = {
  title?: string;
  titleStyle?: 'iconText' | 'logoIcon';
  leftIcon?: { icon: LucideIcon; onClick: () => void };
  rightIcon?: { icon: LucideIcon; onClick: () => void };
};

export function AppBar({
  title,
  titleStyle = 'iconText',
  leftIcon,
  rightIcon,
}: AppBarProps) {
  return (
    <div className='py-3 px-8 flex items-center h-14 w-full'>
      <div className='w-2/12 items-center flex justify-start'>
        {leftIcon && <leftIcon.icon onClick={leftIcon.onClick} />}
      </div>

      <div className='w-8/12 items-center flex'>
        {titleStyle == 'iconText' ? (
          <div className='w-full flex items-center justify-center gap-1'>
            <Image src='/FloweryIcon.svg' alt='Icon' width={24} height={24} />
            <div className='items-center'>{title}</div>
          </div>
        ) : (
          <div className='w-full flex items-center justify-center'>
            {titleStyle == 'logoIcon' && (
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
        {rightIcon && <rightIcon.icon onClick={rightIcon.onClick} />}
      </div>
    </div>
  );
}
