import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { Button } from "@/components/ui/button";

export default function CityNotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <GlassCard strong className="flex flex-col items-center gap-5 p-12">
        <MapPinOff size={48} className="text-muted-foreground/50" />
        <div>
          <h1 className="text-2xl font-semibold">Ciudad no encontrada</h1>
          <p className="mt-2 text-muted-foreground">No tenemos datos meteorológicos para esta ubicación. Prueba a elegir otra desde el listado.</p>
        </div>
        <Button asChild>
          <Link href="/cities">Ver ciudades</Link>
        </Button>
      </GlassCard>
    </div>
  );
}
