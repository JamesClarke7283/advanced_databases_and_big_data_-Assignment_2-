# Tasks - Part 1

We need you to take the pilot seat for these specific tasks.

# Resources

[Fresh Web Framework Documentation](https://fresh.deno.dev/docs/introduction)

This documentation will guide you through using the fresh web framework.

[Preact UI Documentation](https://preactjs.com/guide/v10/getting-started)

The UI framework we use is called `Preact` it is a fork of `React` with better defaults and other improvements.

[Deno JS Runtime Docs](https://docs.deno.com/runtime/manual)

The JS runtime we are using is called deno, familiarise yourself with the deno runtime and how to use it.

# Explanation Of Queries

All queries are located in the `data/queries` directory, look in there for the data.

### adventure_genre_roles.sql

```sql
SELECT DISTINCT a.name, a.surname
FROM Artist a
JOIN Role r ON a.artistId = r.actorId
JOIN Movie m ON r.movieId = m.movieId
WHERE m.genre = 'Adventure'
ORDER BY a.surname, a.name;
```

This query retrieves a distinct list of artists (actors) who have roles in movies of the "Adventure" genre. Here's a step-by-step breakdown:

1. **FROM Artist a**: The query starts by selecting from the `Artist` table, aliasing it as `a`.
2. **JOIN Role r ON a.artistId = r.actorId**: It joins the `Role` table (aliased as `r`) on the condition that the artist's ID matches the actor's ID in the `Role` table.
3. **JOIN Movie m ON r.movieId = m.movieId**: It further joins the `Movie` table (aliased as `m`) on the condition that the movie ID in the `Role` table matches the movie ID in the `Movie` table.
4. **WHERE m.genre = 'Adventure'**: It filters the results to include only those movies where the genre is 'Adventure'.
5. **SELECT DISTINCT a.name, a.surname**: It selects the distinct names and surnames of the artists from the filtered results.
6. **ORDER BY a.surname, a.name**: It orders the results by the artist's surname and then by their name.

### genre_country_view.sql

```sql
CREATE VIEW GenreCountry AS
SELECT c.name AS country, m.genre, COUNT(*) AS num_movies
FROM Movie m
JOIN Country c ON m.countryCode = c.code
GROUP BY c.name, m.genre;
```

This query creates a view called `GenreCountry` that shows the number of movies per genre in each country. Here's how it works:

1. **CREATE VIEW GenreCountry AS**: It creates a view named `GenreCountry`.
2. **FROM Movie m**: It selects from the `Movie` table, aliasing it as `m`.
3. **JOIN Country c ON m.countryCode = c.code**: It joins the `Country` table (aliased as `c`) on the condition that the movie's country code matches the country's code.
4. **SELECT c.name AS country, m.genre, COUNT(*) AS num_movies**: It selects the country name, the movie genre, and counts the number of movies for each genre in each country.
5. **GROUP BY c.name, m.genre**: It groups the results by the country name and genre to get the count of movies for each combination.

### highest_avg_score.sql

```sql
SELECT m.title, AVG(sm.score) AS average_score, COUNT(sm.email) AS num_users
FROM Movie m
JOIN Score_movie sm ON m.movieId = sm.movieId
GROUP BY m.movieId, m.title
ORDER BY average_score DESC
LIMIT 5;
```

This query retrieves the top 5 movies with the highest average scores, along with the number of users who scored each movie. Here's a detailed explanation:

1. **FROM Movie m**: It starts by selecting from the `Movie` table, aliasing it as `m`.
2. **JOIN Score_movie sm ON m.movieId = sm.movieId**: It joins the `Score_movie` table (aliased as `sm`) on the condition that the movie ID matches in both tables.
3. **SELECT m.title, AVG(sm.score) AS average_score, COUNT(sm.email) AS num_users**: It selects the movie title, the average score of the movie, and the count of users who scored the movie.
4. **GROUP BY m.movieId, m.title**: It groups the results by the movie ID and title to calculate the average score and user count for each movie.
5. **ORDER BY average_score DESC**: It orders the results by the average score in descending order.
6. **LIMIT 5**: It limits the results to the top 5 movies with the highest average scores.



# ModalButton Component

The `ModalButton` component in Fresh DenoJS Preact is designed to create a button that, when clicked, opens a modal dialog. You can find the complete code for this component in `islands/ModalButton.tsx`. Here's a detailed explanation of how it works and the arguments it takes:

## ModalProps Interface

The `ModalProps` interface defines the properties (props) that the `ModalButton` component expects:

- **id** (`string`): A unique identifier for the modal and button elements. This ensures that the correct modal is shown when the button is clicked.
- **title** (`string`): The text that appears on the button.
- **content** (`JSX.Element`): The content to be displayed inside the modal. This can be any JSX element, allowing for flexible and dynamic content.

## How the Component Works

1. **Button Element**:
   
   - The button uses the `id` prop to create a unique `id` for itself, ensuring it is distinct.
   - It has various CSS classes for layout and styling, such as `flex` for flexible box layout, `items-center` and `justify-between` for alignment, `border` and `rounded-lg` for border styling, and `p-4` for padding. Hover effects are added with `hover:shadow-md` and `transition-all`.
   - When the button is clicked, the `onClick` event handler finds the corresponding modal by `id` and opens it using the `showModal()` method.

2. **SVG Icon**:
   
   - The button includes an SVG icon for visual indication. This icon is styled using various SVG attributes.

3. **Dialog Element**:
   
   - The `dialog` element represents the modal. It uses the `id` prop to ensure it matches the button's `id`.
   - The `className="modal"` is used for custom styling of the modal.

4. **Modal Box**:
   
   - Inside the `dialog`, a `div` with `className="modal-box"` contains the `content` prop, displaying whatever JSX element is passed in.
   - A paragraph tag provides additional instructions on how to close the modal.

5. **Form for Closing**:
   
   - A `form` element with `method="dialog"` acts as a backdrop. Clicking the button inside this form closes the modal.

## How It All Comes Together

1. When the button is clicked, the `onClick` event handler triggers the corresponding modal to open by calling the `showModal()` method on the modal element with the matching `id`.
2. The modal then appears with the provided `content` and a message instructing users on how to close it.
3. Users can close the modal by clicking the "close" button, pressing the ESC key, or clicking outside the modal area.

This component allows for a reusable and customisation modal button in Fresh DenoJS Preact applications, making it easy to add modal dialog with dynamic content. For the full code and implementation details, please refer to `islands/ModalButton.tsx`.

# Tasks

## 1: Make HTML content work correctly

At the moment the HTML does not embed in the component correctly when we use it in the `Home`(`routes/index.tsx`) code, we need this to be resolved in the `islands/ModalButton.tsx`.

## 2: Change Home Screen

We need you to change the homescreen to adapt to the new queries we need to perform, read what each query does to inform the UI changes needed(`routes/index.tsx`).

## 3: Tidy up codebase

 Tidy up the codebase so we can easily integrate mongodb into the tool later by splitting the codebase into 2 parts. we also need all the code to be inside a folder called `src` apart from the `deno.json` and `main.ts` and `dev.ts`




