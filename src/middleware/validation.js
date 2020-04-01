import Joi from '@hapi/joi';

import Response from '@response';
import BlogService from '@service/blog';
import routes from '@settings/routes';
import { JWTStrategy } from '@utils/security';
import { appSettings } from '@global_settings';

const AUTH = routes.AUTHENTICATION;

export const joiValidatorHandler = (schema) => async (req, res, next) => {
  try {
    const header = await verifyHeader(req);
    req.body =  await Joi.object(schema).validateAsync({
      ...req.params,
      ...req.body,
      ...req.query,
    });
    req.body[header.id] = header.value;
    next();
  } catch (error) {
    Response.error(res, 422, error.message);
  }
};
export
const verifyHeader = async (req) => {
  const header = req.headers[appSettings.header.appAuthID.name] || '';
  if (!header || header.search(appSettings.header.appAuthID.value) === -1) {
    throw Error('Could not authenticate App');
  }
  return { id: appSettings.header.database.name, value: header };
};

export const exceptionHandler = (modules) => async (req, res, next) => {
  try {
    return await modules(req, res, next);
  } catch(error) {
    // eslint-disable-next-line
    console.log('A serious error exception happened.', error.message);
    Response.error(res, 500, error);
  }
};

export const validateExistingUser = async (req, res, next) => {
  const id = req.body.email || req.body.userId;
  const userId =  req.body.phone || req.body.username;
  const where  = new BlogService().whereObjectForGetUser(id + '' || 'e', userId + '' );
  const user = await new BlogService().findOneRecord({ where: { ...where } }, null);
  if(user && (req.url.search(AUTH.LOGIN) === -1) && (req.url.search(AUTH.VERIFYACCOUNT) === -1) && (req.url.search(AUTH.CHANGEPASSWORD) === -1)) {
    return Response.error(res, 409, req.translate('userExist'));
  }
  if (user) {
    req.dbUser = user;
  }
  next();
};

export const authorizedUser = async (req, res, next) => {
  try {
    const Authorization = req.headers?.authorization?.split(' ');
    const verify = await JWTStrategy.verify(Authorization[1]);
    if(Authorization[0] !== 'Bearer' || !verify.id) {
      return Response.error(res, 403, req.translate('UnauthorizedUser1'));
    }
    const header = await verifyHeader(req);

    req.dbUser = {
      role: verify.isAdmin,
      name: verify.name,
      id: verify.id,
      [header.id]: header.value
    };
    next();
  } catch (e) {
    return Response.error(res, 401, req.translate('UnauthorizedUser'));
  }
};

export const authorizedAdminUser = async (req, res, next) => {
  try {
    const Authorization = req.headers?.authorization?.split(' ');
    const verify = await JWTStrategy.verify(Authorization[1]);
    if(Authorization[0] !== 'Bearer' || !verify.isAdmin) {
      return Response.error(res, 403, req.translate('NotPermitted'));
    }
    const header = await verifyHeader(req);

    req.dbUser = {
      ...verify,
      [header.id]: header.value
    };
    next();
  } catch (e) {
    return Response.error(res, 401, req.translate('UnauthorizedUser'));
  }
};
