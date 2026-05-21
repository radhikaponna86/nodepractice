const { ObjectId } = require('mongodb');
let db, collection;

// Initialize database and collection
const initializeDB = (database, collectionName) => {
    db = database;
    collection = collectionName;
};

// CREATE - Add a new document
const createDocument = async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.status(201).json({
            success: true,
            message: 'Document created successfully',
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating document',
            error: error.message
        });
    }
};

// READ - Get all documents
const getAllDocuments = async (req, res) => {
    try {
        const documents = await collection.find({}).toArray();
        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching documents',
            error: error.message
        });
    }
};

// READ - Get document by ID
const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid document ID'
            });
        }
        const document = await collection.findOne({ _id: new ObjectId(id) });
        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }
        res.status(200).json({
            success: true,
            data: document
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching document',
            error: error.message
        });
    }
};

// UPDATE - Update a document
const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid document ID'
            });
        }
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Document updated successfully',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating document',
            error: error.message
        });
    }
};

// DELETE - Delete a document
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid document ID'
            });
        }
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Document deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting document',
            error: error.message
        });
    }
};

module.exports = {
    initializeDB,
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};
