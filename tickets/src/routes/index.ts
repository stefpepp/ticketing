import { BadRequestError, NotFoundError } from '@opasnikod/common';
import express, { Request, Response } from 'express';
import { validateRequest } from '@opasnikod/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets',
    async (req: Request, res: Response) => {
        const tickets = await Ticket.find({});
        res.status(200).send(tickets);
    })
export { router as indexTicketRouter };