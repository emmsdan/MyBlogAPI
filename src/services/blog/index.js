import { BlogPosts } from '@models';
import * as Utils from '@utils/utils';
import DBModel from '@service/model';
/**
 * @description Handles Blogs connections to the database Model
 * @author EmmsDan
 * @version 0.2
 */

export default class BlogService extends DBModel {
  constructor() {
    Utils.trace(__filename);
    super();
    this.model = BlogPosts;
  }

  /**
	 * Add new Blog Record to table
	 * @param {object} body contains object model for Blog to be added to the table
	 * */
  async create(body) {
    try {
      return await this.createRecord(
        { ...body }
      );
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
	 * enable Blog's account
	 * @param {string} blog contains Blog id (either phone, account number, contractPhone or id)
	 */
  static async updateBlog(blog) {
    try {
      return await new BlogService().updateOneRecord({
        where: {
          ...new BlogService().whereObjectForGetBlog(blog.BlogId + ''),
        },
        body: blog,
      });
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
	 * Get an Blog by his id/accountNumber/contractPhone
	 * @param {string} id contains Blog information
	 */
  static async findBlogById(id, exclude = null) {
    try {
      return await new BlogService().findOneRecord({
        where: { id }, attributes: { exclude }
      });
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

}
