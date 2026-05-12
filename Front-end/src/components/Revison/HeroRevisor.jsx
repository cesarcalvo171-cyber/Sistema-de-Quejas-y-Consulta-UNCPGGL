
export function HeroRevisor(){
    return(
        <>
         
         <div className="w-full h-full items-center flex justify-center gap-8 p-4 mr-4">
          <div className="flex flex-col md:flex-colitems-center " >
        
            {/* TEXTO */}
            <div className="text-center mt-7">
              <h1 className="font-semibold text-red-900 text-3xl">Universidad Nacional Comandante Padre Gaspar Garcia Laviana</h1>
              <hr />
              <h2 className="font-semibold text-red-900 text text-2xl mt-4" >UNCPGGL</h2>
               
            </div>
        
            {/* IMAGEN / LOGO */}
            <div className="items-center flex justify-center mt-7">
              <img
                src="/logo_login.png"
                alt="UNCPGGL"
                className="w-auto h-auto"
              />
            </div>
        
          </div>
        </div>
        </>
    )
}