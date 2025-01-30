"use client"
import Image from 'next/image'
import ellipse from '@/public/images/Ellipse.png'
 
export default function Background() {
    return (
        <Image
        alt="ellipse"
        src={ellipse}
        placeholder="blur"
        quality={100}
        sizes="100vw"
        fill
        className="opacity-0 transition-opacity duration-1000 ease-linear"
        onLoadingComplete={(img) => img.classList.replace('opacity-0', 'opacity-50')}
        style={{
            objectFit: 'cover',
        }}
        />
    )
}