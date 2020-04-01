import Response from '@response';

import BlogService from '@service/blog';

export default async function AllBlog(req, res) {
  try {
    const offset = req.body.page * req.body.pageSize;
    const limit = req.body.pageSize;
    const blogs = await new BlogService();
    await blogs.ActionCreator.set({ ...req.dbUser });
    const getBlogs = await blogs.findAllRecord({
      where: {},
      others: {
        limit, offset, attributes: {
          exclude: ['isAdmin']
        }, order: [['updatedAt','ASC']]
      }
    });
    return Response.success(res, 200, getBlogs );
  } catch (e) {
    req.logger(e, 'serverError');
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function getUsersBlog(req, res) {
  try {
    const blogs = await new BlogService();
    const getBlogs = await blogs.findAllRecord({
      where: { userId: req.body.userId },
      others: {  order: [['updatedAt','ASC']] }
    }, null);
    return Response.success(res, 200, getBlogs, '' );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function getBlogInfo(req, res) {
  try {

    const where  = new BlogService().whereObjectForGetBlog(req.body.Blogname  + '');
    const blog = await new BlogService().findOneRecord({ where: { ...where } }, null);
    if (blog) {
      return Response.success(res, 200, blog );
    }
    return Response.error(res, 404, req.translate('BlogDoesNotExist') );
  } catch (e) {
    console.log(e)
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}
