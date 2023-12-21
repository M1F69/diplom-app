export function filterCategory(category: string) {
  return `genre/any(t: t eq Films.Types.MovieGenreType\'${category}\')`
}


export function filterType(type: 'Default' | 'Serial' | 'Anime' | 'Cartoon') {
  return `type eq Films.Types.MovieType\'${type}\'`
}
