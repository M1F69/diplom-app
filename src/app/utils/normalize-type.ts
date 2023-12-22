export const typeMovie = [
  {numb: 0, ru: "Фильм",eng:"Default" },
  {numb: 1, ru: "Мультфильм",eng:"Cartoon" },
  {numb: 2, ru: "Сериал",eng:"Serial" },
  {numb: 3, ru: "Аниме",eng:"Anime" },
] as const

export function getTypeBy(value:any, key: 'numb' | 'eng' | 'ru' ){
  return typeMovie.find(element=>{
    return !!Object.values(element).find((v)=> v===value)
  })?.[key]
}
