import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-8 h-[82px] flex items-center">

        {/* LOGO */}

        <Link href="/" className="flex-shrink-0">

         <Image
  src="/logo-header.png"
  alt="MeRà's Shop"
  width={130}
  height={100}
  className="object-contain"
  priority
/>

        </Link>

        {/* MENU */}

       <nav className="hidden md:flex items-center gap-12 text-[10px] font-medium uppercase tracking-[0.18em] ml-auto mr-16">

  <Link href="/" className="hover:text-[#c7a384] transition">
    Home
  </Link>

  <Link href="/borse" className="hover:text-[#c7a384] transition">
    Borse
  </Link>

  <Link href="/casa" className="hover:text-[#c7a384] transition">
    Casa
  </Link>

  <Link href="/novita" className="hover:text-[#c7a384] transition">
    Novità
  </Link>

</nav>

<button className="text-[#c7a384] text-lg hover:scale-110 transition">

  ♡

</button>

      </div>

    </header>
  );
}