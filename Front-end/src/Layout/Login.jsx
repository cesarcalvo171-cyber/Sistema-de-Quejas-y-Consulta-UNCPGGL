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


const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  }),
  contrasena: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})
 
export function Login() 
{
    const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues: {
      username: "",
      contrasena: "",
    },
  })
  const onSubmit = (value) => {
    console.log(value)
  }
  return (
   <>

   <Card className="w-[900px] mx-auto mt-40">
  <CardHeader>
    <CardTitle className="text-2xl flex mx-auto font-extralight">Inicio de Secion</CardTitle>
    <CardDescription className="text-2xl mx-auto font-extralight"  >Sistema de Quejas y Sugerencias UNCPGGL</CardDescription>
  </CardHeader>

  <CardContent>
    <div className="grid grid-flow-col grid-rows-2 gap-4">
        <div className="row-span-3 mx-auto"><img src="/logo_login.png"  className ="w-96 h-96"  alt="" /></div>
        <div className="row-span-3">

            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                    <Input placeholder="Ingrese su nombre de usuario" {...field} />
                    </FormControl>
                  
                    <FormMessage className="text-red-500" />

                    
                </FormItem>
                
 
                )}
            />
               <FormField
                control={form.control}
                name="contrasena"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                    <Input placeholder="Ingrese su contraseña" type="password" {...field} />
                    </FormControl>
                  
                     <FormMessage className="text-red-500" />

                    
                </FormItem>
                
 
                )}
            />
            <button type="submit" className="w-full bg-red-900 text-white py-2 px-4 rounded hover:bg-yellow-400 transition-colors">Iniciar Sesión</button>
            
        </form>
            </Form>
        </div>

    </div>
   
  </CardContent>
 
</Card>
   </>
  )
}