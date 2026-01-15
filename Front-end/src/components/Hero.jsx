
export function Hero(){
    return(
        <>
          <div className="w-full bg-slate-100/25 border-b">
          <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col md:flex-row items-center justify-between gap-8">
        
            {/* TEXTO */}
            <div className="max-w-xl">
              <p className="text-2xl font-semibold uppercase ">
                Servicio de
              </p>
        
              <h1 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight text-red-600">
                Quejas y <span className="text-red-600">Sugerencias</span>
              </h1>
        
              <p className="mt-4 text-gray-600 text-base">
                En la Universidad Nacional Comandante Padre Gaspar García Laviana
                nos importa la opinión de nuestros estudiantes y trabajadores,
                asegurándonos de que cada voz sea escuchada para mejorar la
                experiencia y calidad de nuestra institución.
              </p>
            </div>
        
            {/* IMAGEN / LOGO */}
            <div className="flex-shrink-0">
              <img
                src="/logo_login.png"
                alt="UNCPGGL"
                className="w-40 md:w-48"
              />
            </div>
        
          </div>
        </div>
        </>
    )
}