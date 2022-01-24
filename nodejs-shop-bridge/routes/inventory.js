import express from 'express'
import { createInventoryItem, deleteInventoryItem, getInventoryItem, getInventoryList, updateInventoryItem } from '../controllers/inventory.js';


const router = express.Router();

router.post('/', createInventoryItem); // create
router.get('/', getInventoryList); // read
router.get('/:id', getInventoryItem); // read
router.put('/:id', updateInventoryItem); // update
router.delete('/:id', deleteInventoryItem); // delete

export default router;