"use client"
import Image from 'next/image'
import ellipse2 from '@/public/images/Ellipse2.png'
 
export default function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <Image
                alt="ellipse"
                src={ellipse2}
                placeholder="blur"
                quality={100}
                sizes="100vw"
                fill
                className="opacity-0 transition-opacity duration-1000 ease-linear"
                onLoad={(e) => (e.target as HTMLElement).classList.replace('opacity-0', 'opacity-25')}
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
    )
}