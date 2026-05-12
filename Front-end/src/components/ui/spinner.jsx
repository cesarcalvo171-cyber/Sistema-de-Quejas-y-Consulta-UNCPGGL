

function Spinner(){
return (
     <div className="relative flex h-24 w-24 items-center justify-center mt-4">
      {/* Círculo gris fijo */}
      <div className="absolute inset-0 rounded-full border-4 border-red-600 " />

      {/* Arco rojo girando */}
      <div className="absolute inset-0 rounded-full border-4 border-red-600">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500 animate-spin" />
      </div>
      {/* Logo fijo */}
      <img
        src="/logo_login.png"
        alt="Loading"
        className="h-12 w-12"
      />
    </div>

   
  );
}
 


export { Spinner }
