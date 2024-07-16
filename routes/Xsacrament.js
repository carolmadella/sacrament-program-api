const {
  requires
} = require('express-openid-connect');

/**
 * 
 * @swagger
 * /sacrament:
 *   get:
 *     summary: Retrieve a list of sacraments
 *     responses:
 *       200:
 *         description: A list of sacraments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The sacrament ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The sacrament name
 *                     example: Baptism
 */
app.get('/sacrament', requiresAuth(), (req, res) => {
  // Your code to fetch and return sacraments
  res.status(200).json([{
      id: '1',
      name: 'Baptism'
    },
    {
      id: '2',
      name: 'Eucharist'
    },
  ]);
});

/**
 * @swagger
 * /sacrament:
 *   post:
 *     summary: Create a new sacrament
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The sacrament name
 *                 example: Confirmation
 *     responses:
 *       201:
 *         description: The sacrament was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The sacrament ID
 *                   example: 3
 *                 name:
 *                   type: string
 *                   description: The sacrament name
 *                   example: Confirmation
 */
app.post('/sacrament', (req, res) => {
  // Your code to create a new sacrament
  const newSacrament = {
    id: '3',
    name: 'Confirmation'
  };
  res.status(201).json(newSacrament);
});