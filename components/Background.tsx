"use client"
import Image from 'next/image'
import ellipse from '@/public/images/Ellipse.png'
 
export default function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <Image
                alt="ellipse"
                src={ellipse}
                placeholder="blur"
                quality={100}
                sizes="100vw"
                fill
                className="opacity-0 transition-opacity duration-1000 ease-linear"
                onLoad={(e) => (e.target as HTMLElement).classList.replace('opacity-0', 'opacity-30')}
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
    )
}