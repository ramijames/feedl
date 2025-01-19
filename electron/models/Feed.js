import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Feed = sequelize.define('Feed', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  copyright: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itunes_author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itunes_explicit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itunes_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itunes_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Feed.delete = async (id) => {
  return await Feed.destroy({
    where: { id }
  });
};

Feed.parse = async (feedUrl) => {
  // We'll be getting a feed from a URL
};

export default Feed;