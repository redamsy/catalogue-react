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

TODO: implment reset password

TODO: remove signup after regitering first user


TODO: implment guest and other pages


# Note
before deploying to vercel number of files in api folder must not exceed 12 files, otherwise we'll get the below error:
.........
Error: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan. Create a team (Pro plan) to deploy more. Learn More: https://vercel.link/function-count-limit
exceeded_serverless_functions_per_deployment: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan. Create a team (Pro plan) to deploy more.
.......