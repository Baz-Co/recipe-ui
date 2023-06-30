"use client";
import Link from "next/link";

async function getRecipes() {
  const res = await fetch(`http://192.168.1.223:81/recipes`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const recipesFetch = await getRecipes();

  return (
    <div>
      <h1>Recipe Index Page</h1>
      {recipesFetch.map((recipe, id) => (
        <div key={id}>
          <Link href={`/recipe/${recipe}`}>
            <h2>{recipe}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
