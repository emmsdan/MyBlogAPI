import express from 'express';

import routes from '@settings/routes';
import {
  exceptionHandler,
  joiValidatorHandler,
  authorizedAdminUser
} from '@middleware/validation';

import { joify } from '@middleware/datatype';
// import { BlogSchema } from '@schema';
// import Response from '@response';

import AllBlog, { getBlogInfo, getUsersBlog } from './blog';
const BLOG = routes.BLOG;
export const autoPath = BLOG.path.toLowerCase();
const BlogRoute = express.Router();


/** ------------------ | get all  user post (paginated) | --------------- **/
const BlogsSchema = joify({}, [['pageSize', 'number'], ['page', 'number'], ['userId', 'string', 'optional']], null);
BlogRoute.get(
  BLOG.FETCH_USER,
  joiValidatorHandler(BlogsSchema),
  exceptionHandler(getUsersBlog));

/** ------------------ | End of get all user post (paginated) | --------- **/

/** ------------------ | get all Blogs (paginated) | --------------- **/
BlogRoute.get(
  BLOG.FETCH_ALL,
  joiValidatorHandler(BlogsSchema),
  authorizedAdminUser,
  exceptionHandler(AllBlog));

/** ------------------ | End of get all Blogs (paginated) | --------- **/

/** ------------------ | get single Blog | --------------- **/
const blogSchema = joify({}, [['blogId', 'string']], null);
BlogRoute.get(
  BLOG.FETCH,
  joiValidatorHandler(blogSchema),
  exceptionHandler(getBlogInfo));
/** ------------------ | End of get single Blog | --------- **/

export default BlogRoute;
