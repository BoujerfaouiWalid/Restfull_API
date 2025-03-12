const express = require('express');
const fs = require('fs'); //Cela me permettra de faire des modifications dans le fichiers Produits.JSON

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware pour gérer le JSON dans les requêtes

// Fonction pour lire les produits depuis le fichier JSON
const readProducts = () => {
    try {
        const data = fs.readFileSync('products.json', 'utf8'); // Lire le fichier
        return JSON.parse(data); // Convertir en objet JavaScript
    } catch (err) {
        return []; // Si erreur, retourner un tableau vide
    }
};

// Fonction pour écrire dans le fichier JSON
const writeProducts = (products) => {
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf8');
};

// Route pour afficher un message d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion de produits !');
});

// Route pour récupérer tous les produits
app.get('/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// Route pour ajouter un nouveau produit
app.post('/products', (req, res) => {
    const products = readProducts();
    const newProduct = { id: Date.now(), ...req.body }; // Générer un ID unique
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

//Mettre à jour un produit
app.put('/products/:id', (req, res) => {
  const products = readProducts(); // Lire les produits existants
  const productId = parseInt(req.params.id); // Récupérer l'ID du produit depuis l'URL
  const productIndex = products.findIndex(p => p.id === productId); // Trouver le produit

  if (productIndex === -1) {
      return res.status(404).json({ message: 'Produit non trouvé' }); // Erreur si ID non trouvé
  }

  products[productIndex] = { ...products[productIndex], ...req.body }; // Mettre à jour le produit
  writeProducts(products); // Sauvegarder les changements
  res.json(products[productIndex]); // Retourner le produit mis à jour
});

//Supprimer un produit
app.delete('/products/:id', (req, res) => {
  const products = readProducts(); // Lire les produits existants
  const productId = parseInt(req.params.id); // Récupérer l'ID du produit depuis l'URL
  const productIndex = products.findIndex(p => p.id === productId); // Trouver le produit

  if (productIndex === -1) {
      return res.status(404).json({ message: 'Produit non trouvé' }); // Erreur si le produit n'existe pas
  }

  products.splice(productIndex, 1); // Supprimer le produit du tableau
  writeProducts(products); // Sauvegarder les changements dans le fichier JSON
  res.status(200).json({ message: 'Produit supprimé avec succès' }); // Répondre avec un message de succès
});


// Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
