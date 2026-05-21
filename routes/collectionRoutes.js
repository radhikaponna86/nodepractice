const express = require('express');
const router = express.Router();
const {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} = require('../controllers/collectionController');

// CRUD Routes
router.post('/', createDocument);              // CREATE
router.get('/', getAllDocuments);              // READ all
router.get('/:id', getDocumentById);           // READ by ID
router.put('/:id', updateDocument);            // UPDATE
router.delete('/:id', deleteDocument);         // DELETE

module.exports = router;
