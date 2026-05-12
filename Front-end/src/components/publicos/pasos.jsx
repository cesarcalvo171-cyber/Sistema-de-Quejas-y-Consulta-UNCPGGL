export function Pasos(){
    return(
        <>
        <section className=" bg-slate-100/25 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-red-900">¡Proceso de Denuncia en unos Simples Pasos! </h2>
            <p className="text-base text-red-900">Tres pasos simples para hacer tu denuncia</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold text-red-900">Completa el Formulario</h3>
             <p className="text-base text-red-900">
                Proporciona los detalles de tu denuncia de manera clara y específica.
              </p>
            </div>
            <div className="hidden items-center justify-center md:flex">
          
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
             <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold text-red-900">Recibe tu Código</h3>
               <p className="text-base text-red-900">
                Obtén un código único para rastrear tu denuncia en cualquier momento.
              </p>
            </div>
            <div className="hidden items-center justify-center md:flex">
              
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900 text-2xl font-bold text-white">
                3
              </div>
            <h3 className="mb-3 text-xl font-semibold text-red-900">Mantente Informado</h3>
              <p className="text-base text-red-900">
                Sigue el progreso de tu caso con actualizaciones automáticas.
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}