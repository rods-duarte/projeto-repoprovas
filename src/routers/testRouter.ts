import { Router } from 'express';

const testRouter = Router();

testRouter.post('/tests');
testRouter.get('tests'); // query string groupBy = <teachers|disciplines>
