import { celebrate, Joi, Segments } from "celebrate";

export default class AdsValidation {
  public validadeBody = celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      yearsPlaying: Joi.number().required(),
      discord: Joi.string().required(),
      weekDays: Joi.string().required(),
      hourStart: Joi.string().required(),
      hourEnd: Joi.string().required(),
      useVoiceChannel: Joi.boolean().required(),
    },
  });
}
