const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}


const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

Page.addHook('beforeValidate', (page, options) => {
  page.slug = generateSlug(page.title);
})

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
    validate: {
      isEmail: true,
    },
  },
});

Page.belongsTo(User, { as: 'author' });

module.exports = { db, Page, User };
