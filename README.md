# Start the server

   You can start the server on its own with the command:

   ```bash
   npm run server
   ```

   Run the React application on its own with the command:

   ```bash
   npm start
   ```

   Run both applications together with the command:

   ```bash
   npm run dev
   ```

   The React application will run on port 3000 and the server port 3001.

# references 

https://github.com/philnash/react-express-starter

https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b

https://www.material-react-table.com/docs/examples/advanced
# MERN stands for MongoDB, Express, React, Node, 

TODO: for future need new table cart(userId, productId, galleryId(optional))

TODO: implment reset password

TODO: maybe in the future get all data with single mongodb select(single request too) , if more than one admin

TODO: remove signup after regitering first user

TODO: remove all type: any 

TODO: replace react-slick with something from material ui if possible

TODO: wrapp all new components with memo() 

TODO: make custom model for category, subcategory, size, color, image (provider, update, create, table)

TODO: move all new interface to new suitable file

TODO: change generateCategoriesWithSub to filter according to subCategories too

TODO: product table , row selection for export selected rows

TODO: enable calculate price based on sayrafa(may add switcch for enable disable)

TODO: another currency switch usd lbpound

TODO: location(google map) for store

# Note
before deploying to vercel number of files in api folder must not exceed 12 files, otherwise we'll get the below error:
.........
Error: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan. Create a team (Pro plan) to deploy more. Learn More: https://vercel.link/function-count-limit
exceeded_serverless_functions_per_deployment: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan. Create a team (Pro plan) to deploy more.
.......