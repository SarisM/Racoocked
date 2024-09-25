import recipes from './data/data';
import Post, { Attribute } from './components/card/card';
import SearchBar, { SearchAttribute } from './components/search-bar/searchBar';


class AppContainer extends HTMLElement {
    recipesList: Post[] = [];
    storiesList: HTMLElement[] = []; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Crear el listado de recetas
        recipes.forEach(recipe => {
            const postElement = this.ownerDocument.createElement("component-post") as Post;
            postElement.setAttribute(Attribute.photo, recipe.photo);
            postElement.setAttribute(Attribute.userName, recipe.userName);
            postElement.setAttribute(Attribute.recipeName, recipe.recipeName);
            this.recipesList.push(postElement);
        });

    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/styles.css">

                <div id="arriba">
                  
                  <div id="derecha">
                    <search-bar  ${SearchAttribute.placeholder}="Search recipe..."></search-bar>
                  </div>
                </div>
                
                <div id="post">
                <div id="component-post"></div>
                </div>
                
                
            `;

            const storyContainer = this.shadowRoot.querySelector("#story-container");
            const postContainer = this.shadowRoot.querySelector("#component-post");



            //Aqui las recetas meto al contenedor
            this.recipesList.forEach(recipe => {
                if (postContainer) {
                    postContainer.appendChild(recipe);
                }
            });
        }
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
