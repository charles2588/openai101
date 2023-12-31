# OPENAI based AI Lawyer - Node.js app

Welcome to AI Lawyer where your all law related questions can be answered by our
OpenAI powered Lawyer Chat Assistant.

- It should allow the user to input prompt and also show history in the chat prompt.
- It should allow the user to clear the chat.
- It should allow the user to request transfer to an agent to talk to a real agent.
- It should allow the user to send the chat transcript to themselves.
- It should have the ability to like and dislike the response.
- It should ask the user to rate their chat experience when the user ends the conversation.
- It should also have the ability to gather analytics on chat experience to allow us to improve the experience based on likes and dislikes.

It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.

![Homepage]()


## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd openai-quickstart-node
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://platform.openai.com/docs/quickstart).
