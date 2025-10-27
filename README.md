# Movie Manager 🎬 (React + TypeScript)

**Demo en video (Loom):**  
https://www.loom.com/share/6d7bc3b18d844e119f6e5d1a488aad05

---

## Descripción

Movie Manager es una aplicación hecha con **React + TypeScript + Vite** que permite:

- Listar series/películas obtenidas dinámicamente desde una API pública (TVMaze).
- Ver información básica de cada título (póster, géneros, estado, rating).
- Seleccionar una película para reseñarla.
- Escribir reseñas positivas o negativas asociadas a la película seleccionada.
- Visualizar todas las reseñas agregadas con el nombre de la película y el tipo (positiva / negativa).

Además, el proyecto aplica principios de tipado estricto, componentes genéricos, hooks personalizados y composición de componentes reutilizables.

El video de demostración (arriba) muestra el flujo completo de uso de la app y cómo se cumplen los objetivos técnicos.

---

## Tabla de Contenidos

1. [Tecnologías usadas](#tecnologías-usadas)  
2. [Flujo de uso de la app](#flujo-de-uso-de-la-app)  
3. [Características técnicas / rúbrica](#características-técnicas--rúbrica)  
4. [Estructura del proyecto](#estructura-del-proyecto)  
5. [Instalación y ejecución](#instalación-y-ejecución)  
6. [Estilos y diseño](#estilos-y-diseño)  
7. [Notas finales](#notas-finales)

---

## Tecnologías usadas

- **React 18+**
- **TypeScript**
- **Vite**
- Hooks de React (`useState`, `useEffect`, `useMemo`)
- Tipos estrictos sin `any`
- Componentes funcionales
- CSS personalizado (estilo inspirado en Cinépolis: azul marino + amarillo)

---

## Flujo de uso de la app

1. Al iniciar, la app hace `fetch` a la API pública de TVMaze (`https://api.tvmaze.com/shows`) mediante el hook `useFetchMovies`.  
   - Se muestran las películas/series en tarjetas.
   - Cada tarjeta incluye póster, géneros, estatus (por ejemplo "Ended") y rating.

2. Cada tarjeta tiene un botón **"Seleccionar"**.  
   - Al presionar este botón en una película, esa película queda como la **película activa para reseñar**.

3. En el panel derecho aparece un cuadro de reseñas con:
   - El título `Reseñando: [Nombre de la película seleccionada]`.
   - Un input de texto para escribir una reseña.
   - Dos botones: **"+ Positiva"** y **"+ Negativa"**.

4. Cuando el usuario escribe algo y pulsa `+ Positiva` o `+ Negativa`:
   - Se guarda esa reseña mediante el hook `useReviews`.
   - La reseña se asocia con:
     - el `movieId`
     - el `movieName`
     - el `type` (positivo o negativo)
     - el `message` del usuario

5. Abajo en el panel de reseñas se listan todas las reseñas agregadas en formato legible:
   - Ejemplo:
     - `Opinión positiva sobre "Under the Dome": Buenísima`
     - `Opinión negativa sobre "The 100": muy mala`

Este comportamiento se muestra en el video de demo.

---

## Características técnicas / rúbrica

### 1. Tipado correcto de interfaces y props
- `src/types/movie.ts` define la interfaz `Movie` con todas las propiedades relevantes traídas de la API (id, name, genres, image, rating, etc.).
- `src/types/review.ts` define `MovieReview`, incluyendo una unión discriminada para el tipo de reseña.
- Componentes como `MovieCard`, `MovieList`, `GenericList` reciben props totalmente tipadas sin usar `any`.

### 2. Manejo de estado (`useState`, `useMemo`)
- Se usa `useState` para:
  - `selectedMovie` (película actualmente seleccionada para reseñar).
  - la lista de reseñas en el hook `useReviews`.
- Se usa `useMemo` (por ejemplo en la parte de favoritas / promedio de rating) para calcular información derivada sin recalcular en cada render.

### 3. Hook personalizado para traer películas: `useFetchMovies`
**Archivo:** `src/hooks/useFetchMovies.ts`

- Hace la petición `fetch` a `https://api.tvmaze.com/shows`.
- Devuelve un objeto tipado:  
  `{ data, loading, error }`
- `loading` controla el mensaje “Cargando películas…”.
- `error` se muestra en pantalla usando el componente `<AlertBox type="error" />`.

### 4. Componente genérico reutilizable: `GenericList<T>`
**Archivo:** `src/components/GenericList.tsx`

Este componente:
- Recibe una lista `items: T[]`.
- Recibe `keyExtractor` para obtener la `key` de cada item.
- Recibe `renderItem`, que define cómo renderizar cada elemento.
- Gracias al `<T>` tipado, se puede reutilizar con cualquier tipo, no solo películas.

Ejemplo de uso:
```tsx
<GenericList
  items={movies}
  keyExtractor={(m) => m.id.toString()}
  renderItem={(m) => (
    <MovieCard movie={m} onSelect={() => handleSelect(m)} />
  )}
/>
5. Manejo adecuado de errores y estados de carga

Mientras loading === true: se muestra el texto "Cargando películas...".

Si error existe: se muestra <AlertBox type="error"> con el mensaje.

Si los datos cargan bien: se renderiza la lista con <GenericList />.

6. Uso de children tipados con Section

Archivo: src/components/Section.tsx

type SectionProps = {
  title: string;
  children: React.ReactNode;
};


Section muestra un bloque visual con un título (por ejemplo "Lista de Películas", "Reseñas") y contenido hijo.

Esto se usa en MovieDashboard para estructurar la composición de la interfaz: columna izquierda (películas), columna derecha (reseñas).

7. Implementación de tipo unión discriminada (MovieReview)

Archivo: src/types/review.ts

export type MovieReview = {
  movieId: number;
  movieName: string;
  type: "positive" | "negative";
  message: string;
};


type es una unión discriminada con valores "positive" | "negative".

En renderReview.ts se arma el mensaje final dependiendo del tipo.

“Opinión positiva sobre "Under the Dome": Buenísima”

“Opinión negativa sobre "The 100": muy mala”

8. Hook personalizado de reseñas: useReviews

Archivo: src/hooks/useReviews.ts

Mantiene internamente una lista de reseñas (useState<MovieReview[]>).

Expone funciones para agregar reseñas positivas y negativas:

addPositiveReview(movie, message)

addNegativeReview(movie, message)

También expone la lista completa reviews.

Este hook abstrae toda la lógica de reseñas en una sola pieza reutilizable.

9. Integración y composición de componentes

Archivo principal de pantalla: src/components/MovieDashboard.tsx

MovieDashboard:

Renderiza <MovieList /> (lista de películas traída de la API).

Controla la película seleccionada con useState.

Renderiza el panel de reseñas usando useReviews.

Muestra las reseñas ya guardadas en forma legible.

Usa Section para dividir visualmente cada bloque y mantener una UI clara.

Esto demuestra composición, reutilización y separación de responsabilidades.

src/
  components/
    AlertBox.tsx          // Mensajes de error/alerta
    GenericList.tsx       // Lista genérica parametrizada con <T>
    MovieCard.tsx         // Tarjeta de película con póster, rating y botón "Seleccionar"
    MovieDashboard.tsx    // Pantalla principal que integra todo
    MovieList.tsx         // Lista de películas, usa useFetchMovies y GenericList
    Section.tsx           // Contenedor con título + children tipados
    FavoriteMovies.tsx    // (opcional) manejo de favoritas y promedio con useMemo
  hooks/
    useFetchMovies.ts     // Hook para consumir la API de TVMaze
    useReviews.ts         // Hook para gestionar reseñas por película
  types/
    movie.ts              // Interfaz Movie (id, name, genres, image, rating, etc.)
    review.ts             // Tipo MovieReview con unión discriminada "positive" | "negative"
  utils/
    renderReview.ts       // Formatea la reseña dependiendo del tipo
    formatMovie.ts        // Función de formateo de película (por ejemplo título + rating)
  App.tsx                 // Punto de entrada visual (renderiza MovieDashboard)
  App.css                 // Estilos globales de la app 
  main.tsx                // Render raíz con ReactDOM
  index.css               // Estilos base iniciales de Vite
vite.config.ts
tsconfig.json / tsconfig.app.json
package.json
README.md
