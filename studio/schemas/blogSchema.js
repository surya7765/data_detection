export const blogSchema = {
  name: "blogs",
  title: "Blogs",
  type: "document",
  fields: [
    {
      name: "blog",
      title: "Blog",
      type: "string",
    },
    {
      name: "timestamp",
      type: "datetime",
      title: "Timestamp",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "users" }],
    },
  ],
};