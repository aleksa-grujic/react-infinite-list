import './App.css'
import {ListItem} from "./components";
import {useQuery} from "@tanstack/react-query";
import {getCatFacts, getUsers} from "./api/api.ts";

function App() {

const {data: facts} = useQuery({
    queryKey: ['cat-facts'],
    queryFn:  () => {
        return getCatFacts(1);
    }
})
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn:  () => {
            return getUsers(1);
        }
    });

  return (
      <>
         <div className="max-w-screen-sm mx-auto bg-gray-300 border-x-2 border-x-gray-300 h-max p-2 flex gap-2.5 flex-col">
             {facts?.map((fact, index) => {
                    return <ListItem name={`${users?.[index].name.first || ''} ${users?.[index].name.last || ""}`} description={fact.fact} image={users?.[index].picture.thumbnail || ''}/>
             })}
         </div>
      </>
  )
}

export default App
