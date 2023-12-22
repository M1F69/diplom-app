export const genre = [
  {numb: 0 , eng: 'Fantastic', ru: 'Фантастика'},
  {numb: 1 , eng: 'Horror', ru: 'Ужасы'},
  {numb: 2 , eng: 'Family', ru: 'Семейный'},
  {numb: 3 , eng: 'Musical', ru: 'Мюзикл'},
  {numb: 4 , eng: 'Crime', ru: 'Криминал'},
  {numb: 5 , eng: 'Melodrama', ru: 'Мелодрама'},
  {numb: 6 , eng: 'Comedy', ru: 'Комедия'},
  {numb: 7 , eng: 'Documentary', ru: 'Документальный'},
  {numb: 8 , eng: 'ActionMovie', ru: 'Боевик'},
  {numb: 9 , eng: 'Military', ru: 'Военный'},
  {numb: 10 , eng: 'Detective', ru: 'Детектив'},
] as const

export function getGenreBy(value:any, key: 'numb' | 'eng' | 'ru' ){
  return genre.find(element=>{
    return !!Object.values(element).find((v)=> v===value)
  })?.[key]
}
