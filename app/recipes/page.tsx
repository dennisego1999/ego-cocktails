export default async function RecipePage() {
  return (
    <div>
      <p className="block text-radial">
        👷🏻‍♂️ Please remove this block and show <strong>all the recipes</strong> here, paged by 10.
      </p>

      <p className="block">
        <span>You can use the api endpoint </span>
        <code className="text-sm font-light">/api/recipes/all</code>.
      </p>
    </div>
  );
}
