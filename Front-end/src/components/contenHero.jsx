import { MdErrorOutline } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function ContenHero(){
    return(
<>
 <div
        className=" grid grid-cols-1  gap-4 mt-10 px-4  mb-4 md:grid-cols-3   md:px-8  "
      >
        <div className="row-span-3 mx-auto ">
          <Card>
            <CardHeader>
              <CardTitle className="mx-auto ">
                <MdErrorOutline size={24} />
              </CardTitle>
              <CardContent className="mx-auto font-semibold uppercase">
                Problemas Academicos
              </CardContent>
              <CardDescription className="mx-auto text-base ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                assumenda accusantium beatae at deleniti, laudantium ducimus
                nihil dolorum, quia cumque fugit neque nisi et dicta, a
                laboriosam fuga nam quibusdam!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="row-span-3 mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex mx-auto font-extralight">
                <FaArrowTrendUp size={24} />
              </CardTitle>
              <CardContent className="mx-auto font-semibold uppercase">
                Mejoras Institucionales
              </CardContent>
              <CardDescription className="mx-auto text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                assumenda accusantium beatae at deleniti, laudantium ducimus
                nihil dolorum, quia cumque fugit neque nisi et dicta, a
                laboriosam fuga nam quibusdam!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="row-span-3 mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex mx-auto font-extralight">
                <FaUserFriends size={24} />
              </CardTitle>
              <CardContent className="mx-auto font-semibold uppercase">
                Bienestar Universitario
              </CardContent>
              <CardDescription className="mx-auto text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                assumenda accusantium beatae at deleniti, laudantium ducimus
                nihil dolorum, quia cumque fugit neque nisi et dicta, a
                laboriosam fuga nam quibusdam!
              </CardDescription>
            </CardHeader>
          </Card>
         
           
         
        </div>
      </div>
</>
    )
}