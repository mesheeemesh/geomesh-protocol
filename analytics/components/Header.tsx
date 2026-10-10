import Image from 'next/image';

interface HeaderLogoProps {
  expanded?: boolean;
}

export default function HeaderLogo({ expanded = true }: HeaderLogoProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-5 ${!expanded ? 'justify-center px-0' : ''}`}>
      <Image
        src="/logo.svg"
        alt="geomesh-protocol logo"
        width={28}
        height={28}
        priority
      />
      {expanded && (
        <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
          geomesh-protocol
        </span>
      )}
    </div>
  );
}
