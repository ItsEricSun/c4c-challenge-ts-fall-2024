## Instructions for starting the project locally
1. In a terminal, run `npm install` **at the root of this project** to install the required packages
2. Run `npm run dev` **at the root of this project** to start the app locally
3. Visit `http://localhost:3000` to view the website

## High-level overview of the project
This project shows a list of the partners of C4C. It has a form that can be used to add new partners and it is also possible to delete any existing partners.

## Explanation on Design Decisions
First change I made was that I made the PartnerTile not have a specified height, since if there was a lot of text, it would flow out of the tile. So instead, the height of the tile changes based on how much info is stored in it and also I changed the layout into a single column so that its more organized when the tiles can be different heights. Then I made the delete partner button show a confirmation since without it, it would be easy to accidentally delete a partner. And, whenever a new partner is added or one is deleted, instead of reloading the page to show the new list of partners, I had it just fetch the new partners since this would make the user experience more smooth.

## Short Reflection
At the start, I would say I was still fairly unfamiliar with React and TypeScript so I had to look up a lot of things, such as how to have a form submit its info to an API or how to show certain HTML elements based on the state of a variable. So, I definitely learned a lot from this project and am more comfortable using React and TypeScript now. If I have more time, I would want to work on a search bar to filter the partners as that would teach me a lot on how to filter and update components in React. I ran into a lot of issues in React, mainly just not knowing how to implement what I had in mind, and also troubles with types in TypeScript. I worked around these by just doing a lot of Googling and looking at online tutorials.