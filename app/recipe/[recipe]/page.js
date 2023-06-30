"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

async function getRecipe(recipeID) {
  const res = await fetch(`http://192.168.1.223:81/recipe/${recipeID}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getExistingTags() {
  const res = await fetch(`http://192.168.1.223:81/tags`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const params = useParams();
  const { recipe } = params;

  // const recipeFetch = await getRecipe(recipe);

  const recipePromise = getRecipe(params.id);
  const existingTagsPromise = getExistingTags();
  const [recipeData, existingTagsData] = await Promise.all([
    recipePromise,
    existingTagsPromise,
  ]);
  const recipeFetch = recipeData;
  const existingTags = existingTagsData;
  // console.log(recipeData)

  return (
    <div>
      {/* <h1>GUID: {recipeFetch.guid}</h1> */}
      <h1 className="text-lg">{recipeFetch.name} <span className="text-xs font-light">{recipeFetch.version}</span></h1>
      {existingTags.map((tag, id) => (
        <span
          key={id}
          className="inline-block whitespace-nowrap rounded-full bg-neutral-50 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-neutral-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
