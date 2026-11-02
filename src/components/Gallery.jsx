const PHOTOS = [
  { src: "/images/gallery-1.jpg", alt: "Yellow-and-black workout floor with a running track", width: 289, height: 312 },
  { src: "/images/gallery-2.jpg?v=2", alt: "Gomzi gym reception desk", width: 1360, height: 1020 },
  { src: "/images/gallery-3.jpg", alt: "Strength machines and racks on the gym floor", width: 294, height: 220 },
  { src: "/images/gallery-4.jpg", alt: "Dumbbell rack, plates and power racks", width: 1360, height: 907 },
  { src: "/images/gallery-5.jpg?v=2", alt: "Plate-loaded chest press machines on the Gomzi gym floor", width: 765, height: 1020 },
  { src: "/images/gallery-6.jpg", alt: "Power rack on a chequered floor", width: 228, height: 163 },
];

const Gallery = () => (
  <section className="mx-auto max-w-6xl px-4 py-16">
    <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Inside our gym</h2>
    <p className="mt-2 text-center text-slate-600">Photos from our Fitness With Gomzi branches in Surat.</p>
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
      {PHOTOS.map((photo) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          className="aspect-square w-full rounded-2xl object-cover"
        />
      ))}
    </div>
  </section>
);

export default Gallery;
