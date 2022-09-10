import React from "react";
import RecipeForm from "../RecipeForm/RecipeForm";
import Layout from "../../Layout/Layout";

const AddRecipe = () => {
  return (
    <Layout>
      <section>
        <RecipeForm />
      </section>
    </Layout>
  );
};

export default AddRecipe;
