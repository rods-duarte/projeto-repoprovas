import Joi from 'joi';

export type CreateTest = {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
};

const CreateTestSchema = Joi.object<CreateTest>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  teacher: Joi.string().required(),
});

export default CreateTestSchema;
