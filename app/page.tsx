import Link from "next/link";
import { ArrowRight, ShieldCheck, PieChart, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-hvu-dark text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-display text-4xl tracking-wide uppercase">
            Humanistisch <span className="text-hvu-red">Verbond</span>
          </div>
          <nav>
            <Link href="/api/auth/signin" className="bg-hvu-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-none transition-colors uppercase tracking-wider text-sm">
              Inloggen
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-hvu-dark text-white py-20 overflow-hidden">
          {/* Decorative background elements could go here */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-display uppercase leading-none mb-6 text-hvu-cream/90">
                Financieel <br />
                <span className="text-hvu-red">Portaal</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-300 mb-10 max-w-xl">
                Beheer transacties, leden en facturen voor Afdeling Utrecht in een veilige en overzichtelijke omgeving.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-hvu-cream text-hvu-dark hover:bg-white font-bold py-4 px-8 uppercase tracking-widest text-lg transition-colors flex items-center justify-center gap-2">
                  Start Dashboard <ArrowRight className="w-5 h-5 text-hvu-red" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-hvu-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Transacties */}
              <div className="bg-white p-8 border-b-4 border-hvu-red shadow-sm hover:shadow-md transition-shadow">
                <div className="text-hvu-red mb-4">
                  <PieChart className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-display text-hvu-dark mb-3">Transacties</h3>
                <p className="text-gray-600">
                  Automatische import van CAMT053 bestanden en slimme categorisatie regels.
                </p>
              </div>

              {/* Facturen */}
              <div className="bg-white p-8 border-b-4 border-hvu-blue shadow-sm hover:shadow-md transition-shadow">
                <div className="text-hvu-blue mb-4">
                  <FileText className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-display text-hvu-dark mb-3">Facturen</h3>
                <p className="text-gray-600">
                  Digitaal archief voor facturen, gekoppeld aan banktransacties en eenvoudig terug te vinden.
                </p>
              </div>

              {/* Veiligheid */}
              <div className="bg-white p-8 border-b-4 border-hvu-lila shadow-sm hover:shadow-md transition-shadow">
                <div className="text-hvu-lila mb-4">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-display text-hvu-dark mb-3">Autorisatie</h3>
                <p className="text-gray-600">
                  Rollensysteem voor Penningmeester en Lezers met uitgebreide audit logging.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-hvu-dark text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="font-display text-2xl uppercase mb-4">Humanistisch Verbond Utrecht</div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Afdeling Utrecht. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </div>
  );
}
