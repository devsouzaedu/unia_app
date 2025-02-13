"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

export default function DesignPage() {
  const searchParams = useSearchParams();

  // useMemo para evitar re-parsing desnecessário e capturar erros de JSON
  const urls: string[] = useMemo(() => {
    try {
      return JSON.parse(searchParams.get("urls") || "[]");
    } catch (error) {
      console.error("Erro ao parsear URLs:", error);
      return [];
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Design de Nail Art 💅</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Aqui estão suas unhas inspiradas na imagem enviada!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {urls.map((url: string, index: number) => (
          <Image
            key={index}
            src={url}
            alt={`Unha ${index + 1}`}
            width={128}
            height={128}
            className="rounded shadow"
            unoptimized={true} // Necessário se as URLs forem de domínios externos
          />
        ))}
      </div>
    </div>
  );
}
