import { Ingredient } from '../../recipe/ingredients/ingerdient.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Ingredient, () => {
    const ingredient = new Ingredient();
    ingredient.amount = Math.floor((Math.random() * 10) + 1);
    return ingredient;
});
