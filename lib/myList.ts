import { TMDBItem } from "@/type/tmdb";
        
const StorageKey = "myList";

export const getmyList = () : TMDBItem[] => {
 if(typeof window === "undefined"){
  return [];
 }
 return JSON.parse(localStorage.getItem(StorageKey) || "[]");
}

export const addToMyList = (movie :TMDBItem) =>{
    const mylist =getmyList();
    const exists = mylist.some((item) => item.id === movie.id);
    if(!exists){
        localStorage.setItem(StorageKey, JSON.stringify([...mylist, movie]));
    }
}

export const removeFromMyList =(movie : TMDBItem) =>{
    const mylist =getmyList();
    const filter=mylist.filter((item)=>item.id !== movie.id);
    localStorage.setItem(StorageKey, JSON.stringify(filter));
}

export const isInMyList = (movie : TMDBItem) =>{
    const mylist =getmyList();
    return mylist.some((item) => item.id === movie.id);
}
export const removeFromMyListById = (id: number) => {
  const list = getmyList().filter((item) => item.id !== id);
  localStorage.setItem(StorageKey, JSON.stringify(list));
};
