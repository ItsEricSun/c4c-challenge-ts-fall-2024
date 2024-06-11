import express, { Express } from 'express';
import { PartnerData } from './types';

const app: Express = express();
const port = 4000;

// Some partner data
const partners: PartnerData = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
    "active": true
  }
}

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for the frontend so it can call the backend
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

app.get('/', (_req, res) => {
  res.status(200).send(partners);
})


/*
Add a new partner, request body should be in the format:
"id": string,
"thumbnailUrl": string,
"name": string,
"description": string,
"active": boolean
*/
app.post('/', (req, res) => {
  // TODO: add type checking for request body
  const newPartner = req.body;
  // check if id already exists
  if (partners[newPartner.id]) {
    res.status(400).json({ error: 'Partner with that ID already exists' });
  } else {
    // remove id from body and add to partners
    const id = newPartner.id;
    delete newPartner.id;
    partners[id] = newPartner;
    res.status(201).json({ message: 'Partner added successfully' });
  }
})

/*
Delete an existing partner by id
*/
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (partners[id]) {
    delete partners[id];
    res.status(200).json({ message: 'Partner deleted successfully' });
  } else {
    res.status(404).json({ error: 'Partner with that ID does not exist' });
  }
})

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})