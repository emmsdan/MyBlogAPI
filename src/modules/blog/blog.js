import Response from '@response';

import BlogService from '@service/blog';

export default async function AllBlog(req, res) {
  try {
    const offset = req.body.page * req.body.pageSize;
    let where  = new BlogService().whereTypeIs(req.body.type || '');
    const limit = req.body.pageSize;
    const blogs = await new BlogService();
    if (!req.body.type) {
      where = {};
      await blogs.ActionCreator.set({ ...req.dbUser });
    }
    const getBlogs = await blogs.findAllRecord({
      where,
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
      others: {  order: [ ['title', 'DESC']] }
    }, null);
    return Response.success(res, 200, getBlogs, '' );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function getBlogInfo(req, res) {
  try {

    const where  = new BlogService().whereObjectForGetBlog(req.body.blogId  + '');
    const blog = await new BlogService().findOneRecord({ where: { ...where } }, null);
    if (blog) {
      return Response.success(res, 200, blog );
    }
    return Response.error(res, 404, req.translate('BlogDoesNotExist') );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function updateBlogInfo(req, res) {
  try {
    const { title, description, body, status, thumbnail } = req.body;
    const where  = new BlogService().whereObjectForGetBlog(req.body.Blogname  + '');
    const blog = await new BlogService().findOneRecord({ where: { ...where } }, null);
    if (blog) {
      blog.title = title || blog.title;
      blog.description = description || blog.description;
      blog.body = body || blog.body;
      blog.thumbnail = thumbnail || blog.thumbnail;
      blog.status = new BlogService().validStatus(status || blog.status);
      blog.save();
      return Response.success(res, 200, blog );
    }
    return Response.error(res, 404, req.translate('BlogDoesNotExist') );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function deleteBlog(req, res) {
  try {
    const where  = new BlogService().whereObjectForGetBlog(req.body.blogId  + '');
    const blog = await new BlogService().findOneRecord({ where: { ...where } }, null);
    if (blog) {
      blog.destroy();
      return Response.success(res, 200, blog );
    }
    return Response.error(res, 404, req.translate('BlogDoesNotExist') );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function createBlog(req, res) {
  try {
    const blogs = await new BlogService();
    await blogs.ActionCreator.set({ ...req.dbUser });
    req.body.userId = req.dbUser.id;
    const blog  = await blogs.createRecord(req.body);
    if (blog) {
      return Response.success(res, 200, blog);
    }
    return Response.error(res, 400, req.translate('CouldNotCreateBlog') );
  } catch (e) {
    req.logger(e, e?.name);
    Response.error(res, 500, req.translate('serverError'));
  }
}
