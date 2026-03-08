'use strict';

// Ingredient Data
const ingredientData = {
    bases: ['Water', 'Juice', 'Soda'],
    alcohol: ['Vodka', 'Rum', 'Whiskey'],
    milkOptions: ['Regular Milk', 'Almond Milk', 'Coconut Milk'],
    sweeteners: ['Sugar', 'Honey', 'Agave Syrup'],
    fruits: ['Lemon', 'Strawberry', 'Mint'],
    spices: ['Cinnamon', 'Nutmeg', 'Pepper'],
    extras: ['Ice', 'Whipped Cream', 'Chocolate Syrup'],
};

// Drag and Drop Functionality
const ingredientsContainer = document.getElementById('ingredients');
const mixingStation = document.getElementById('mixing-station');

const makeDraggable = (item) => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.innerText);
    });
};

Object.values(ingredientData).flat().forEach(ingredient => {
    const div = document.createElement('div');
    div.innerText = ingredient;
    div.className = 'ingredient-item';
    makeDraggable(div);
    ingredientsContainer.appendChild(div);
});

mixingStation.addEventListener('dragover', (e) => {
    e.preventDefault();
});

mixingStation.addEventListener('drop', (e) => {
    e.preventDefault();
    const ingredientName = e.dataTransfer.getData('text/plain');
    const potionIngredient = document.createElement('div');
    potionIngredient.className = 'potion-ingredient';
    potionIngredient.innerText = ingredientName;
    mixingStation.appendChild(potionIngredient);
});

// Mixing Station Logic
const mixPotionButton = document.getElementById('mix-potion');
const recipeStorage = [];

mixPotionButton.addEventListener('click', () => {
    const potionIngredients = Array.from(mixingStation.children).map(child => child.innerText);
    const newPotionRecipe = {
        ingredients: potionIngredients,
        id: Date.now()
    };
    recipeStorage.push(newPotionRecipe);
    alert('Potion created!');
    mixingStation.innerHTML = ''; // Clear the mixing station
});

// Recipe Storage Logic
const saveRecipesButton = document.getElementById('save-recipes');

saveRecipesButton.addEventListener('click', () => {
    localStorage.setItem('potionRecipes', JSON.stringify(recipeStorage));
    alert('Recipes saved!');
});
