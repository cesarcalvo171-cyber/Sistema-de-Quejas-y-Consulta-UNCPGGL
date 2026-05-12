import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Spinner } from "@/components/ui/spinner"


const formSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})
 
export function Login() 
{
  const navigate = useNavigate();
    const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 const onSubmit = async (values) => {
  console.log(values); // ← prueba y verás que ahora sí trae datos

  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values), // ← LA CLAVE
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("rol", data.rol);

  if (data.rol === "REVISOR") {
    navigate("/Revision");
  }
};
  return (
   <>
 
   <Card className="w-[900px] mx-auto mt-40">
  <CardHeader>
    <CardTitle className="text-2xl flex mx-auto font-semibold uppercase">Inicio de Secion</CardTitle>
    <CardDescription className="text-2xl mx-auto font-semibold uppercase"  >Sistema de Quejas y Sugerencias UNCPGGL</CardDescription>
  </CardHeader>

  <CardContent>
    <div className="grid grid-flow-col grid-rows-2 gap-4">
        <div className="row-span-3 mx-auto"><img src="/logo_login.png"  className ="w-96 h-96"  alt="" /></div>
        <div className="row-span-3">

            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel >Correo</FormLabel>
                    <FormControl>
                    <Input placeholder="Ingrese su correo" {...field} />
                    </FormControl>
                  
                    <FormMessage className="text-red-500" />

                    
                </FormItem>
                
 
                )}
            />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                    <Input
                     placeholder="Ingrese su contraseña" 
                     
                     type="password" 
                    {...field} />
                    </FormControl>
                  
                     <FormMessage className="text-red-500" />

                    
                </FormItem>
                
 
                )}
            />
            <button type="submit"  className="w-full bg-red-900 text-white py-2 px-4 rounded hover:bg-yellow-400 transition-colors font-semibold uppercase">Iniciar Sesión</button>
            
        </form>
            </Form>
        </div>

    </div>
   
  </CardContent>
 
</Card>
   </>
  )
}